import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthSelector, userActions } from "../../actions/user";
import { saveStorage } from "../../utils/localStorage";
import { Login } from "../../service/user";
import { ItLogin } from "../../interface/login";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItLogin>();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useAuthSelector();
  const onSubmit: SubmitHandler<ItLogin> = async (data: ItLogin) => {
    const response = await Login(data);

    if (response) {
      const value: string = JSON.stringify(response);
      saveStorage({ key: "user", value });
      toast.success("Logado com sucesso!");
      navigation("/dashboard");
      dispatch(userActions.login({ data: response }));
    }
    reset();
  };

  return (
    <div className="flex h-screen justify-center items-center bg-slate-200">
      <div className="flex h-96 bg-white w-96 rounded-lg shadow-mdshadow-md">
        <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2  flex flex-col">
            <label className="mb-1">Login</label>
            <input
              type="user"
              placeholder="Usuario"
              className="border border-slate-400 rounded p-0.5 text-center"
              {...register("user", { required: true })}
            />
            {errors.user && (
              <span className="text-red-600">Campo necessário</span>
            )}
          </div>
          <div className="my-2 flex flex-col">
            <label className="mb-1">Senha</label>
            <input
              type="password"
              placeholder="Senha"
              className="border border-slate-400 rounded p-0.5 text-center"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">Campo necessário</span>
            )}
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="flex flex-col my-2 bg-slate-600 rounded-sm p-1 text-center items-center text-white shadow-md hover:bg-slate-700 transition duration-300"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
