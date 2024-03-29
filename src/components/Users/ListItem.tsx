import { Flex, Text } from "@chakra-ui/react";
import { UsersListType } from "../../types/users";
import { ListIconButton } from "../ListIconButton";
import { colors } from "../../constants/colors";
import { WhatsappLogo } from "@phosphor-icons/react";

interface ListItemProps {
     user: UsersListType
     editAction: () => void,
     activeAction: () => void,
}

export function ListItem({ user, editAction, activeAction }: ListItemProps) {
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
                    direction={'column'}
                    justifyContent={'center'}
               >
                    <Text fontSize='lg' color={colors.basicTextColor}>{user.NAME}</Text>
                    <Text fontSize='lg' color={colors.basicTextColor}>{user.EMAIL}</Text>
                    <Text
                         fontSize='lg'
                         color={colors.basicTextColor}
                         display={'flex'}
                         gap={'0.5rem'}
                         alignItems={'center'}
                    >
                         {user.CELLPHONE}
                         {
                              user.IS_WPP_CELL &&
                              <WhatsappLogo size={20} color={'#25D366'} weight="fill" />
                         }
                    </Text>
               </Flex>
               <Flex
                    gap={'0.3rem'}
                    alignItems={'center'}
                    justifyContent={'center'}
               >
                    <ListIconButton
                         title={"Editar"}
                         type={"edit"}
                         onClick={editAction}
                    />
                    <ListIconButton
                         title={user.ACTIVE ? "Bloquear" : 'Liberar'}
                         type={user.ACTIVE ? "unblock" : 'block'}
                         onClick={activeAction}
                    />
                    <ListIconButton
                         title={"Treinos"}
                         type={"training"}
                         onClick={activeAction}
                    />
               </Flex>
          </Flex>
     )
}