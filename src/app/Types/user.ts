export interface UserDocument {
  email: string;
  username: string;
  password: string;
  role: "hostelManager" | "landlord" | "student";

  comparePassword: (candidatePassword: string) => Promise<boolean>;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  username: string;
  role: "landlord" | "guest" | "student";
  passwordConfirm: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
