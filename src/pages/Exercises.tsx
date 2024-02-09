import { Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { ListItem } from "../components/Exercises/ListItem";
import { Modal } from "../components/Modal";
import { axiosClient, getAxiosConfig } from "../services/axiosClient";
import { useUtils } from "../hooks/useUtils";
import { ExercisesListType, ExercisesType } from "../types/exercises";
import { Select } from "../components/Select";
import { exercisesCategories } from "../constants/exercises";
import { TextArea } from "../components/TextArea";
import { mockExerciseRoutes } from "../mocks/mock_exercises";
import { ConfirmModal } from "../components/ConfirmModal";

export function Exercises() {
     const toast = useToast();

     const { inputsValidation } = useUtils();

     const [searchName, setSearchName] = useState<string>('');
     const [searchCategory, setSearchCategory] = useState<string>('SELECIONE');

     const [allExercises, setAllExercises] = useState<ExercisesListType[]>([]);

     const [name, setName] = useState<string>('');
     const [category, setCategory] = useState<string | number>('SELECIONE');
     const [description, setDescription] = useState<string>('');

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

     const [isEditing, setIsEditing] = useState<boolean>(false);

     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
     const [isModalButtonLoading, setIsModalButtonLoading] = useState<boolean>(false);
     const [isConfirmModalButtonLoading, setIsConfirmModalButtonLoading] = useState<boolean>(false);

     const [editingId, setEditingId] = useState<number | null>(null);
     const [deletingId, setDeletingId] = useState<number | null>(null);

     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([''])

     const resetStates = () => {
          setName('');
          setCategory('SELECIONE');
          setDescription('');

          setInvalidatedInputs([]);
          setEditingId(null);
          setDeletingId(null);
          setIsEditing(false);
     }

     const getAllExercises = async () => { //TODO: colocar rota
          setIsLoading(true);

          await axiosClient.get('http://localhost:5173/api/exercises', getAxiosConfig())
               .then((response) => {
                    setAllExercises(response.data);
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao buscas os exercícios. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsLoading(false);
               });
     }

     const getExercise = async (exerciseId: number) => { //TODO: colocar rota
          setIsModalLoading(true);

          await axiosClient.get(`http://localhost:5173/api/exercise/${exerciseId}`, getAxiosConfig())
               .then((response) => {
                    const exercise: ExercisesType = response.data;

                    setName(exercise.NAME);
                    setCategory(exercise.CATEGORY_ID);
                    setDescription(exercise.DESCRIPTION);
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

     const storeExercise = async (data: ExercisesType) => { //TODO: colocar rota
          setIsModalButtonLoading(true);

          await axiosClient.post('http://localhost:5173/api/exercise/', data, getAxiosConfig())
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Exercício cadastrado!',
                         status: 'success'
                    });

                    resetStates();
                    setIsModalOpen(false);

                    await getAllExercises();
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao cadastrar o exercício. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalButtonLoading(false);
               });
     }

     const updateExercise = async (data: ExercisesType) => { //TODO: colocar rota
          setIsModalButtonLoading(true);

          await axiosClient.put(`http://localhost:5173/api/exercise/${editingId}`, data, getAxiosConfig())
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Exercício editado!',
                         status: 'success'
                    });

                    resetStates();
                    setIsModalOpen(false);

                    await getAllExercises();
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao editar o exercício. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalButtonLoading(false);
               });
     }

     const deleteExercise = async () => { //TODO: colocar rota
          setIsConfirmModalButtonLoading(true);

          await axiosClient.delete(`http://localhost:5173/api/exercise/${deletingId}`, getAxiosConfig())
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Exercício excluído!',
                         status: 'success'
                    });

                    resetStates();
                    setIsConfirmModalOpen(false);

                    await getAllExercises();
               })
               .catch((error) => {
                    toast({
                         title: 'Erro!',
                         description: `Erro ao excluir o exercício. Cód: ${error.response?.data.status}.`,
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsConfirmModalButtonLoading(false);
               });
     }

     const handleClickAddNewButton = () => {
          setIsModalOpen(true);
     }

     const handleEditButtonClick = async (exerciseId: number) => {
          setEditingId(exerciseId);
          setIsEditing(true);

          setIsModalOpen(true);

          await getExercise(exerciseId);
     }

     const handleDeleteButtonClick = (exerciseId: number) => {
          setDeletingId(exerciseId);

          setIsConfirmModalOpen(true);
     }

     const handleStoreOrUpdateButtonClick = () => {
          const data = {
               NAME: name,
               CATEGORY_ID: category as number,
               DESCRIPTION: description,
          }

          const validation = inputsValidation([
               { name: 'name', value: name },
               { name: 'category', value: category, isSelect: true },
               { name: 'description', value: description },
          ]);

          if (validation.isValidated) {
               isEditing ? updateExercise(data) : storeExercise(data);
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     useEffect(() => {
          mockExerciseRoutes();

          getAllExercises();
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
                                        <GridItem colSpan={{ base: 15, md: 9 }}>
                                             <Input
                                                  id={"search-name"}
                                                  type={"text"}
                                                  label={"Nome"}
                                                  width={{ base: '100%' }}
                                                  value={searchName}
                                                  onChange={(e) => setSearchName(e.target.value)}
                                             />
                                        </GridItem>
                                        <GridItem colSpan={{ base: 14, md: 5 }}>
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
                                   allExercises?.map((exercise, index) => {
                                        return (
                                             <ListItem
                                                  exercise={exercise}
                                                  key={index}
                                                  editAction={() => handleEditButtonClick(exercise.ID)}
                                                  deleteAction={() => handleDeleteButtonClick(exercise.ID)}
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
               <ConfirmModal
                    message={"Deseja excluir esse exercício ?"}
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    isButtonLoading={isConfirmModalButtonLoading}
                    action={deleteExercise}
               />
          </>
     )
}