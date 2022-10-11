import { useState,useMemo } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../../components/modal";
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineInbox
} from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { peopleActions, usePeopleSelector } from "../../actions/people";
import { userActions } from "../../actions/user";
import { ItPeople } from "../../interface/people";
import { OptionAction } from "../../interface/modal";
import logo from "../../assets/logo.png"
import notFile from "../../assets/notFile.svg"

export function Dashboard() {
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [atualPeople, setAtualPeople] = useState<ItPeople>();
  const [option, setOption] = useState<OptionAction>("view");
  const dispatch = useDispatch();
  const { peoples } = usePeopleSelector();
  
  const TBody = useMemo(() => {

    if (peoples.length <= 0) {
      return (
        <tr className="flex items-center justify-center">
          <td className="h-40 flex justify-center flex-col">
            <label className="flex justify-center">

            <AiOutlineInbox size={50} className="opacity-40" />
            </label>
            <strong className="opacity-40">Não há dados</strong>
            </td>
        </tr>
      )
      
    }
    return peoples?.map((item:ItPeople) => {
      return (
          <tr
            key={item.id}
            className="flex text-left border-b-2 w-full justify-between items-center h-10"
          >
            <td className="w-2">
              {item.id}
            </td>
            <td
              className="w-3/12"
            >
              {item.name} {item.lastName}
            </td>
            <td className="w-2/12">
              {item.cpf}
            </td>
            <td className="w-3/12">
              {item.email}
            </td>
            <td
              className="w-2/12 flex justify-center"
            >
              <button
                className="text-2xl mx-1 p-1 hover:bg-slate-400 hover:text-white hover:rounded-full transition duration-300"
                onClick={() => {
                  setOption("view");
                  setAtualPeople(item);
                  setStatusModal(true);
                }}
              >
                <AiOutlineEye />
              </button>
              <button
                className="text-2xl mx-1 p-1 hover:bg-slate-400 hover:text-white hover:rounded-full transition duration-300"
                onClick={() => {
                  setOption("edit");
                  setAtualPeople(item);
                  setStatusModal(true);
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="text-2xl mx-1 p-1  hover:bg-slate-400 hover:text-white hover:rounded-full transition duration-300"
                onClick={() => {
                  dispatch(peopleActions.del(item.id))
                }}
              >
                <AiOutlineDelete />
              </button>
            </td>
          </tr>
      );
    })
  },[peoples])


  const handlerModalTogle = () => {
    setStatusModal(!setStatusModal);
  };
  if (!peoples) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="p-8">
          <div className="h-10 w-10 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-green-500 animate-spin ease-linear rounded-full"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex  h-14 justify-between px-4 shadow-mdshadow-md border-b-2">
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="logo"
            width={40}
          ></img>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/" className="flex flex-row items-center" onClick={() => {
            dispatch(userActions.logout());
          }}>
           <BsArrowBarLeft className="mx-1"/> Sair
          </Link>
        </div>
      </div>
      <div className=" mt-10 flex px-10">
        <table className=" w-full px-10 ">
          <thead>
            <tr className="flex text-left border-b-2 w-full justify-between items-center">
              <th className="w-2">id</th>
              <th className="w-3/12">Nome</th>
              <th className="w-2/12">CPF</th>
              <th className="w-3/12">Email</th>
              <th className="w-2/12 text-center">Ação</th>
            </tr>
          </thead>
          <tbody>
          {TBody}
          </tbody>
        </table>
      </div>
      <button
        className="bg-slate-400 w-11 h-11 rounded-full flex justify-center items-center fixed bottom-12 right-10 shadow-lg text-white font-bold hover:bg-slate-600 transition duration-300"
        onClick={() => {
          setOption("new");
          setStatusModal(true);
        }}
      >
        <AiOutlinePlus size={25} />
      </button>
      {statusModal ? (
        <Modal
          FnAction={handlerModalTogle}
          date={atualPeople}
          option={option}
        />
      ) : null}
    </div>
  );
}
