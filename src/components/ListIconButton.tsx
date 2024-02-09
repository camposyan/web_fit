import { IconButton as Chakra_IconButton, Tooltip } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { Barbell, Lock, LockOpen, Pencil, Trash } from "@phosphor-icons/react";

interface ListIconButtonProps {
     title: string,
     type: 'edit' | 'delete' | 'block' | 'unblock' | 'visualize' | 'training'
     isLoading?: boolean
     onClick: () => void
}

export function ListIconButton({ title, type, isLoading, onClick }: ListIconButtonProps) {
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
          {
               type: 'training',
               backgroundColor: colors.trainingButtonBackgroundColor,
               icon: <Barbell />
          },
     ];

     return (
          <Tooltip
               label={title}
               aria-label={'tooltip'}
               hasArrow
               placement="top"
               backgroundColor={colors.mainBackgroundColor}
          >
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
          </Tooltip>
     )
}