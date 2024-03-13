import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface AuthContextProps {
     children: ReactNode
}

interface AuthContextData {
     isLoggedIn: boolean
     user: UserDataType
     login(
          userName: string,
          userPassword: string,
          setIsLoading: Dispatch<SetStateAction<boolean>>
     ): Promise<void>
}

interface UserDataType {
     ID: number,
     PERSONAL_TRAINER_ID: number,
     EMAIL: string,
     NAME: string,
     TOKEN: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
     const toast = useToast();
     const navigate = useNavigate();

     const [user, setUser] = useState<UserDataType>({ ID: 0, PERSONAL_TRAINER_ID: 0, EMAIL: '', NAME: '', TOKEN: '', });
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
                         ID: response.data.ID,
                         PERSONAL_TRAINER_ID: response.data.PERSONAL_TRAINER_ID,
                         NAME: response.data.NAME,
                         EMAIL: response.data.EMAIL,
                         TOKEN: response.data.TOKEN
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
