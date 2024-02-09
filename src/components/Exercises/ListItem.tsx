import { Flex, Tag, Text } from "@chakra-ui/react";
import { ListIconButton } from "../ListIconButton";
import { colors } from "../../constants/colors";
import { ExercisesListType } from "../../types/exercises";

interface ListItemProps {
     exercise: ExercisesListType
     editAction: () => void,
     deleteAction: () => void,
}

export function ListItem({ exercise, editAction, deleteAction }: ListItemProps) {
     return (
          <Flex
               padding={'1rem'}
               width={'100%'}
               backgroundColor={colors.listItemBackgroundColor}
               gap={'1rem'}
               borderRadius={'10px'}
               direction={{ base: 'column', sm: 'column', md: 'row' }}
          >
               <Flex
                    flex={1}
                    alignItems={'center'}
                    direction={{ base: 'column', sm: 'column', md: 'row' }}
               >
                    <Text
                         fontSize='lg'
                         color={colors.basicTextColor}
                         width={'70%'}
                    >
                         {exercise?.NAME}
                    </Text>
                    <Tag
                         width={'5rem'}
                         justifyContent={'center'}
                    >
                         {exercise.CATEGORY}
                    </Tag>
               </Flex>
               <Flex
                    gap={'0.3rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
               >
                    <ListIconButton
                         title={"Editar"}
                         type={"edit"}
                         onClick={editAction}
                    />
                    <ListIconButton
                         title={"Excluir"}
                         type={"delete"}
                         onClick={deleteAction}
                    />
               </Flex>
          </Flex>
     )
}