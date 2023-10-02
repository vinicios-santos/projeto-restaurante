import { useEffect, useState } from "react";
import StudentWindow from "@components/student/StudentWindow";
import UserTable from "@components/user/UserTable";
import { usersRoles } from "@utils/usersEnum";

const Student = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    setReloadTable(true);
  }, [isAddModalOpen]);

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full p-2 flex flex-col">
      <div className="w-full flex justify-between mb-2">
        <input
          type="text"
          placeholder="Pesquisar aluno"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <label
          htmlFor="my-modal-student"
          className="btn modal-button btn-secondary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Adicionar
        </label>
        <input type="checkbox" id="my-modal-student" className="modal-toggle" />
        <StudentWindow setIsOpen={setIsAddModalOpen} isOpen={isAddModalOpen} />
      </div>
      <UserTable
        searchText={searchText}
        role={usersRoles.student}
        reload={reloadTable}
      />
    </div>
  );
};

export default Student;
