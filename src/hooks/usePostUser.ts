import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import enviroment from "../environments/enviroment";

type user = {
  id: number;
  name: string;
  lastname: string;
  permission: number;
  email: string;
};

const usePostUser = (user: user) => {
  return useMutation(postUser(user), {
    onSuccess: () => {},
  });
};

const postUser = (user: user) => {
  return () =>
    axios
      .post(`${enviroment.railway}adm/new_user/`, user)
      .then(({ data }) => data);
};

export default usePostUser;
