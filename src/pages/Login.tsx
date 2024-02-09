import { Flex, Image, useToast } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import logo from '../assets/logo.jpg'
import { Input } from "../components/Input";
import { useState } from "react";
import { EyeSlash, Lock, Eye, User } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { axiosClient } from "../services/axiosClient";
import { useNavigate } from "react-router-dom";
import { useUtils } from "../hooks/useUtils";

export function Login() {
     const toast = useToast();
     const navigate = useNavigate();

     const { emailValidation, passwordValidation, inputsValidation } = useUtils();

     const [userEmail, setUserEmail] = useState<string>('');
     const [userPassword, setUserPassword] = useState<string>('');

     const [seePassword, setSeePassword] = useState<boolean>(false);
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([''])

     const login = async (email: string, password: string) => {
          await axiosClient.post('/user/login', {
               email: email,
               password: password
          })
               .then((response) => {
                    window?.localStorage.setItem('LOGIN-TOKEN', response.data.token);

                    navigate("/pratical_tests");
               })
               .catch((error) => {
                    toast({
                         title: 'Erro ao realizar o login!',
                         description: `Um erro inesperado aconteceu. Entre em contato com o suporte. Cód: ${error.response.data.status}`,
                         status: 'error'
                    })
               })
               .finally(() => {
                    setIsLoading(false);
               })
     }

     const handleLoginButtonClick = async () => {
          const validation = inputsValidation([
               { name: 'login', value: userEmail, type: 'email' },
               { name: 'password', value: userPassword, type: 'password' },
          ]);

          if (validation.isValidated) {
               setIsLoading(true);

               // await login(userEmail, userPassword);
               navigate("/home");
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     return (
          <Flex
               width={'100vw'}
               height={'100vh'}
               backgroundColor={colors.mainBackgroundColor}
               justifyContent={'center'}
               alignItems={'center'}
          >
               <Flex
                    width={'23rem'}
                    backgroundColor={colors.menuBackgroundColor}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={'15px'}
                    direction={'column'}
                    padding={'1rem'}
                    gap={'1rem'}
               >
                    <Image
                         src={logo}
                         height={'15rem'}
                         alt="Azevedo Personal Trainer"
                         marginBottom={'3rem'}
                    />
                    <Input
                         id={"login"}
                         label={"E-mail"}
                         inputLeftIcon={<User size={25} color={colors.basicTextColor} />}
                         type={"email"}
                         width={{ base: '100%' }}
                         value={userEmail}
                         onChange={(e) => setUserEmail(e.target.value)}
                         onBlur={(e) => emailValidation(e.target.value)}
                         invalidInputsArray={invalidatedInputs}
                    />
                    <Input
                         id={"password"}
                         label={"Senha"}
                         inputLeftIcon={<Lock size={25} color={colors.basicTextColor} />}
                         type={seePassword ? "text" : "password"}
                         width={{ base: '100%' }}
                         value={userPassword}
                         inputButton={{
                              icon: seePassword ? <EyeSlash size={25} /> : <Eye size={25} />,
                              action: () => setSeePassword(!seePassword)
                         }}
                         onChange={(e) => setUserPassword(e.target.value)}
                         onBlur={(e) => passwordValidation(e.target.value)}
                         invalidInputsArray={invalidatedInputs}
                    />
                    <Button
                         primary
                         width={"100%"}
                         text={"LOGIN"}
                         isLoading={isLoading}
                         onClick={handleLoginButtonClick}
                    />
               </Flex>
          </Flex>
     )
}