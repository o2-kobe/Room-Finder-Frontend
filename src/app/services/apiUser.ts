import api from "./axiosInstance";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
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

export async function getUser() {
  const { data } = await api.get("/users/me");
  return data;
}

/**
 * const { data: user, isLoading } = useQuery({
  queryKey: ["user"],
  queryFn: getUser,
});

 */
