import { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { TransferList } from "../components/TransferList";
import { Flex, useToast } from "@chakra-ui/react";
import { axiosClient } from "../services/axiosClient";
import { StudentsRequestType } from "../types/students";
import { useParams } from "react-router-dom";
import { mockStudentsRoutes } from "../mocks/mock_students";
import { Button } from "../components/Button";
import { exercisesList } from "../constants/exercises";

interface TransferListItemsType {
     id: number,
     label: string
}

interface ExercisesListType {
     id: number,
     label: string
     day?: number
}

export function StudentSheet() {
     const toast = useToast();
     const { studentId } = useParams()

     const [isLoading, setIsLoading] = useState<boolean>(false);

     const [isTransferListLoading, setIsTransferListLoading] = useState<boolean>(true);
     const [allItemsDay, setAllItemsDay] = useState<TransferListItemsType[]>([]);
     const [allItems, setAllItems] = useState<ExercisesListType[]>([]);
     const [studentItems, setStudentItems] = useState<ExercisesListType[]>([]);

     const [dayActive, setDayActive] = useState<number>();

     const [studentData, setStudentData] = useState<StudentsRequestType | null>(null);

     async function getStudent(userId: number) { //TODO: colocar rota
          await axiosClient.get(`http://localhost:5173/api/students/${userId}`)
               .then((response) => {
                    const user: StudentsRequestType = response.data;

                    setStudentData({
                         ID: user.ID,
                         NAME: user.NAME,
                         EMAIL: user.EMAIL,
                         CELLPHONE: user.CELLPHONE,
                         IS_WPP_CELL: user.IS_WPP_CELL,
                         ACTIVE: user.ACTIVE,
                    })
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao buscar as informações do aluno',
                         status: 'error'
                    });
               })
     }

     async function handleSelectDayClick(dayId: number) {
          setDayActive(dayId);
          mountExercisesList(allItems, dayId);
     }
     
     function mountExercisesList(allExercises: ExercisesListType[], dayId: number) {
          const availableExercises: TransferListItemsType[] = [];
          const studentExercises: ExercisesListType[] = [
               { "id": 1, "label": "Flexões", "day": 3 },
               { "id": 2, "label": "Barra fixa", "day": 5 },
               { "id": 3, "label": "Agachamentos", "day": 2 },
               { "id": 4, "label": "Avanços", "day": 7 },
               { "id": 5, "label": "Levantamento terra", "day": 1 },
               { "id": 6, "label": "Prancha", "day": 4 },
               { "id": 7, "label": "Burpees", "day": 6 },
               { "id": 8, "label": "Abdominais", "day": 2 },
          ];
          
          allExercises.forEach(exercise => {
               if (exercise.day === dayId) {
                    if (studentExercises.find(studentExercise => studentExercise.id === exercise.id) === undefined) {
                         availableExercises.push(exercise)
                    }
               }
          });
          
          setAllItemsDay(availableExercises);
          setStudentItems(studentExercises);

          setIsTransferListLoading(false);
     }

     const days = [
          {
               id: 1,
               name: 'Domingo'
          },
          {
               id: 2,
               name: 'Segunda-feira'
          },
          {
               id: 3,
               name: 'Terça-feira'
          },
          {
               id: 4,
               name: 'Quarta-feira'
          },
          {
               id: 5,
               name: 'Quinta-feira'
          },
          {
               id: 6,
               name: 'Sexta-feira'
          },
          {
               id: 7,
               name: 'Sábado'
          },
     ]

     useEffect(() => {
          mockStudentsRoutes();
          setIsLoading(false);

          setAllItems(exercisesList);
          setAllItemsDay(exercisesList);


          getStudent(parseInt(studentId as string));
     }, [])

     return (
          <Container
               title={`Fichas de ${studentData?.NAME ?? '---------'}`}
               isLoading={isLoading}
          >
               <Flex
                    width={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={'column'}
                    gap={'3rem'}
               >
                    <Flex
                         width={'100%'}
                         justifyContent={'center'}
                         flexWrap={'wrap'}
                         gap={'0.35rem'}
                    >
                         {
                              days.map((day, index) => {
                                   return (
                                        <Button
                                             text={day.name}
                                             primary={dayActive === (index + 1) ? true : false}
                                             onClick={() => handleSelectDayClick(day.id)}
                                             key={index}
                                        />
                                   )
                              })
                         }
                    </Flex>
                    <TransferList
                         allItems={allItemsDay}
                         setAllItems={setAllItemsDay}
                         studentItems={studentItems}
                         setStudentItems={setStudentItems}
                         isLoading={isTransferListLoading}
                         setIsLoading={setIsTransferListLoading}
                    />
                    <Button
                         text={'Confirmar'}
                         primary
                         onClick={() => alert('confirmado')}
                         width={"10rem"}
                    />
               </Flex>
          </Container>
     )
}