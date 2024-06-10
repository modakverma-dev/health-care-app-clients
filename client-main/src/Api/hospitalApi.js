import { baseApi } from "../constant";

export const getAllDepartments = `${baseApi}/hospital/departments`;
export const topDoctors = `${baseApi}/hospital/top-doctors`;
export const getDepartmentDoctors = (departmentId) =>
  `${baseApi}/hospital/dept-doctors/${departmentId}`;
export const getDoctorDetails = (doctorId) =>
  `${baseApi}/hospital/doctors/${doctorId}`;
export const generateTokenApi = `${baseApi}/appointment/generate-token`;
