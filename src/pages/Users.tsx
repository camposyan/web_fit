import { Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { UsersListType, UsersType } from "../types/users";
import { ListItem } from "../components/Users/ListItem";
import { Modal } from "../components/Modal";
import { axiosClient, getAxiosConfig } from "../services/axiosClient";
import { useUtils } from "../hooks/useUtils";
import { Checkbox } from "../components/Checkbox";
import { mockUserRoutes } from "../mocks/mock_users";

export function Users() {
     const toast = useToast();

     const { inputsValidation } = useUtils();

     const [searchName, setSearchName] = useState<string>('');

     const [allUsers, setAllUsers] = useState<UsersListType[]>([]);

     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [cellphone, setCellphone] = useState<string>('');
     const [isWppCell, setIsWppCell] = useState<boolean>(false);

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     const [isEditing, setIsEditing] = useState<boolean>(false);

     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
     const [isModalButtonLoading, setIsModalButtonLoading] = useState<boolean>(false);

     const [editingId, setEditingId] = useState<number | null>(null);

     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([]);

     const resetStates = () => {
          setName('');
          setEmail('');
          setCellphone('');
          setIsWppCell(false);

          setInvalidatedInputs([]);
          setEditingId(null);
          setIsEditing(false);
     }

     const getAllUsers = async () => { //TODO: colocar rota
          setIsLoading(true);

          await axiosClient.get('http://localhost:5173/api/users', getAxiosConfig())
               .then((response) => {
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

     const getUser = async (userId: number) => { //TODO: colocar rota
          setIsModalLoading(true);

          await axiosClient.get(`http://localhost:5173/api/users/${userId}`, getAxiosConfig())
               .then((response) => {
                    const user: UsersType = response.data;

                    setName(user.NAME);
                    setEmail(user.EMAIL);
                    setCellphone(user.CELLPHONE);
                    setIsWppCell(user.IS_WPP_CELL);
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

          await axiosClient.post('http://localhost:5173/api/user', data)
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Usuário cadastrado!',
                         status: 'success'
                    });

                    resetStates();
                    setIsModalOpen(false);

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

          await axiosClient.put(`http://localhost:5173/api/user/${editingId}`, data, getAxiosConfig())
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Usuário cadastrado!',
                         status: 'success'
                    });

                    resetStates();
                    setIsModalOpen(false);

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

     const handleToggleActiveUser = async (userId: number) => {
          await axiosClient.get(`http://localhost:5173/api/users/${userId}`, getAxiosConfig())
               .then(async (response) => {
                    const user: UsersType = response.data;
                    const data: UsersType = {
                         NAME: user.NAME,
                         EMAIL: user.EMAIL,
                         CELLPHONE: user.CELLPHONE, 
                         IS_WPP_CELL: user.IS_WPP_CELL,
                         ACTIVE: !user.ACTIVE, 
                         PERSONAL_ID: 1
                    }

                    await axiosClient.put(`http://localhost:5173/api/user/${userId}`, data, getAxiosConfig())
                         .then(async () => {
                              toast({
                                   title: 'Sucesso!',
                                   description: 'Status alterado!',
                                   status: 'success'
                              });

                              await getAllUsers();
                         })
                         .catch((error) => {
                              toast({
                                   title: 'Erro!',
                                   description: `Erro ao alterar o status do usuário. Cód: ${error.response?.data.status}.`,
                                   status: 'error'
                              });
                         })
               })
     }

     const handleClickAddNewButton = () => {
          setIsModalOpen(true);
     }

     const handleEditButtonClick = async (userId: number) => {
          setEditingId(userId);
          setIsEditing(true);

          setIsModalOpen(true);

          await getUser(userId);
     }

     const handleActiveButtonClick = async (userId: number) => {
          await handleToggleActiveUser(userId);
     }

     const handleStoreOrUpdateButtonClick = () => {
          const data: UsersType = {
               NAME: name,
               EMAIL: email,
               CELLPHONE: cellphone,
               IS_WPP_CELL: isWppCell,
               ACTIVE: true,
               PERSONAL_ID: 1 //TODO: alterar depois
          }

          const validation = inputsValidation([
               { name: 'name', value: name },
               { name: 'email', value: email },
               { name: 'cellphone', value: cellphone },
          ]);

          if (validation.isValidated) {
               isEditing ? updateUser(data) : storeUser(data);
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     const handleSearchButtonClick = () => {
          const searchedUsers = allUsers.find(user => user.NAME.toLowerCase() === searchName.toLowerCase())

          console.log(searchedUsers);
     }

     useEffect(() => {
          mockUserRoutes();

          getAllUsers();
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
                    title={isEditing ? 'Editar usuário' : "Cadastrar usuário"}
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
                         <GridItem colSpan={{ base: 15 }}>
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
                                   isChecked={isWppCell}
                                   onChange={(e) => setIsWppCell(e.target.checked)}
                              />
                         </GridItem>
                    </Grid>
               </Modal>
          </>
     )
}