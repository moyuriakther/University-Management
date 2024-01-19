import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await login(data).unwrap();
    const token = result?.data?.accessToken;
    const user = verifyToken(token);
    dispatch(userLoggedIn({ user, token }));
  };

  if (isSuccess) {
    <p>Logged in successfully</p>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>ID:</label>
        <input defaultValue="2026020001" {...register("id")} />
      </div>
      <div>
        <label>PASSWORD</label>
        <input defaultValue="student1" {...register("password")} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
