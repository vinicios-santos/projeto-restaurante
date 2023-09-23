import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeSlash, SignIn } from "phosphor-react";
import React, { useEffect, useState } from "react";
import Logo from "../components/base/Logo";
import enviroment from "../environments/enviroment";

type user = {
  email: string;
  password: string;
};

function Login({ setAuthToken }: any) {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  const [user, setUser] = useState<user>({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const mutation = useMutation(
    (u: user) => axios.post(`${enviroment.railway}login/`, u),
    {
      onSuccess: (response) => {
        if (!response.data || response.data.status !== "success")
          return alert("E-mail ou senha inválidos");

        if (response.data.permission !== 1)
          return alert("Você só pode entrar com um perfil de administrador");

        const authToken = `Bearer ${response.data.token}`;

        localStorage.setItem("@authToken", authToken);

        setAuthToken(authToken);
      },
    }
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...user });
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;

    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="card w-[500px] bg-neutral shadow-xl">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <div className="card-body">
              <div
                className="flex justify-center h-[10rem] w-full"
                id={theme === "dark" ? "invert-logo" : ""}
              >
                <Logo />
              </div>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="E-mail"
                onChange={handleChangeUser}
                required
                className="input input-bordered w-full mb-4"
              />
              <div className="flex">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  value={user.password}
                  placeholder="Senha"
                  onChange={handleChangeUser}
                  required
                  className="input input-bordered w-full"
                />
                {passwordShown ? (
                  <Eye
                    className="ml-2 mt-2 cursor-pointer"
                    size={32}
                    onClick={() => setPasswordShown(false)}
                  />
                ) : (
                  <EyeSlash
                    className="ml-2 mt-2 cursor-pointer"
                    size={32}
                    onClick={() => setPasswordShown(true)}
                  />
                )}
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-success">
                  Entrar &nbsp;&nbsp;
                  <SignIn size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
