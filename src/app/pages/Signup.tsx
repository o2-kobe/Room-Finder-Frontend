import LoginForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { type CreateUserInput } from "../services/apiUser";

const AuthForm = () => {
  const { signup } = useAuth();

  const createAccount = async (formData: any) => {
    const { username, ...rest } = formData;
    const payload: CreateUserInput = {
      username,
      ...rest,
    };

    signup(payload);
  };

  return (
    <div>
      <LoginForm submitFn={createAccount} type="signup" />
    </div>
  );
};
export default AuthForm;
