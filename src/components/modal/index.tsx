import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { peopleActions } from "../../actions/people";
import { ItModal, OptionAction } from "../../interface/modal";
import InputMask from "react-input-mask";

import { ItPeople } from "../../interface/people";
import { validateCPF } from "../../utils/validation";

export function Modal(props: ItModal) {
  const dispatch = useDispatch();
  const [option, setOption] = useState<OptionAction>(props.option);
  const [isDisableEdit, setIsDisableEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItPeople>({
    defaultValues: props.option !== "new" ? props?.date : {},
  });
  const onSubmit: SubmitHandler<ItPeople> = async (data: ItPeople) => {
    if (data?.id) {
      dispatch(peopleActions.edit(data));
    } else {
      dispatch(peopleActions.add(data));
    }
    props.FnAction();
  };
  useEffect(() => {
    setIsDisableEdit(option !== "edit" && option !== "new");
  }, [props, option]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t">
              <button
                className="p-3 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.FnAction()}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative p-6 flex-auto w-96"
            >
              <div className="flex justify-between  my-3">
                <label>id:</label>
                <input
                  type="number"
                  placeholder="id"
                  disabled
                  className="border-b border-slate-400 p-0.5 text-center w-full"
                  {...register("id")}
                />
              </div>

              <div className="flex justify-between  my-3">
                <label>Nome:</label>
                <div className="flex flex-col w-screen">
                  <input
                    type="text"
                    placeholder="Nome"
                    disabled={isDisableEdit}
                    className="border-b border-slate-400 p-0.5 text-center w-full"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-600">Campo necessário</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between  my-3">
                <label>Sobrenome:</label>
                <div className="flex flex-col w-screen">
                  <input
                    type="text"
                    placeholder="Sobrenome"
                    disabled={isDisableEdit}
                    className="border-b border-slate-400  p-0.5 text-center w-full"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <span className="text-red-600">Campo necessário</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between  my-3">
                <label>CPF:</label>
                <div className="flex flex-col w-screen">
                  <InputMask
                    className="border-b border-slate-400  p-0.5 text-center w-full"
                    mask="999.999.999-99"
                    alwaysShowMask={false}
                    type="text"
                    placeholder="999.999.999-99"
                    disabled={isDisableEdit}
                    {...register("cpf", {
                      required: true,
                      validate: (v) => validateCPF(v) || `CPF inválido`,
                    })}
                  />
                  {errors.cpf && (
                    <span className="text-red-600">
                      {errors?.cpf?.type === "validate"
                        ? errors?.cpf?.message
                        : "Campo necessário"}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between my-3">
                <label>Email:</label>
                <div className="flex flex-col w-screen">
                  <input
                    type="email"
                    placeholder="Email"
                    disabled={isDisableEdit}
                    className="border-b border-slate-400 p-0.5 text-center w-full"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-600">Campo necessário</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-around p-6 border-t border-solid border-slate-200 rounded-b">
                {option === "view" && (
                  <>
                    <button
                      className="text-orange-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOption("edit")}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setOption("del")}
                    >
                      Excluir
                    </button>
                  </>
                )}
                {!isDisableEdit && (
                  <>
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        props.FnAction();
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Salvar
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
