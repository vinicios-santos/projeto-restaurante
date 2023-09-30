import { useEffect } from "react";
import { createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import api from "@utils/api";
import { redirect } from "react-router-dom";

type SignInCredentials = {
  email: string;
  password: string;
};

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
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
    }
  }, []);

  async function signOut() {
    destroyCookie(undefined, "yellowsoftware.token");
    redirect("/");
  }

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("Login/Authenticate", {
      email,
      senha: password,
    });
    const { body: token, success, reasonPhrase } = response.data;

    if (!success) {
      throw new Error(reasonPhrase);
    }

    localStorage.setItem("token", JSON.stringify(token));

    setCookie(undefined, "yellowsoftware.token", token, {
      maxAge: 60 * 60,
      path: "/",
    });

    api.defaults.headers["Authorization"] = `${token}`;
    redirect("/analytics");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
