import { FormControl, FormLabel, Select as Chakra_Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { colors } from "../constants/colors";

export interface SelectItemsType {
     text: string,
     value: string | number,
}

interface SelectProps {
     id: string,
     items: SelectItemsType[] | undefined,
     value: string | number,
     onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
     label?: string,
     width?: WidthType,
     isRequired?: boolean
     isDisabled?: boolean
     hasSelectOption?: boolean
     invalidInputsArray?: string[],
}

export function Select({ id, items, value, label, width, onChange, isRequired, invalidInputsArray, isDisabled, hasSelectOption }: SelectProps) {
     const isInvalid = invalidInputsArray?.find(input => input === id) === id;

     return (
          <FormControl
               isInvalid={isInvalid}
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
                         {isRequired && <Text color={'red'} marginLeft={'0.3rem'}>*</Text>}
                    </FormLabel>
               }
               <Chakra_Select
                    id={id}
                    value={value}
                    onChange={onChange}
                    width={{ base: width?.base, lg: width?.lg }}
                    size={'lg'}
                    focusBorderColor={colors.primaryColor}
                    color={colors.primaryColor}
                    isDisabled={isDisabled}
               >
                    {hasSelectOption && <option value='SELECIONE'>SELECIONE</option>}
                    {
                         items?.map((item, index) => {
                              return (
                                   <option
                                        value={item.value}
                                        key={index}
                                        color="red"
                                   >
                                        {item.text}
                                   </option>
                              )
                         })
                    }
               </Chakra_Select>
          </FormControl>
     )
}