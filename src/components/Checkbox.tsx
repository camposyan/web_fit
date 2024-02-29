import { FormControl, FormLabel, Checkbox as Chakra_Checkbox } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { ChangeEvent } from "react";

interface CheckboxProps {
     id: string,
     isChecked: boolean,
     onChange: (e: ChangeEvent<HTMLInputElement>) => void,
     label?: string,
     optionText: string
     isRequired?: boolean,
     isDisabled?: boolean,
     invalidInputsArray?: string[],
}

export function Checkbox({ id, isChecked, onChange, label, optionText, isRequired, isDisabled, invalidInputsArray }: CheckboxProps) {
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
                    id={id}
                    onChange={onChange}
                    isDisabled={isDisabled}
                    marginTop={'0.75rem'}
                    color={colors.basicTextColor}
                    colorScheme={'green'}
                    isChecked={isChecked}
               >
                    {optionText}
               </Chakra_Checkbox>
          </FormControl>
     )
}