import { useEffect } from "react";
import { createContext, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "@utils/api";
import { redirect } from "react-router-dom";

type User = {
  name: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const { "yellowsoftware.token": token } = parseCookies();
    if (!token) {
      localStorage.clear();
      redirect("/");
    }
  }, []);

  function signOut() {
    destroyCookie(undefined, "yellowsoftware.token");
    redirect("/");
  }

  async function signIn({ email, password }: SignInCredentials) {
    // criar tratativa de erroo
    const response = await api.post("login/", {
      email,
      password,
    });
    const { nome: name, token } = response.data;
    const localUser = {
      name,
    };

    localStorage.setItem("user", JSON.stringify(localUser));

    setCookie(undefined, "yellowsoftware.token", token, {
      maxAge: 60 * 60,
      path: "/",
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    redirect("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
