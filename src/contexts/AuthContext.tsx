import { ReactNode, createContext, useState } from "react";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface AuthContextProps {
     children: ReactNode
}

interface AuthContextData {
     signed: boolean
     user: UserDataType | null
     login(userEmail: string, userPassword: string): Promise<void>
}

interface UserDataType {
     id: number,
     email: string,
     name: string,
     token: string,
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProps) => {
     const toast = useToast();
     const navigate = useNavigate();
     
     const [user, setUser] = useState<UserDataType | null>(null);

     const login = async (userEmail: string, userPassword: string) => {
          await axiosClient.post('/question-bank/user/login', {
               email: userEmail,
               password: userPassword,
          })
               .then((response) => {
                    axiosClient.defaults.headers.Authorization = `Bearer ${response.data.token}`
                    window?.localStorage.setItem('USER-TOKEN', response.data.token)
                    
                    setUser({
                         id: response.data.id,
                         name: response.data.name,
                         email: response.data.email,
                         token: response.data.token
                    })

                    const profiles = response.data.profiles;

                    if (profiles.find((profile: any) => profile.id == 1)) {
                         navigate('/dashboard')
                    } else {
                         toast({
                              title: 'Acesso negado!',
                              description: 'Usuário não possui permissão de acesso ao módulo de treinamento.',
                              status: 'error'
                         })
                    }
               })
               .catch((error) => {
                    toast({
                         title: 'Acesso negado!',
                         description: error.response.data.message,
                         status: 'error'
                    })
               })
     }

     return (
          <AuthContext.Provider value={{signed: Boolean(user), login, user }}>
               {children}
          </AuthContext.Provider>
     )
}

// export const AXIOS_CONFIG = {
//      headers: {
//          "Content-Type": "application/json",
//          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
//        },
//  }

