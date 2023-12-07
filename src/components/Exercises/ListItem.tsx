import { Flex, Tag, Text } from "@chakra-ui/react";
import { ListIconButton } from "../ListIconButton";
import { colors } from "../../constants/colors";
import { ExercisesType } from "../../types/exercises";

interface ListItemProps {
     exercise: ExercisesType
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
          >
               <Flex
                    flex={1}
                    direction={'column'}
                    justifyContent={'center'}
               >
                    <Text fontSize='lg' color={colors.basicTextColor}>{exercise?.name}</Text>
                    <Tag width={'fit-content'}>{exercise.category}</Tag>
               </Flex>
               <Flex gap={'0.3rem'}>
                    <ListIconButton
                         type={"edit"}
                         onClick={editAction}
                    />
                    <ListIconButton
                         type={"delete"}
                         onClick={deleteAction}
                    />
               </Flex>
          </Flex>
     )
}