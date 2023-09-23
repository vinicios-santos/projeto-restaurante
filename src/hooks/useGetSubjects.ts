import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import enviroment from "../environments/enviroment";

export type subject = {
  id: number;
  id_professor: number;
  meet_number: number;
  subject_name: string;
  tag_id: number;
};

const useGetSubjects = () => {
  return useQuery(["getSubjects"], getSubjects());
};

const getSubjects = () => {
  return (): Promise<subject[]> =>
    axios
      .get(`${enviroment.railway}adm/getall/subject/`)
      .then(({ data }) => data);
};

export default useGetSubjects;
