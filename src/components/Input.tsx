import { FormControl, FormLabel, Input as Chakra_Input, InputGroup, InputRightElement, Button, InputLeftElement } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";
import { colors } from "../constants/colors";
import { useMask } from "@react-input/mask";

interface InputProps {
     id?: string,
     type: 'text' | 'password' | 'email' | 'date',
     value: string,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void,
     onBlur?: (e: ChangeEvent<HTMLInputElement>) => void,
     label?: string,
     width?: WidthType,
     mask?: string,
     inputLeftIcon?: JSX.Element,
     inputButton?: {
          icon: JSX.Element,
          action: () => void
     },
     inputText?: string,
     isRequired?: boolean,
     isDisabled?: boolean,
     invalidInputsArray?: string[],
}

export function Input({ id, type, value, label, width, mask, inputLeftIcon, inputButton, inputText, invalidInputsArray, onChange, onBlur, isRequired, isDisabled }: InputProps) {
     const inputRef = mask ? useMask({ mask: mask, replacement: { _: /\d/ } }) : useRef<HTMLInputElement>(null);
     const isInvalid = invalidInputsArray?.find(input => input === id) === id;

     return (
          <FormControl
               isInvalid={isInvalid}
               isRequired={isRequired}
               width={{ base: width?.base, lg: width?.lg }}
          >
               {
                    label &&
                    <FormLabel
                         display={'flex'}
                         marginBottom={0}
                         fontSize={'xl'}
                         fontWeight={'normal'}
                         color={colors.basicTextColor}
                    >
                         {label}
                    </FormLabel>
               }
               <InputGroup
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
               >
                    {
                         inputLeftIcon &&
                         <InputLeftElement
                              pointerEvents='none'
                              marginTop={'0.35rem'}
                         >
                              {inputLeftIcon}
                         </InputLeftElement>
                    }
                    <Chakra_Input
                         type={type}
                         value={value}
                         onChange={onChange}
                         onBlur={onBlur}
                         id={id}
                         size={'lg'}
                         width={{ base: width?.base, lg: width?.lg }}
                         paddingRight={inputButton ? '4.5rem' : 0}
                         focusBorderColor={colors.primaryColor}
                         isDisabled={isDisabled}
                         backgroundColor={'inherit'}
                         color={colors.primaryColor}
                         ref={inputRef}
                    />
                    {
                         inputButton &&
                         <InputRightElement
                              marginTop={'0.35rem'}
                              width={'4.5rem'}
                         >
                              <Button
                                   height='2rem'
                                   width={'2rem'}
                                   padding={0}
                                   onClick={inputButton.action}
                                   backgroundColor={'inherit'}
                                   color={colors.basicTextColor}
                                   _hover={{
                                        backgroundColor: colors.primaryColor,
                                        color: 'inherit'
                                   }}
                              >
                                   {inputButton.icon}
                              </Button>
                         </InputRightElement>
                    }
                    {
                         inputText &&
                         <InputRightElement
                              marginTop={'0.2rem'}
                              width={'3rem'}
                              color={colors.basicTextColor}
                         >
                              {inputText}
                         </InputRightElement>
                    }
               </InputGroup>
          </FormControl>
     )
}