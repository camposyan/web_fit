import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Exercises } from "./pages/Exercises";

export const Router = createBrowserRouter(
     createRoutesFromElements(
          <>
               <Route path="/" element={<Login />} />
               <Route path="/" element={<DefaultLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="users" element={<Users />} />
                    <Route path="exercises" element={<Exercises />} />
               </Route>
          </>
     )
);