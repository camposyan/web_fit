import { Button, Flex, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { Warning } from "@phosphor-icons/react";

interface ConfirmModalProps {
     message: string,
     isOpen: boolean,
     onClose: () => void,
     isButtonLoading: boolean,
     action: () => void
}

export function ConfirmModal({ message, isOpen, onClose, isButtonLoading, action }: ConfirmModalProps) {
     return (
          <Modal
               onClose={onClose}
               isOpen={isOpen}
               isCentered
               closeOnOverlayClick={false}
               blockScrollOnMount
          >
               <ModalOverlay />
               <ModalContent backgroundColor={colors.menuBackgroundColor}>
                    <ModalHeader color={colors.basicTextColor} textAlign={'center'}>{message}</ModalHeader>
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
                              onClick={action}
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