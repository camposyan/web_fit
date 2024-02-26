import { ReactNode, createContext, useContext, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface AuthContextProps {
     children: ReactNode
}

interface AuthContextData {
     isLoggedIn: boolean
     user: UserDataType | null
     login(userEmail: string, userPassword: string): Promise<void>
}

interface UserDataType {
     id: number,
     email: string,
     name: string,
     // token: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
     const toast = useToast();
     const navigate = useNavigate();

     const [user, setUser] = useState<UserDataType | null>(null);
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

     async function login(userEmail: string, userPassword: string) {
          const data = {
               EMAIL: userEmail,
               PASSWORD: userPassword,
          }

          await axiosClient.post('/login', data)
               .then((response) => {
                    axiosClient.interceptors.request.use(
                         function (config) {
                              config.headers['Authorization'] = `Bearer ${response.data.token}`

                              return config;
                         }
                    )
                         console.log(response.data);
                    setUser({
                         id: 0,
                         name: 'response.data.name',
                         email: 'response.data.email',
                         // token: response.data.token
                    });
                    setIsLoggedIn(true);

                    navigate('/home')
               })
               .catch((error) => {
                    console.log(error);
                    toast({
                         title: 'Acesso negado!',
                         description: error.response.data.message,
                         status: 'error'
                    })
               })
     }

     return (
          <AuthContext.Provider value={{ isLoggedIn, login, user }}>
               {children}
          </AuthContext.Provider>
     )
}
