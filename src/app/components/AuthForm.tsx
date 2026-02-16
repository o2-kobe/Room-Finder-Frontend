import { Eye, EyeOff, Home } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSchema, type UserFormData } from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const LoginForm = ({ type }: { type: "login" | "signup" }) => {
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: undefined,
      passwordConfirm: undefined,
      role: undefined,
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-50">
      <div className="w-full max-w-md p-7 rounded-sm shadow-2xl bg-white">
        <h3 className="mb-4 text-2xl font-semibold flex items-center justify-center gap-1">
          <Home /> StudentRooms Ghana
        </h3>

        <p className="text-center text-sm text-primary mb-3">
          {type === "login"
            ? "Log into an existing account"
            : "Create an account today"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 items-center w-full mx-auto"
        >
          {type === "signup" ? (
            <div className="bg-gray-100 rounded-md w-full border border-gray-300">
              <input
                type="text"
                required
                id="username"
                placeholder="Enter username"
                {...register("username")}
                disabled={isSubmitting}
                className="p-3 text-sm outline-none bg-transparent w-full"
              />
              {errors?.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          ) : null}

          <div className="bg-gray-100 rounded-md w-full border border-gray-300">
            <input
              type="email"
              id="email"
              required
              placeholder="Enter email"
              className="p-3 text-sm outline-none bg-transparent w-full"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {type === "signup" ? (
            <div className="w-full">
              <select
                required
                className="w-full p-2 bg-gray-100 rounded-md border border-gray-300"
                id="role"
                {...register("role")}
                disabled={isSubmitting}
              >
                <option value="">Select role</option>
                <option value="landlord">Landlord</option>
                <option value="hostelManager">Hostel Manager</option>
                <option value="guest">Guest</option>
              </select>
              {errors?.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          ) : null}

          <div className="w-full">
            <div className="bg-gray-100 rounded-md w-full border border-gray-300 flex items-center justify-between">
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                required
                placeholder="Enter password"
                {...register("password")}
                disabled={isSubmitting}
                className="p-3 text-sm outline-none bg-transparent w-full"
              />
              <span
                className="mr-2 text-gray-600"
                onClick={() => setViewPassword((view) => !view)}
              >
                {viewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {type === "signup" ? (
            <div className="w-full">
              <div className="bg-gray-100 rounded-md w-full border border-gray-300 flex items-center justify-between">
                <input
                  type={viewPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  required
                  placeholder="Confirm Password"
                  {...register("passwordConfirm")}
                  disabled={isSubmitting}
                  className="p-3 text-sm outline-none bg-transparent w-full"
                />
                <span
                  className="mr-2 text-gray-600"
                  onClick={() => setViewPasswordConfirm((view) => !view)}
                >
                  {viewPasswordConfirm ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </span>
              </div>
              {errors?.passwordConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
          ) : null}

          {type === "login" ? (
            <p className="text-xs text-gray-500 cursor-pointer">
              Don't have an account.{"  "}
              <span
                className="text-primary underline"
                onClick={() => navigate("/signup")}
              >
                Create one
              </span>
            </p>
          ) : (
            <p className="text-xs text-gray-500 cursor-pointer">
              I have an account.{"  "}
              <span
                className="text-primary underline"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          )}

          <button className="bg-primary hover:bg-violet- cursor-pointer text-white p-2 rounded-md w-full text-center">
            {type === "signup" ? "SIGN UP" : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
