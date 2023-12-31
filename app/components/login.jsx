"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {usePostLoginMutation} from "../globalstore/services/useLogin";
import {useRouter} from "next/navigation";
import { AlertError } from "./alertsforrequest";
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

const LogForm = () => {
  const router = useRouter();
  const [errorCatched, setErrorCatched] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [check, setCheck] = useState(false);
  const [postLogin, {isLoading}] = usePostLoginMutation();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = (event) => {
    setCheck(!check);
    setInput({
      ...input,
      [event.target.name]: event.target.checked,
    });
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorCatched(null);
    try {
      const response = await postLogin(input).unwrap();
      const {access_token, refresh_token} = response;
      document.cookie = `token=${access_token}`;
      router.push("/profileExtend");
      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorCatched(error.data.detail);
    }
  };
  return (
    <section className="w-11/12 max-w-md h-3/5 max-h-[400px] font-medium text-sec flex flex-col justify-around items-center">
      <form onSubmit={handleSubmit} className="w-full h-1/2 lg:h-3/5 flex flex-col justify-between">
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            name="email"
            value={input.email}
            className="w-full px-3 bg-transparent outline-none border-b"
            placeholder="Tu email"
            onChange={handleChange}
          />
        </label>
        <article>
          <label className="" htmlFor="password">
            Contraseña
            <div className="relative">
              {showPassword ? (
                <input
                  type="text"
                  name="password"
                  value={input.password}
                  className="w-full px-3 bg-transparent outline-none border-b"
                  placeholder="Tu contraseña"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  className="w-full px-3 bg-transparent outline-none border-b"
                  placeholder="Tu contraseña"
                  onChange={handleChange}
                />
              )}
              <button onClick={handleShowPassword} className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {showPassword ? (
                  <Image src={"/utils/blink.svg"} width={20} height={20} alt="blink" unoptimized={true} />
                ) : (
                  <Image src={"/utils/notblink.svg"} width={20} height={20} alt="notblink" />
                )}
              </button>
            </div>
          </label>
          <div className="m-2 flex flex-row justify-between">
            <div className="flex flex-row text-sm">
              {check ? (
                <CheckBoxOutlinedIcon
                  className="w-4 h-4 me-2"
                  onClick={handleCheck}
                />
              ) : (
                <CheckBoxOutlineBlankOutlinedIcon
                  className="w-4 h-4 me-2"
                  onClick={handleCheck}
                />
              )}
              Recuérdame
            </div>
            <Link href="/recoverpassword" as="recoverpassword" className="hover:underline text-sm">
              Olvidé mi contraseña
            </Link>
          </div>
        </article>
        <button
          className="w-full py-2 text-pri bg-sec hover:bg-gray-300 active:bg-lig rounded-lg duration-150 disabled:opacity-40 disabled:hover:bg-sec"
          disabled={!input.email.length}>
          Entrar
        </button>
      </form>
      <article className="w-full grid place-content-center relative">
        <p className="px-2 bg-pri z-10">o continúa con</p>
        <div className="border-b border-sec absolute inset-x-0 bottom-1/2"></div>
      </article>
      <article className="w-full grid grid-cols-3 gap-x-3">
        <button className="flex items-center justify-center bg-sec py-2.5 border rounded-lg hover:bg-gray-300 duration-150 active:bg-lig">
          <Image src="/social/google.svg" width={25} height={25} alt="google" />
        </button>
        <button className="flex items-center justify-center bg-sec py-2.5 border rounded-lg hover:bg-gray-300 duration-150 active:bg-lig">
          <Image src="/social/facebook.svg" width={25} height={25} alt="facebook" />
        </button>
        <button className="flex items-center justify-center bg-sec py-2.5 border rounded-lg hover:bg-gray-300 duration-150 active:bg-lig">
          <Image src="/social/linkedin.svg" width={25} height={25} alt="linkedin" />
        </button>
      </article>
      <article className="text-center my-5">
        <p className="">
          ¿Primera vez aquí?{" "}
          <Link href="/signup" as="signup" className="hover:underline">
            Regístrate
          </Link>
        </p>
      </article>
      {errorCatched && <AlertError alertTitle={"Error!"} alertBody={errorCatched} setErrorCatched={setErrorCatched} />}
    </section>
  );
};

export default LogForm;
