import AppointmentService from "../services/appointment.service.js";
import { initializePaystackPayment } from "../services/payment.service.js";
import {
  createTransaction,
  getOneTransaction,
  updateTransaction,
} from "../services/transaction.service.js";
import UserService from "../services/user.service.js";
import { PAYMENT_STATUS } from "../utils/user.js";
import crypto from "crypto";

//function to initialize paystack payment
export const initializePaystackPaymentCtrl = async (req, res) => {
  const { appointmentId } = req.body;
  const patientId = req.user._id; // Assuming user authentication

  //check if appointment with appointmentId exists
  const appointment = await AppointmentService.getOneAppointment({
    _id: appointmentId,
  });
  if (!appointment) {
    return res.status(404).send({
      success: false,
      message: "Appointment not found",
    });
  }
  console.log("patientId", patientId);
  console.log("Id", appointment.patientId);

  //confirm if current user id equals retrieved patient id from the appointment
  if (patientId.toString() !== appointment.patientId._id.toString()) {
    return res.status(400).send({
      success: false,
      message: "You cannot make payment for this appointment",
    });
  }

  //check if appointment has already been paid for
  if (appointment.isPaid) {
    return res.status(400).send({
      success: false,
      message: "Appointment has been paid for",
    });
  }

  //check if transaction exists on db and return the url and reference from the db
  const transaction = await getOneTransaction({ appointmentId: appointmentId });
  if (transaction) {
    return res.send({
      authorizationUrl: transaction.url,
      reference: transaction.reference,
    });
  }

  try {
    // Step 1: Initialize Paystack transaction for new transactions
    const paymentInitializationResult = await initializePaystackPayment({
      email: req.user.email, // Assuming user email is available from authentication
      amount: appointment.amount,
      metaData: { appointmentId },
    });

    console.log(paymentInitializationResult);

    if (!paymentInitializationResult.success) {
      return res.status(400).json(paymentInitializationResult);
    }

    const { authorizationUrl, reference } = paymentInitializationResult;

    const transactionData = {
      reference,
      appointmentId,
      amount: appointment.amount,
      url: authorizationUrl,
    };
    console.log(transactionData, paymentInitializationResult);

    await createTransaction(transactionData);

    //Respond with Paystack's authorization URL and reference
    return res.status(201).json({
      authorizationUrl,
      reference,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  const body = req.body;
  const secret = process.env.PAYSTACK_SECRET_KEY;

  //validate event
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    if (
      body?.event === "transfer.success" ||
      body?.event === "charge.success"
    ) {
      const hooksData = body.data;
      const amount = hooksData.amount;
      const paymentReferenceId = hooksData.reference;
      const metaData = hooksData.metadata;
      let email = hooksData.customer?.email?.toLowerCase();

      console.log("jtujtuu", email, metaData);

      if (email) {
        const patient = await UserService.findUser({ email });
        console.log("ioioiooo", patient);

        if (!patient)
          return res
            .status(400)
            .send({ success: false, message: "Invalid patient email" });

        if (metaData?.appointmentId) {
          const appointmentId = metaData.appointmentId;

          //update appointment payment status
          const updatedAppointment = await AppointmentService.update(
            { _id: appointmentId },
            { isPaid: true }
          );
          console.log("xxxxx", updatedAppointment);
          if (!updatedAppointment) {
            return res.status(404).send({
              success: false,
              message: "Appointment not found",
            });
          }

          //update transaction status
          const updatePayment = await updateTransaction(
            { appointmentId },
            { status: PAYMENT_STATUS.PAID, reference: paymentReferenceId }
          );
          console.log("iiiiiii", updatePayment);
          if (!updatePayment) {
            return res.status(404).json({
              success: false,
              message: "Payment transaction not found",
            });
          }
        }
      }
    }
  }
  res.sendStatus(200);
};