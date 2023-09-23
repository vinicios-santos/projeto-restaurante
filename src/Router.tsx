import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Subject from "./pages/Subject";
import Teacher from "./pages/Teacher";

export default function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/subjects" element={<Subject />} />
      <Route path="/teachers" element={<Teacher />} />
      <Route path="/students" element={<Student />} />
    </Routes>
  );
}
