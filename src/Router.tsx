import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Login } from "./pages/Login";
import { DefaultLayout } from "./layout/DefaultLayout";
// import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { Exercises } from "./pages/Exercises";
import { Sheets } from "./pages/Sheets";

export const Router = createBrowserRouter(
     createRoutesFromElements(
          <>
               <Route path="/" element={<Login />} />
               <Route path="/" element={<DefaultLayout />}>
                    <Route path="home" element={<Home />} />
                    {/* <Route path="profile" element={<Profile />} /> */}
                    <Route path="users" element={<Users />} />
                    <Route path="exercises" element={<Exercises />} />
                    <Route path="sheets" element={<Sheets />} />
               </Route>
          </>
     )
);