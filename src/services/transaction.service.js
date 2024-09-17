import transactionModel from "../models/transaction.model.js";

export const createTransaction = async (data) => {
  const transaction = await transactionModel.create(data);
  return transaction;
};


export const findTransactionByReference = async (reference) => {
  return await Transaction.findOne({ reference });
};

export const getOneTransaction = async (query) => {
  return await transactionModel.findOne(query);
}

export const updateTransaction = async (query, dataToUpdate) => {
  return await transactionModel.findOneAndUpdate(query, dataToUpdate, { new: true });
}