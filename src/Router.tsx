import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Exercises } from "./pages/Exercises";
import { Sheets } from "./pages/Sheets";
import { Students } from "./pages/Students";
import { StudentSheet } from "./pages/StudentSheet";

export function Router() {
     return (
          <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/" element={<DefaultLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="usuarios" element={<Users />} />
                    <Route path="alunos" element={<Students />} />
                    <Route path="exercicios" element={<Exercises />} />
                    <Route path="fichas" element={<Sheets />} />
                    <Route path="fichas/:studentId" element={<StudentSheet />} />
               </Route>
          </Routes>
     )
}