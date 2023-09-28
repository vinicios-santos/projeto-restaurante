import { Route, Routes } from "react-router-dom";
import Analytics from "./pages/analytics";
import Home from "./pages/home";
import Student from "./pages/student";
import Subject from "./pages/subject";
import Teacher from "./pages/teacher";

export default function Router() {
  return (
    <Routes>
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/home" element={<Home />} />
      <Route path="/subjects" element={<Subject />} />
      <Route path="/teachers" element={<Teacher />} />
      <Route path="/students" element={<Student />} />
    </Routes>
  );
}
