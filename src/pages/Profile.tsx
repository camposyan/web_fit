// import { Flex, Grid, GridItem, Text, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
// import { Input } from "../components/Input";
import { useEffect, useState } from "react";
// import { axiosClient, getAxiosConfig } from "../services/axiosClient";
// import { useUtils } from "../hooks/useUtils";
// import { ExercisesType } from "../types/exercises";
// import dayjs from "dayjs"
// import { ImageInput } from "../components/ImageInput";
// import { colors } from "../constants/colors";

export function Profile() {
     // const toast = useToast();

     // const { inputsValidation } = useUtils();

     // const [weight, setWeight] = useState<string>('');
     // const [height, setHeight] = useState<string>('');
     // const [actualDate, setActualDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
     // const [frontImageFile, setFrontImageFile] = useState<File | null | undefined>(null);
     // const [frontImagePath, setFrontImagePath] = useState<string>('');
     // const [backImageFile, setBackImageFile] = useState<File | null | undefined>(null);
     // const [backImagePath, setBackImagePath] = useState<string>('');
     // const [leftImageFile, setLeftImageFile] = useState<File | null | undefined>(null);
     // const [leftImagePath, setLeftImagePath] = useState<string>('');
     // const [rightImageFile, setRightImageFile] = useState<File | null | undefined>(null);
     // const [rightImagePath, setRightImagePath] = useState<string>('');

     // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     // const [isEditing, setIsEditing] = useState<boolean>(false);

     const [isLoading, setIsLoading] = useState<boolean>(false);

     // const [editingId, setEditingId] = useState<number | null>(null);

     // const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([''])

     // const resetStates = () => {
     //      setWeight('');
     //      setHeight('');
     // }

     // const getProfile = async () => { //TODO: colocar rota
     //      setIsLoading(true);

     //      await axiosClient.get(`/${editingId}`)
     //           .then((response) => {
     //                // setAllUsers(response.data);
     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao buscar as informações do perfil. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsLoading(false);
     //           });
     // }

     // const storeProfile = async (data: ExercisesType) => { //TODO: colocar rota
     //      setIsLoading(true);

     //      await axiosClient.post('/', data)
     //           .then(async (response) => {
     //                toast({
     //                     title: 'Sucesso!',
     //                     description: 'Perfil cadastrado!',
     //                     status: 'success'
     //                });

     //                resetStates();

     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao cadastrar o perfil. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsLoading(false);
     //           });
     // }

     // const updateProfile = async (data: ExercisesType) => { //TODO: colocar rota
     //      setIsLoading(true);

     //      await axiosClient.post(`/${editingId}`, data)
     //           .then(async (response) => {
     //                toast({
     //                     title: 'Sucesso!',
     //                     description: 'Perfil editado!',
     //                     status: 'success'
     //                });

     //                resetStates();

     //           })
     //           .catch((error) => {
     //                toast({
     //                     title: 'Erro!',
     //                     description: `Erro ao editar o perfil. Cód: ${error.response?.data.status}.`,
     //                     status: 'error'
     //                });
     //           })
     //           .finally(() => {
     //                setIsLoading(false);
     //           });
     // }

     // const handleStoreOrUpdateButtonClick = () => {
     //      const data = {
     //           // name: exerciseName,
     //           // category: exerciseCategory
     //      }

     //      const validation = inputsValidation([
     //           // { name: 'exercise-name', value: exerciseName },
     //           // { name: 'exercise-category', value: exerciseCategory },
     //      ]);

     //      if (validation.isValidated) {
     //           // isEditing ? updateUser() : storeUser();
     //           console.log(data);
     //      } else {
     //           setInvalidatedInputs(validation.invalidatedInputs)
     //      }
     // }

     // const handleChangeUserFrontImage = (e: ChangeEvent<HTMLInputElement>) => {
     //      setFrontImageFile(e.target.files?.[0])
     //      setFrontImagePath(URL.createObjectURL(e.target.files?.[0] as File));
     // }

     // const handleChangeUserBackImage = (e: ChangeEvent<HTMLInputElement>) => {
     //      setBackImageFile(e.target.files?.[0])
     //      setBackImagePath(URL.createObjectURL(e.target.files?.[0] as File));
     // }

     // const handleChangeUserLeftImage = (e: ChangeEvent<HTMLInputElement>) => {
     //      setLeftImageFile(e.target.files?.[0])
     //      setLeftImagePath(URL.createObjectURL(e.target.files?.[0] as File));
     // }

     // const handleChangeUserRightImage = (e: ChangeEvent<HTMLInputElement>) => {
     //      setRightImageFile(e.target.files?.[0])
     //      setRightImagePath(URL.createObjectURL(e.target.files?.[0] as File));
     // }

     useEffect(() => {
          // getAllExercises();
          setIsLoading(false);
     }, [])

     return (
          <Container
               title={"Perfil"}
               isLoading={isLoading}
          >
               asd
               {/* <Flex
                    direction={'column'}
                    gap={'1rem'}
               >
                    <Grid
                         templateColumns={'repeat(16, 1fr)'}
                         gap={'1rem'}
                    >
                         <GridItem colSpan={{ base: 8, sm: 5, md: 3, lg: 3 }}>
                              <Input
                                   id={"weight"}
                                   label={"Peso"}
                                   type={"text"}
                                   inputText={"kg"}
                                   width={{ base: '100%' }}
                                   value={weight}
                                   onChange={(e) => setWeight(e.target.value)}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 8, sm: 5, md: 3, lg: 3 }}>
                              <Input
                                   id={"height"}
                                   label={"Altura"}
                                   type={"text"}
                                   inputText={"cm"}
                                   width={{ base: '100%' }}
                                   value={height}
                                   onChange={(e) => setHeight(e.target.value)}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                         <GridItem colSpan={{ base: 8, sm: 6, md: 4, lg: 1 }}>
                              <Input
                                   id={"actual-date"}
                                   label={"Data"}
                                   type={"date"}
                                   width={{ base: '100%' }}
                                   value={actualDate}
                                   onChange={(e) => setActualDate(e.target.value)}
                                   isRequired
                                   invalidInputsArray={invalidatedInputs}
                              />
                         </GridItem>
                    </Grid>
                    <Flex
                         gap={'1rem'}
                         alignItems={'center'}
                         direction={'column'}
                    >
                         <Flex direction={'column'}>
                              <Text
                                   color={colors.basicTextColor}
                                   fontSize={'1.5rem'}
                                   textAlign={'center'}
                              >
                                   Frente
                              </Text>
                              <ImageInput
                                   imagePath={frontImagePath}
                                   onChange={(e) => handleChangeUserFrontImage(e)}
                              />
                         </Flex>
                         <Flex direction={'column'}>
                              <Text
                                   color={colors.basicTextColor}
                                   fontSize={'1.5rem'}
                                   textAlign={'center'}
                              >
                                   Costas
                              </Text>
                              <ImageInput
                                   imagePath={backImagePath}
                                   onChange={(e) => handleChangeUserBackImage(e)}
                              />
                         </Flex>
                         <Flex direction={'column'}>
                              <Text
                                   color={colors.basicTextColor}
                                   fontSize={'1.5rem'}
                                   textAlign={'center'}
                              >
                                   Esquerda
                              </Text>
                              <ImageInput
                                   imagePath={leftImagePath}
                                   onChange={(e) => handleChangeUserLeftImage(e)}
                              />
                         </Flex>
                         <Flex direction={'column'}>
                              <Text
                                   color={colors.basicTextColor}
                                   fontSize={'1.5rem'}
                                   textAlign={'center'}
                              >
                                   Direita
                              </Text>
                              <ImageInput
                                   imagePath={rightImagePath}
                                   onChange={(e) => handleChangeUserRightImage(e)}
                              />
                         </Flex>
                    </Flex>
               </Flex> */}
          </Container>
     )
}