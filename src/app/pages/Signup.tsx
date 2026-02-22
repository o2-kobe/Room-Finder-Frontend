import LoginForm from "../components/AuthForm";
import { createUser, type CreateUserInput } from "../services/apiUser";
import { useNavigate } from "react-router";

const AuthForm = () => {
  const navigate = useNavigate();

  const signup = async (formData: any) => {
    const { username, ...rest } = formData;
    const payload: CreateUserInput = {
      username,
      ...rest,
    };

    await createUser(payload);
    navigate("/");
  };

  return (
    <div>
      <LoginForm submitFn={signup} type="signup" />
    </div>
  );
};
export default AuthForm;
