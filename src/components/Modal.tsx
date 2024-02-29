import { Modal as Chakra_Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";
import { colors } from "../constants/colors";

interface ModalProps {
     id: string,
     isOpen: boolean,
     onClose: () => void,
     title?: string,
     children: ReactNode,
     size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full",
     isEditing?: boolean,
     isLoading?: boolean,
     isButtonLoading?: boolean,
     primaryAction?: () => void,
}

export function Modal({ id, isOpen, onClose, title, children, size, isEditing, primaryAction, isLoading, isButtonLoading }: ModalProps) {
     return (
          <Chakra_Modal
               id={id}
               onClose={onClose}
               isOpen={isOpen}
               isCentered
               closeOnOverlayClick={false}
               blockScrollOnMount
               scrollBehavior={"inside"}
               size={size}
          >
               <ModalOverlay />
               <ModalContent backgroundColor={colors.menuBackgroundColor}>
                    <ModalHeader color={colors.basicTextColor}>{title}</ModalHeader>
                    <ModalCloseButton color={colors.basicTextColor} isDisabled={isButtonLoading} />
                    {
                         isLoading &&
                         <Flex
                              width={'100%'}
                              height={'100%'}
                              justifyContent={'center'}
                              alignItems={'center'}
                         >
                              <Spinner
                                   size={'xl'}
                                   color={colors.primaryColor}
                              />
                         </Flex>
                    }
                    {
                         !isLoading &&
                         <ModalBody>
                              {children}
                         </ModalBody>
                    }
                    {
                         primaryAction &&
                         <ModalFooter
                              justifyContent={'space-between'}
                         >
                              <Button
                                   id={"secondary-button"}
                                   onClick={onClose}
                                   border={`2px solid ${colors.primaryColor}`}
                                   backgroundColor={'inherit'}
                                   color={colors.primaryColor}
                                   _hover={{
                                        backgroundColor: colors.primaryColorHover,
                                        color: colors.basicTextColor,
                                        border: `2px solid ${colors.primaryColorHover}`
                                   }}
                                   isDisabled={isButtonLoading}
                              >
                                   CANCELAR
                              </Button>
                              <Button
                                   id={"primary-button"}
                                   onClick={primaryAction}
                                   isLoading={isButtonLoading}
                                   backgroundColor={colors.primaryColor}
                                   border={colors.primaryColor}
                                   color={colors.basicTextColor}
                                   _hover={{ backgroundColor: colors.primaryColorHover }}
                              >
                                   {isEditing ? 'EDITAR' : 'CADASTRAR'}
                              </Button>
                         </ModalFooter>
                    }
               </ModalContent>
          </Chakra_Modal>
     )
}