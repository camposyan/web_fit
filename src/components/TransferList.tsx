import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import { IconButton } from "./IconButton";

interface ItemType {
     id: number
     label: string,
}

interface TransferListProps {
     allItems: ItemType[],
     setAllItems: Dispatch<SetStateAction<ItemType[]>>
     studentItems: ItemType[],
     setStudentItems: Dispatch<SetStateAction<ItemType[]>>
     isLoading: boolean,
     setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function TransferList({ allItems, studentItems, isLoading, setIsLoading, setAllItems, setStudentItems }: TransferListProps) {
     const toast = useToast();

     const scrollStyle = {
          '&::-webkit-scrollbar': {
               width: '8px',
               borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
               backgroundColor: 'inherit',
               borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
               backgroundColor: colors.primaryColor,
               borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
               backgroundColor: colors.primaryColorHover,
          },
     }

     async function handleAddItemClick(item: ItemType) {
          const allItemsArray = [...allItems];
          const studentItemsArray = [...studentItems];
          const itemToAdd = allItemsArray.find(arrayItem => arrayItem.id === item.id);

          if (itemToAdd) {
               const isItemInStudentItems = studentItemsArray.some(arrayItem => arrayItem.id === itemToAdd.id);
               if (!isItemInStudentItems) {
                    studentItemsArray.push(itemToAdd);
                    allItemsArray.splice(allItemsArray.indexOf(itemToAdd), 1);

                    setStudentItems(studentItemsArray);
                    setAllItems(allItemsArray);
               } else {
                    toast({
                         title: 'Atenção!',
                         description: 'Item já adicionado!',
                         status: 'warning'
                    });
               }
          }
     }

     async function handleAddAllItemsClick() {
          const allItemsArray = [...allItems];
          const studentItemsArray = [...studentItems];
          const allItemsArrayNew: ItemType[] = [];

          allItemsArray.map(arrayItem => {
               studentItemsArray.push(arrayItem);
          })

          setStudentItems(studentItemsArray);
          setAllItems(allItemsArrayNew);
     }


     async function handleRemoveItemClick(item: ItemType) {
          const allItemsArray = [...allItems];
          const studentItemsArray = [...studentItems];
          const itemToRemove = studentItemsArray.find(arrayItem => arrayItem.id === item.id);

          if (itemToRemove) {
               allItemsArray.push(itemToRemove);
               studentItemsArray.splice(studentItemsArray.indexOf(itemToRemove), 1);

               setStudentItems(studentItemsArray);
               setAllItems(allItemsArray);
          }
     }

     async function handleRemoveAllItemsClick() {
          const allItemsArray = [...allItems];
          const studentItemsArray = [...studentItems];
          const studentItemsArrayNew: ItemType[] = [];

          studentItemsArray.map(arrayItem => {
               allItemsArray.push(arrayItem);
          })

          setStudentItems(studentItemsArrayNew);
          setAllItems(allItemsArray);
     }

     return (
          <Flex
               gap={'3rem'}
               height={'30rem'}
               width={'100%'}
               justifyContent={'center'}
          >
               <Flex
                    direction={'column'}
                    backgroundColor={colors.listItemBackgroundColor}
                    width={'30%'}
                    height={'100%'}
                    paddingY={'1rem'}
                    paddingX={'0.5rem'}
                    borderRadius={'10px'}
                    color={colors.basicTextColor}
               >
                    <Text
                         fontSize='2xl'
                         paddingX={'0.75rem'}
                         marginBottom={'0.5rem'}
                         borderBottom={`1px solid ${colors.primaryColor}`}
                    >
                         Exercícios Disponíveis
                    </Text>
                    <Flex
                         overflowY={'auto'}
                         direction={'column'}
                         justifyContent={isLoading ? 'center' : 'flex-start'}
                         alignItems={'center'}
                         height={'100%'}
                         width={'100%'}
                         paddingTop={'1rem'}
                         paddingRight={'0.5rem'}
                         sx={scrollStyle}
                    >
                         {
                              !isLoading &&
                              allItems.map((item, index) => {
                                   return (
                                        <Text
                                             width={'100%'}
                                             fontSize='xl'
                                             paddingX={'0.75rem'}
                                             borderRadius={'5px'}
                                             _hover={{
                                                  backgroundColor: colors.primaryColorHover,
                                                  cursor: 'pointer'
                                             }}
                                             onClick={() => handleAddItemClick(item)}
                                             key={index}
                                        >
                                             {item.label}
                                        </Text>
                                   )
                              })
                         }
                         {
                              isLoading &&
                              <Spinner
                                   size={'xl'}
                                   color={colors.primaryColor}
                              />
                         }
                    </Flex>
               </Flex>
               <Flex
                    height={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={'column'}
                    gap={'1rem'}
               >
                    <IconButton
                         primary={false}
                         icon={<ArrowRight />}
                         onClick={handleAddAllItemsClick}
                    />
                    <IconButton
                         primary={false}
                         icon={<ArrowLeft />}
                         onClick={handleRemoveAllItemsClick}
                    />
               </Flex>
               <Flex
                    direction={'column'}
                    backgroundColor={colors.listItemBackgroundColor}
                    width={'30%'}
                    height={'100%'}
                    paddingY={'1rem'}
                    paddingX={'0.5rem'}
                    borderRadius={'10px'}
                    color={colors.basicTextColor}
               >
                    <Text
                         fontSize='2xl'
                         paddingX={'0.75rem'}
                         marginBottom={'0.5rem'}
                         borderBottom={`1px solid ${colors.primaryColor}`}
                    >
                         Exercícios Adicionados
                    </Text>
                    <Flex
                         overflowY={'auto'}
                         direction={'column'}
                         justifyContent={isLoading ? 'center' : 'flex-start'}
                         alignItems={'center'}
                         height={'100%'}
                         width={'100%'}
                         paddingTop={'1rem'}
                         paddingRight={'0.5rem'}
                         sx={scrollStyle}
                    >
                         {
                              !isLoading &&
                              studentItems.map((item, index) => {
                                   return (
                                        <Text
                                             width={'100%'}
                                             fontSize='xl'
                                             paddingX={'0.75rem'}
                                             borderRadius={'5px'}
                                             _hover={{
                                                  backgroundColor: colors.primaryColorHover,
                                                  cursor: 'pointer'
                                             }}
                                             onClick={() => handleRemoveItemClick(item)}
                                             key={index}
                                        >
                                             {item.label}
                                        </Text>
                                   )
                              })
                         }
                         {
                              isLoading &&
                              <Spinner
                                   size={'xl'}
                                   color={colors.primaryColor}
                              />
                         }
                    </Flex>
               </Flex>
          </Flex>
     )
}