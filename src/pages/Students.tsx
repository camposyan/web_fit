import { Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { IconButton } from "../components/IconButton";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { StudentsListType, StudentsRequestType } from "../types/students";
import { axiosClient } from "../services/axiosClient";
import { StudentListItem } from "../components/Students/StudentListItem";
import { StudentModal } from "../components/Students/StudentModal";
import { StudentConfirmModal } from "../components/Students/StudentConfirmModal";

export function Students() {
     const toast = useToast();

     const [searchName, setSearchName] = useState<string>('');

     const [allStudents, setAllStudents] = useState<StudentsListType[]>([]);

     const [studentData, setStudentData] = useState<StudentsRequestType | null>(null);

     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

     const [isEditing, setIsEditing] = useState<boolean>(false);
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

     const [deletetingId, setDeletetingId] = useState<number | null>(null)

     async function getAllStudents() { 
          setIsLoading(true);

          await axiosClient.get('/students')
               .then((response) => {
                    setAllStudents(response.data);
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao buscas os alunos',
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsLoading(false);
               });
     }

     async function getStudent(userId: number) { 
          setIsModalLoading(true);

          await axiosClient.get(`/students/${userId}`)
               .then((response) => {
                    const user: StudentsRequestType = response.data;

                    setStudentData(user)
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao buscar as informações do aluno',
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsModalLoading(false);
               });
     }

     async function handleEditButtonClick(userId: number) {
          setIsEditing(true);

          setIsModalOpen(true);

          await getStudent(userId);
     }

     async function handleDeleteButtonClick(userId: number) {
          setIsConfirmModalOpen(true);
          setDeletetingId(userId);
     }

     function handleClickAddNewButton() {
          setIsModalOpen(true);
     }

     function handleSearchButtonClick() {
          // const searchedUsers = allStudents.find(user => user.NAME.toLowerCase() === searchName.toLowerCase())

          // console.log(searchedUsers);
     }

     useEffect(() => {
          getAllStudents();
     }, [])

     return (
          <>
               <Container
                    title={"Alunos"}
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
                                   id={"add-student"}
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
                                   allStudents?.map((user, index) => {
                                        return (
                                             <StudentListItem
                                                  user={user}
                                                  key={index}
                                                  editAction={() => handleEditButtonClick(user.ID)}
                                                  deleteAction={() => handleDeleteButtonClick(user.ID)}
                                             />
                                        )
                                   })
                              }
                         </Flex>
                    </Flex>
               </Container>
               <StudentModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isLoading={isModalLoading}
                    getAllStudents={getAllStudents}
                    editingData={studentData}
               />
               <StudentConfirmModal
                    isOpen={isConfirmModalOpen}
                    setIsOpen={setIsConfirmModalOpen}
                    getAllStudents={getAllStudents}
                    deletingId={deletetingId}
               />
          </>
     )
}