import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { UsersListType } from "../../types/users";
import { ListIconButton, WhatsappIconButton } from "../ListIconButton";
import { colors } from "../../constants/colors";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface StudentListItemProps {
     user: UsersListType
     editAction: () => void,
     deleteAction: () => void,
}

export function StudentListItem({ user, editAction, deleteAction }: StudentListItemProps) {
     const navigate = useNavigate();

     const unformattedCellphone = user.CELLPHONE?.replace('(', '').replace(')', '').replace('-', '');

     return (
          <Flex
               id={`item-${user.ID}`}
               padding={'1rem'}
               width={'100%'}
               backgroundColor={colors.listItemBackgroundColor}
               gap={'1rem'}
               borderRadius={'10px'}
               direction={{ base: 'column', sm: 'column', md: 'row' }}
          >
               <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
               >
                    <Tooltip
                         label={user.ACTIVE ? "Ativo" : "Inativo"}
                         aria-label={'tooltip'}
                         hasArrow
                         placement="top"
                         backgroundColor={colors.mainBackgroundColor}
                    >
                         <Flex
                              height={'0.75rem'}
                              width={'0.75rem'}
                              backgroundColor={user.ACTIVE ? colors.primaryColor : colors.deleteButtonBackgroundColor}
                              justifyContent={"center"}
                              alignItems={"center"}
                              borderRadius={'50%'}
                         />
                    </Tooltip>
               </Flex>
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
                         title={"Treinos"}
                         type={"training"}
                         onClick={() => navigate(`/fichas/${user.ID}`)}
                    />
                    <WhatsappIconButton
                         isWpp={user.IS_WPP_CELL}
                         linkTo={`https://wa.me/${unformattedCellphone}`}
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