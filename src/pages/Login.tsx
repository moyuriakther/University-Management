import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { TUser, userLoggedIn } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>ID:</label>
        <input defaultValue="A-0001" {...register("id")} />
      </div>
      <div>
        <label>PASSWORD</label>
        <input defaultValue="newAdmin" {...register("password")} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
