import patientModel from "../models/patient.model.js";

class PatientService {
  // create new patient
  async createPatient(patientData) {
    const newPatient = await patientModel.create(patientData);
    return newPatient;
  }

  // retrieve all patients
  async findPatients() {
    const patients = await patientModel.find();
    return patients;
  }

  // retrieve one patient
  async findPatient(query) {
    const patient = await patientModel.findOne(query);
    return patient;
  }

  // // update a patient by id
  // async updatePatient(id, data) {
  //   const updatedPatient = await patientModel.findByIdAndUpdate(id, data, {
  //     new: true,
  //   });
  //   return updatedPatient;
  // }

  // // delete patient by id
  // async delPatient(id) {
  //   const deletedPatient = await patientModel.findByIdAndDelete(id);
  //   return deletedPatient;
  // }
}

export default new PatientService();
