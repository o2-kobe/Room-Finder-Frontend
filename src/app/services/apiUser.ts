import api from "./axiosInstance";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: "hostelManager" | "student" | "landlord";
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function createUser(input: CreateUserInput) {
  const { data } = await api.post("/users", input);
  return data;
}

export async function loginUser(input: LoginInput) {
  const { data } = await api.post("/sessions", input);
  return data;
}
export async function signoutUser() {
  const { data } = await api.delete("/sessions");
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get("/users");
  return data;
}
