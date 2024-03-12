import { Button, Flex, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { Warning } from "@phosphor-icons/react";
import { colors } from "../../constants/colors";
import { Dispatch, SetStateAction, useState } from "react";
import { axiosClient } from "../../services/axiosClient";

interface ConfirmModalProps {
     deletingId: number | null,
     isOpen: boolean,
     setIsOpen: Dispatch<SetStateAction<boolean>>
     getAllStudents: () => Promise<void>
}

export function StudentConfirmModal({ deletingId, isOpen, setIsOpen, getAllStudents }: ConfirmModalProps) {
     const toast = useToast();

     const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

     async function deleteStudent() { //TODO: colocar rota
          setIsButtonLoading(true);

          await axiosClient.delete(`/students/${deletingId}`)
               .then(async () => {
                    toast({
                         title: 'Sucesso!',
                         description: 'Aluno excluído!',
                         status: 'success'
                    });

                    setIsOpen(false);

                    await getAllStudents();
               })
               .catch(() => {
                    toast({
                         title: 'Erro!',
                         description: 'Erro ao excluir o aluno',
                         status: 'error'
                    });
               })
               .finally(() => {
                    setIsButtonLoading(false);
               });
     }

     async function handleDeleteButtonClick() {
          await deleteStudent();
     }

     return (
          <Modal
               onClose={() => setIsOpen(false)}
               isOpen={isOpen}
               isCentered
               closeOnOverlayClick={false}
               blockScrollOnMount
          >
               <ModalOverlay />
               <ModalContent backgroundColor={colors.menuBackgroundColor}>
                    <ModalHeader color={colors.basicTextColor} textAlign={'center'}>Deseja excluir esse aluno ?</ModalHeader>
                    <ModalCloseButton color={colors.basicTextColor} isDisabled={isButtonLoading} />
                    <Flex
                         justifyContent={'center'}
                    >
                         <Warning size={300} color={colors.deleteButtonBackgroundColor} />
                    </Flex>
                    <ModalFooter
                         justifyContent={'center'}
                    >
                         <Button
                              id={"delete-student"}
                              onClick={handleDeleteButtonClick}
                              isLoading={isButtonLoading}
                              backgroundColor={colors.deleteButtonBackgroundColor}
                              border={colors.primaryColor}
                              color={colors.basicTextColor}
                              _hover={{
                                   filter: 'brightness(0.9)'
                              }}
                         >
                              EXCLUIR
                         </Button>
                    </ModalFooter>
               </ModalContent>
          </Modal>
     )
}