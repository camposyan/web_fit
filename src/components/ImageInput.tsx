import { Flex, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { ChangeEvent, useState } from "react";
import { ImageSquare } from "@phosphor-icons/react";
import { Modal } from "../components/Modal";

interface ImageInputProps {
     imagePath: string,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void,
     isRequired?: boolean,
     isDisabled?: boolean,
     isInvalid?: boolean
}

export function ImageInput({ imagePath, isRequired, isDisabled, isInvalid, onChange }: ImageInputProps) {
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

     return (
          <>
               <Flex
                    width={'20rem'}
                    height={'23rem'}
                    backgroundColor={colors.listItemBackgroundColor}
                    borderRadius={'10px'}
                    padding={'1rem'}
                    direction={'column'}
                    gap={'1rem'}
                    alignItems={'center'}
               >
                    {
                         imagePath &&
                         <Image
                              src={imagePath}
                              alt=''
                              borderRadius={'10px'}
                              height={'18rem'}
                              cursor={'pointer'}
                              onClick={() => setIsModalOpen(true)}
                         />
                    }
                    {
                         !imagePath &&
                         <ImageSquare size={'18rem'} color={colors.basicTextColor} />
                    }
                    <Flex
                         alignItems={'center'}
                    >

                         <FormControl

                              isInvalid={isInvalid}
                              isRequired={isRequired}
                         >
                              <FormLabel
                                   width={'100%'}
                                   fontSize={'xl'}
                                   margin={0}
                                   fontWeight={'normal'}
                                   textAlign={'center'}
                                   color={colors.basicTextColor}
                                   _hover={{ cursor: 'pointer', color: colors.primaryColorHover }}
                              >
                                   Escolha uma imagem
                              </FormLabel>
                              <Input
                                   pr='4.5rem'
                                   type={'file'}
                                   hidden
                                   disabled={isDisabled}
                                   onChange={onChange}
                              />
                         </FormControl>
                    </Flex>
               </Flex>
               <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
               >
                    <Image
                         src={imagePath}
                         alt=''
                         borderRadius={'10px'}
                         marginTop={'1rem'}
                    />
               </Modal>
          </>
     )
}