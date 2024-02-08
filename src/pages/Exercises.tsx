import { Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { Button } from "../components/Button";
// import { UsersType } from "../types/users";
import { ListItem } from "../components/Exercises/ListItem";
import { Modal } from "../components/Modal";
import { axiosClient, getAxiosConfig } from "../services/axiosClient";
import { useUtils } from "../hooks/useUtils";
import { ExercisesType } from "../types/exercises";
import { Select } from "../components/Select";
import { exercisesCategories } from "../constants/exercises";
import { TextArea } from "../components/TextArea";

export function Exercises() {
     const toast = useToast();

     const { inputsValidation } = useUtils();

     const [searchName, setSearchName] = useState<string>('');
     const [searchCategory, setSearchCategory] = useState<string>('SELECIONE');

     // const [allExercises, setAllExercises] = useState<UsersType[]>([]);

     const [name, setName] = useState<string>('');
     const [category, setCategory] = useState<string>('SELECIONE');
     const [description, setDescription] = useState<string>('');
     // const [videoLink, setVideoLink] = useState<string>('');

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     const [isEditing, setIsEditing] = useState<boolean>(false);

     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
     const [isModalButtonLoading, setIsModalButtonLoading] = useState<boolean>(false);

     const [editingId, setEditingId] = useState<number | null>(null);

     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([''])

     const exercisesArray: ExercisesType[] = [
          {
               id: 1,
               name: 'Puxada triângulo',
               category: 'Costas'
          },
          {
               id: 3,
               name: 'Supino inclinado',
               category: 'Peito'
          },
          {
               id: 3,
               name: 'Rosca martelo',
               category: 'Bíceps'
          },
     ]

     const resetStates = () => {
          setName('');
          setCategory('SELECIONE');
     }

     // const getAllExercises = async () => { //TODO: colocar rota
     //      setIsLoading(true);

     //      await axiosClient.get('/', getAxiosConfig())
     //           .then((response) => {
     //                setAllExercises(response.data);
     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao buscas os exercícios. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsLoading(false);
     //           });
     // }

     const getExercise = async () => { //TODO: colocar rota
          setIsModalLoading(true);

          await axiosClient.get(`/${editingId}`, getAxiosConfig())
               .then((response) => {
                    console.log(response);
                    // setAllUsers(response.data);
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao buscar as informações do exercício. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalLoading(false);
               });
     }

     // const storeExercise = async (data: ExercisesType) => { //TODO: colocar rota
     //      setIsModalButtonLoading(true);

     //      await axiosClient.post('/', data, getAxiosConfig())
     //           .then(async (response) => {
     //                toast({
     //                     title: 'Sucesso!',
     //                     description: 'Exercício cadastrado!',
     //                     status: 'success'
     //                });

     //                resetStates();

     //                await getAllExercises();
     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao cadastrar o exercício. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsModalButtonLoading(false);
     //           });
     // }

     // const updateExercise = async (data: ExercisesType) => { //TODO: colocar rota
     //      setIsModalButtonLoading(true);

     //      await axiosClient.post(`/${editingId}`, data, getAxiosConfig())
     //           .then(async (response) => {
     //                toast({
     //                     title: 'Sucesso!',
     //                     description: 'Exercício editado!',
     //                     status: 'success'
     //                });

     //                resetStates();

     //                await getAllExercises();
     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao editar o exercício. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsModalButtonLoading(false);
     //           });
     // }

     const handleClickAddNewButton = () => {
          setIsModalOpen(true);
     }

     const handleEditButtonClick = async (exerciseId: number) => {
          setEditingId(exerciseId);
          setIsEditing(true);

          setIsModalOpen(true);

          await getExercise();
     }

     // const handleDeleteButtonClick = (exerciseId: number) => {

     // }

     const handleStoreOrUpdateButtonClick = () => {
          const data = {
               name: name,
               category: category
          }

          const validation = inputsValidation([
               { name: 'exercise-name', value: name },
               { name: 'exercise-category', value: category },
          ]);

          if (validation.isValidated) {
               // isEditing ? updateUser() : storeUser();
               console.log(data);
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     useEffect(() => {
          // getAllExercises();
          setIsLoading(false);
          setIsModalButtonLoading(false);
     }, [])

     return (
          <>
               <Container
                    title={"Exercícios"}
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
                                        <GridItem colSpan={{ base: 15, md: 9}}>
                                             <Input
                                                  id={"search-name"}
                                                  type={"text"}
                                                  label={"Nome"}
                                                  width={{ base: '100%' }}
                                                  value={searchName}
                                                  onChange={(e) => setSearchName(e.target.value)}
                                                  />
                                        </GridItem>
                                        <GridItem colSpan={{ base: 14, md: 5}}>
                                             <Select
                                                  id={"search-category"}
                                                  label={"Categoria"}
                                                  items={exercisesCategories}
                                                  width={{ base: '100%' }}
                                                  value={searchCategory}
                                                  onChange={(e) => setSearchCategory(e.target.value)}
                                                  hasSelectOption
                                             />
                                        </GridItem>
                                        <GridItem>
                                             <IconButton
                                                  primary={false}
                                                  icon={<MagnifyingGlass />}
                                                  onClick={function (): void {
                                                       throw new Error("Function not implemented.");
                                                  }}
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
                                   exercisesArray?.map((exercise, index) => {
                                        return (
                                             <ListItem
                                                  exercise={exercise}
                                                  key={index}
                                                  editAction={() => handleEditButtonClick(exercise.id)}
                                                  deleteAction={() => ''}
                                                  // deleteAction={() => handleDeleteButtonClick(exercise.id)}
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
                    title={isEditing ? "Editar exercício" : "Cadastrar exercício"}
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
                         <GridItem colSpan={11}>
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
                         <GridItem colSpan={4}>
                              <Select
                                   id={"category"}
                                   label={"Categoria"}
                                   items={exercisesCategories}
                                   value={category}
                                   onChange={(e) => setCategory(e.target.value)}
                                   hasSelectOption
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={15}>
                              <TextArea
                                   id={"description"}
                                   label={"Descrição"}
                                   width={{ base: '100%' }}
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   isDisabled={isModalButtonLoading}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                    </Grid>
               </Modal>
          </>
     )
}