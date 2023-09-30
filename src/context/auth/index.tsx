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
    const response = await api.post("Login/Authenticate", {
      email,
      senha: password,
    });
    const { body: token } = response.data;
    localStorage.setItem("token", JSON.stringify(token));
    setCookie(undefined, "yellowsoftware.token", token, {
      maxAge: 60 * 60,
      path: "/",
    });

    api.defaults.headers["Authorization"] = `${token}`;
    redirect("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
