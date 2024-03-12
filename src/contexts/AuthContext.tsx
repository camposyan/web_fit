import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface AuthContextProps {
     children: ReactNode
}

interface AuthContextData {
     isLoggedIn: boolean
     user: UserDataType | null
     login(userName: string, userPassword: string, setIsLoading: Dispatch<SetStateAction<boolean>>): Promise<void>
}

interface UserDataType {
     id: number,
     email: string,
     name: string,
     token: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
     const toast = useToast();
     const navigate = useNavigate();

     const [user, setUser] = useState<UserDataType | null>(null);
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

     async function login(
          userName: string,
          userPassword: string,
          setIsLoading: Dispatch<SetStateAction<boolean>>
     ): Promise<void> {
          setIsLoading(true);

          const data = {
               USERNAME: userName,
               PASSWORD: userPassword,
          }

          await axiosClient.post('/auth/login', data)
               .then((response) => {
                    axiosClient.interceptors.request.use(
                         function (config) {
                              config.headers['Authorization'] = `Bearer ${response.data.TOKEN}`

                              return config;
                         }
                    )

                    setUser({
                         id: response.data.ID,
                         name: response.data.NAME,
                         email: response.data.EMAIL,
                         token: response.data.TOKEN
                    });
                    setIsLoggedIn(true);

                    navigate('/home')
               })
               .catch(() => {
                    toast({
                         title: 'Acesso negado!',
                         description: 'Usuário sem permissão de acesso.',
                         status: 'error'
                    })
               })
               .finally(() => {
                    setIsLoading(false);
               })
     }

     return (
          <AuthContext.Provider value={{ isLoggedIn, login, user }}>
               {children}
          </AuthContext.Provider>
     )
}
