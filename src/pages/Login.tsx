import { SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button, Row } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { TUser, userLoggedIn } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const result = await login(data).unwrap();
      const token = result?.data?.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(userLoggedIn({ user, token }));
      toast.loading("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  if (isSuccess) {
    <p>Logged in successfully</p>;
  }
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="id" label="ID" />
        <PHInput type="text" name="password" label="PASSWORD" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
