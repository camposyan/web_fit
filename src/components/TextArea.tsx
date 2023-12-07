import { FormControl, FormLabel, Textarea as Chakra_Textarea, InputGroup } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { colors } from "../constants/colors";

interface InputProps {
     id: string,
     value: string,
     onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
     label?: string,
     width?: WidthType,
     isRequired?: boolean,
     isDisabled?: boolean,
     invalidInputsArray?: string[],
}

export function TextArea({ id, value, label, width, invalidInputsArray, onChange, isRequired, isDisabled }: InputProps) {
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
                    <Chakra_Textarea
                         id={id}
                         value={value}
                         onChange={onChange}
                         width={{ base: width?.base, lg: width?.lg }}
                         focusBorderColor={colors.primaryColor}
                         isDisabled={isDisabled}
                         backgroundColor={'inherit'}
                         color={colors.primaryColor}
                         resize={'vertical'}
                    />
               </InputGroup>
          </FormControl>
     )
}