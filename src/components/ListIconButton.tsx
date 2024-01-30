import { IconButton as Chakra_IconButton } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { Lock, LockOpen, Pencil, Trash } from "@phosphor-icons/react";

interface ListIconButtonProps {
     type: 'edit' | 'delete' | 'block' | 'unblock' | 'visualize'
     isLoading?: boolean
     onClick: () => void
}

export function ListIconButton({ type, isLoading, onClick }: ListIconButtonProps) {
     const buttonStyles = [
          {
               type: 'edit',
               backgroundColor: colors.editButtonBackgroundColor,
               icon: <Pencil />
          },
          {
               type: 'delete',
               backgroundColor: colors.deleteButtonBackgroundColor,
               icon: <Trash />
          },
          {
               type: 'block',
               backgroundColor: colors.blockButtonBackgroundColor,
               icon: <Lock />
          },
          {
               type: 'unblock',
               backgroundColor: colors.unblockButtonBackgroundColor,
               icon: <LockOpen />
          },
     ];

     return (
          <Chakra_IconButton
               height={'2.5rem'}
               width={'2.5rem'}
               isLoading={isLoading}
               onClick={onClick}
               backgroundColor={buttonStyles.filter(style => style.type === type)[0].backgroundColor}
               color={colors.basicTextColor}
               _hover={{
                    filter: 'brightness(0.9)'
               }}
               fontSize={'1.3rem'}
               aria-label={buttonStyles.filter(style => style.type === type)[0].type}
          >
               {buttonStyles.filter(style => style.type === type)[0].icon}
          </Chakra_IconButton>
     )
}