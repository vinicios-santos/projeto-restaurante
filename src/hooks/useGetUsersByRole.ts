import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import enviroment from "../environments/enviroment";
import { usersRoles } from "../utils/usersEnum";

type user = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

type getUsersByRoleRes = user[];

const useQueryNameByRole = {
  [usersRoles.teacher]: "getTeachers",
  [usersRoles.student]: "getStudents",
  [usersRoles.all]: "getAll",
};

const roleQuery = {
  [usersRoles.teacher]: "educators",
  [usersRoles.student]: "students",
  [usersRoles.all]: "students-educators",
};

const useGetUsersByRole = (role: usersRoles) => {
  return useQuery([useQueryNameByRole[role]], getUsersByRole(role));
};

const getUsersByRole = (role: usersRoles) => {
  return () =>
    axios
      .get<getUsersByRoleRes>(
        `${enviroment.railway}adm/getall/${roleQuery[role]}/`
      )
      .then(({ data }) => data);
};

export default useGetUsersByRole;
