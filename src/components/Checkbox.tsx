import { FormControl, FormLabel, Checkbox as Chakra_Checkbox, Box, Flex } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { ChangeEvent } from "react";

interface CheckboxProps {
     id: string,
     value: boolean,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void,
     label?: string,
     optionText: string
     isRequired?: boolean,
     isDisabled?: boolean,
     invalidInputsArray?: string[],
}

export function Checkbox({ id, value, onChange, label, optionText, isRequired, isDisabled, invalidInputsArray }: CheckboxProps) {
     const isInvalid = invalidInputsArray?.find(input => input === id) === id;

     return (
          <FormControl
               isRequired={isRequired}
               isInvalid={isInvalid}
          >
               <FormLabel
                    display={'flex'}
                    marginBottom={0}
                    fontSize={'xl'}
                    fontWeight={'normal'}
                    color={colors.basicTextColor}
                    >
                    {label}
               </FormLabel>
               <Chakra_Checkbox
                    value={Number(value)}
                    onChange={onChange}
                    isDisabled={isDisabled}
                    marginTop={'0.75rem'}
                    color={colors.basicTextColor}
                    colorScheme={'green'}
               >
                    {optionText}
               </Chakra_Checkbox>
          </FormControl>
     )
}