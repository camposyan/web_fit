import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "../Modal";
import { StudentsRequestType } from "../../types/students";
import { axiosClient } from "../../services/axiosClient";
import { useUtils } from "../../hooks/useUtils";

interface StudentModalProps {
     isOpen: boolean,
     setIsOpen: Dispatch<SetStateAction<boolean>>
     isEditing: boolean,
     setIsEditing: Dispatch<SetStateAction<boolean>>
     isLoading: boolean,
     editingData?: StudentsRequestType | null,
     getAllStudents: () => Promise<void>
}

export function StudentModal({ isOpen, setIsOpen, isEditing, setIsEditing, isLoading, editingData, getAllStudents }: StudentModalProps) {
     const toast = useToast();

     const { inputsValidation } = useUtils();

     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('');
     const [cellphone, setCellphone] = useState<string>('');
     const [isWppCell, setIsWppCell] = useState<boolean>(false);
     const [isActive, setIsActive] = useState<boolean>(true);

     const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

     const [invalidatedInputs, setInvalidatedInputs] = useState<string[]>([]);

     function resetStates() {
          setName('');
          setEmail('');
          setCellphone('');
          setIsWppCell(false);

          setInvalidatedInputs([]);
          setIsEditing(false);
     }

     function closeModal() {
          setIsOpen(false);
          resetStates();
     }

     async function createStudent(data: StudentsRequestType) { //TODO: colocar rota
          setIsButtonLoading(true);

          await axiosClient.post('http://localhost:5173/api/student', data)
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Aluno cadastrado!',
                         status: 'success'
                    });

                    closeModal();

                    await getAllStudents();
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao cadastrar o aluno',
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsButtonLoading(false);
               });
     }

     async function updateStudent(data: StudentsRequestType) { //TODO: colocar rota
          setIsButtonLoading(true);

          await axiosClient.put(`http://localhost:5173/api/user/${editingData?.ID}`, data)
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Usuário editado!',
                         status: 'success'
                    });

                    closeModal();

                    await getAllStudents();
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao editar o aluno',
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsButtonLoading(false);
               });
     }

     async function handlePrimaryButtonClick() {
          const data = {
               NAME: name,
               EMAIL: email,
               CELLPHONE: cellphone,
               IS_WPP_CELL: isWppCell,
               ACTIVE: true,
               PERSONAL_ID: 1
          }

          const validation = inputsValidation([
               { name: 'name', value: name },
               { name: 'email', value: email },
               { name: 'cellphone', value: cellphone },
          ]);

          if (validation.isValidated) {
               isEditing ? updateStudent(data) : createStudent(data);
          } else {
               setInvalidatedInputs(validation.invalidatedInputs)
          }
     }

     useEffect(() => {
          setName(editingData?.NAME as string)
          setEmail(editingData?.EMAIL as string)
          setCellphone(editingData?.CELLPHONE as string)
          setIsWppCell(editingData?.IS_WPP_CELL as boolean)
          setIsActive(editingData?.ACTIVE as boolean)
     }, [editingData])

     return (
          <Modal
               isOpen={isOpen}
               onClose={closeModal}
               title={isEditing ? 'Editar Aluno' : "Cadastrar Aluno"}
               size={"4xl"}
               isEditing={isEditing}
               isLoading={isLoading}
               isButtonLoading={isButtonLoading}
               primaryAction={handlePrimaryButtonClick}
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
                              isDisabled={isButtonLoading}
                              isRequired
                              invalidInputsArray={invalidatedInputs}
                         />
                    </GridItem>
                    <GridItem colSpan={{ base: 15, md: 11, lg: 12 }}>
                         <Input
                              id={"email"}
                              label={"E-mail"}
                              type={"text"}
                              width={{ base: '100%' }}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              isDisabled={isButtonLoading}
                              isRequired
                              invalidInputsArray={invalidatedInputs}
                         />
                    </GridItem>
                    <GridItem colSpan={{ base: 15, md: 4, lg: 3 }}>
                         <Input
                              id={"cellphone"}
                              label={"Celular"}
                              type={"text"}
                              width={{ base: '100%' }}
                              value={cellphone}
                              onChange={(e) => setCellphone(e.target.value)}
                              isDisabled={isButtonLoading}
                              isRequired
                              mask={"(__)_____-____"}
                              invalidInputsArray={invalidatedInputs}
                         />
                    </GridItem>
                    <GridItem colSpan={{ base: 5, md: 3, lg: 3 }}>
                         <Checkbox
                              id={"wpp"}
                              label={"Whatsapp?"}
                              optionText={"Sim"}
                              isChecked={isWppCell}
                              onChange={(e) => setIsWppCell(e.target.checked)}
                              isDisabled={isButtonLoading}
                         />
                    </GridItem>
                    <GridItem colSpan={{ base: 5, md: 3, lg: 3 }}>
                         <Checkbox
                              id={"active"}
                              label={"Ativo?"}
                              optionText={"Sim"}
                              isChecked={isActive}
                              onChange={(e) => setIsActive(e.target.checked)}
                              isDisabled={isButtonLoading}
                         />
                    </GridItem>
               </Grid>
          </Modal>
     )
}