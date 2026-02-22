import LoginForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";

const AuthForm = () => {
  const { login } = useAuth();

  return (
    <div>
      <LoginForm submitFn={login} type="login" />
    </div>
  );
};
export default AuthForm;
