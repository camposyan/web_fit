import { Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { Eye, EyeSlash, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { UsersListType, UsersType } from "../types/users";
import { ListItem } from "../components/Users/ListItem";
import { Modal } from "../components/Modal";
import { axiosClient, getAxiosConfig } from "../services/axiosClient";
import { useUtils } from "../hooks/useUtils";
import { Checkbox } from "../components/Checkbox";
import { mockUserRoutes } from "../mocks/users/mock_users";

export function Users() {
     const toast = useToast();

     const { inputsValidation } = useUtils();

     const [searchName, setSearchName] = useState<string>('');

     const [allUsers, setAllUsers] = useState<UsersListType[]>([]);

     const [name, setName] = useState<string>('');
     const [userName, setUserName] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [cellphone, setCellphone] = useState<string>('');
     const [isWppCell, setIsWppCell] = useState<boolean>(false);
     const [isActive, setIsActive] = useState<string>('');
     const [password, setPassword] = useState<string>('');
     // const [userDocument, setUserDocument] = useState<string>('');

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     const [isEditing, setIsEditing] = useState<boolean>(false);

     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
     const [isModalButtonLoading, setIsModalButtonLoading] = useState<boolean>(false);

     const [editingId, setEditingId] = useState<number | null>(null);

     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([]);

     const [seePassword, setSeePassword] = useState<boolean>(false);

     const userArray: UsersListType[] = [
          {
               ID: 1,
               NAME: 'Yan Campos',
               EMAIL: 'camposyan00@gmail.com',
               CELLPHONE: '(32)98884-3542',
               IS_WPP_CELL: true,
               ACTIVE: true,
          },
          {
               ID: 1,
               NAME: 'Gabriel Azevedo',
               EMAIL: 'camposyan00@gmail.com',
               CELLPHONE: '(32)98884-3542',
               IS_WPP_CELL: false,
               ACTIVE: false,
          },
          {
               ID: 1,
               NAME: 'Nikolas Calixto',
               EMAIL: 'camposyan00@gmail.com',
               CELLPHONE: '(32)98884-3542',
               IS_WPP_CELL: false,
               ACTIVE: true,
          },
          {
               ID: 1,
               NAME: 'Thiago Netto',
               EMAIL: 'camposyan00@gmail.com',
               CELLPHONE: '(32)98884-3542',
               IS_WPP_CELL: true,
               ACTIVE: false,
          },
          {
               ID: 1,
               NAME: 'Júlia Monteiro',
               EMAIL: 'camposyan00@gmail.com',
               CELLPHONE: '(32)98884-3542',
               IS_WPP_CELL: true,
               ACTIVE: true,
          },
     ]

     const resetStates = () => {
          setUserName('');
          setName('');
          setEmail('');
          setPassword('');
          setCellphone('');
          setIsWppCell(false);

          setInvalidatedInputs([]);
     }

     const getAllUsers = async () => { //TODO: colocar rota
          setIsLoading(true);

          await axiosClient.get('http://localhost:5173/api/users', getAxiosConfig())
               .then((response) => {
                    console.log(response);
                    setAllUsers(response.data);
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao buscas os usuários. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsLoading(false);
               });
     }

     const getUser = async () => { //TODO: colocar rota
          setIsModalLoading(true);

          await axiosClient.get(`/${editingId}`, getAxiosConfig())
               .then((response) => {
                    // setAllUsers(response.data);
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao buscar as informações do usuário. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalLoading(false);
               });
     }

     const storeUser = async (data: UsersType) => { //TODO: colocar rota
          setIsModalButtonLoading(true);

          await axiosClient.post('/user', data)
               .then(async (response) => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Usuário cadastrado!',
                         status: 'success'
                    });

                    resetStates();

                    await getAllUsers();
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao cadastrar o usuário. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalButtonLoading(false);
               });
     }

     const updateUser = async (data: UsersType) => { //TODO: colocar rota
          setIsModalButtonLoading(true);

          await axiosClient.post(`/${editingId}`, data, getAxiosConfig())
               .then(async (response) => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Usuário cadastrado!',
                         status: 'success'
                    });

                    resetStates();

                    await getAllUsers();
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao editar o usuário. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalButtonLoading(false);
               });
     }

     const handleClickAddNewButton = () => {
          setIsModalOpen(true);
     }

     const handleEditButtonClick = async (userId: number) => {
          setEditingId(userId);
          setIsEditing(true);

          setIsModalOpen(true);

          await getUser();
     }

     const handleActiveButtonClick = (userId: number) => {

     }

     const handleStoreOrUpdateButtonClick = () => {
          const data: UsersType = {
               USERNAME: userName,
               NAME: name,
               PASSWORD: password,
               EMAIL: email,
               CELLPHONE: cellphone,
               IS_WPP_CELL: isWppCell,
               ACTIVE: true,
               PERSONAL_ID: 1 //TODO: alterar depois
          }

          const validation = inputsValidation([
               { name: 'name', value: name },
               { name: 'username', value: userName },
               { name: 'password', value: password },
               { name: 'email', value: email },
               { name: 'cellphone', value: cellphone },
          ]);

          if (validation.isValidated) {
               isEditing ? updateUser(data) : storeUser(data);
               console.log(data);
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     const handleSearchButtonClick = () => {
          
     }

     useEffect(() => {
          mockUserRoutes();

          getAllUsers();
          setAllUsers(userArray);
     }, [])

     return (
          <>
               <Container
                    title={"Usuários"}
                    isLoading={isLoading}
               >
                    <Flex
                         direction={'column'}
                         width={'100%'}
                    >
                         <Flex
                              width={'100%'}
                              justifyContent={{ base: 'flex-start', lg: 'space-between' }}
                              alignItems={{ md: 'end' }}
                              gap={'1rem'}
                              direction={{ base: 'column', md: 'row' }}
                              marginBottom={'2rem'}
                         >
                              <Flex
                                   gap={'1rem'}
                                   alignItems={'end'}
                                   flex={1}
                              >
                                   <Grid
                                        templateColumns={'repeat(15, 1fr)'}
                                        gap={'1rem'}
                                        alignItems={'flex-end'}
                                   >
                                        <GridItem colSpan={14}>
                                             <Input
                                                  id={"search-name"}
                                                  type={"text"}
                                                  label={"Nome"}
                                                  width={{ base: '100%' }}
                                                  value={searchName}
                                                  onChange={(e) => setSearchName(e.target.value)}
                                             />
                                        </GridItem>
                                        <GridItem>
                                             <IconButton
                                                  primary={false}
                                                  icon={<MagnifyingGlass />}
                                                  onClick={handleSearchButtonClick}
                                             />
                                        </GridItem>
                                   </Grid>
                              </Flex>
                              <Button
                                   primary
                                   icon={<Plus />}
                                   text={"Adicionar novo"}
                                   onClick={handleClickAddNewButton}
                              />
                         </Flex>
                         <Flex
                              direction={'column'}
                              gap={'0.5rem'}
                         >
                              {
                                   allUsers?.map((user, index) => {
                                        return (
                                             <ListItem
                                                  user={user}
                                                  key={index}
                                                  editAction={() => handleEditButtonClick(user.ID)}
                                                  activeAction={() => handleActiveButtonClick(user.ID)}
                                             />
                                        )
                                   })
                              }
                         </Flex>
                    </Flex>
               </Container>
               <Modal
                    isOpen={isModalOpen}
                    onClose={() => (setIsModalOpen(false), resetStates())}
                    title={isEditing ? "Editar usuário" : "Cadastrar usuário"}
                    size={"4xl"}
                    isEditing={isEditing}
                    isLoading={isModalLoading}
                    isButtonLoading={isModalButtonLoading}
                    primaryAction={handleStoreOrUpdateButtonClick}
               >
                    <Grid
                         templateColumns={'repeat(15, 1fr)'}
                         gap={'1rem'}
                    >
                         <GridItem colSpan={{ base: 15, md: 3, lg: 3 }}>
                              <Input
                                   id={"username"}
                                   label={"Usuário"}
                                   type={"text"}
                                   width={{ base: '100%' }}
                                   value={userName}
                                   onChange={(e) => setUserName(e.target.value)}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 15, md: 9, lg: 9 }}>
                              <Input
                                   id={"name"}
                                   label={"Nome"}
                                   type={"text"}
                                   width={{ base: '100%' }}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 15, md: 3, lg: 3 }}>
                              <Input
                                   id={"password"}
                                   label={"Senha"}
                                   type={seePassword ? "text" : "password"}
                                   width={{ base: '100%' }}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   inputButton={{
                                        icon: seePassword ? <EyeSlash size={25} /> : <Eye size={25} />,
                                        action: () => setSeePassword(!seePassword)
                                   }}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 15, md: 9, lg: 10 }}>
                              <Input
                                   id={"email"}
                                   label={"E-mail"}
                                   type={"text"}
                                   width={{ base: '100%' }}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 15, md: 3, lg: 3 }}>
                              <Input
                                   id={"cellphone"}
                                   label={"Celular"}
                                   type={"text"}
                                   width={{ base: '100%' }}
                                   value={cellphone}
                                   onChange={(e) => setCellphone(e.target.value)}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   mask={"(__)_____-____"}
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 3, md: 3, lg: 2 }}>
                              <Checkbox
                                   id={"wpp"}
                                   label={"Whatsapp?"}
                                   optionText={"Sim"}
                                   value={isWppCell}
                                   onChange={(e) => setIsWppCell(e.target.checked)}
                              />
                         </GridItem>
                    </Grid>
               </Modal>
          </>
     )
}