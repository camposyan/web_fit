import { IconButton as Chakra_IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { Barbell, Lock, LockOpen, Pencil, Trash, WhatsappLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface ListIconButtonProps {
     title: string,
     type: 'edit' | 'delete' | 'block' | 'unblock' | 'visualize' | 'training' | 'whatsapp',
     isLoading?: boolean,
     onClick: () => void,
     isDisabled?: boolean,
     linkTo?: string
}

export function ListIconButton({ title, type, isLoading, onClick, isDisabled }: ListIconButtonProps) {
     const toast = useToast();

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

     function handleClickButton() {
          isDisabled ?
               toast({
                    title: 'Atenção!',
                    description: 'Contato do aluno não é Whatsapp',
                    status: 'warning'
               }) :
               onClick();
     }

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
                    onClick={handleClickButton}
                    backgroundColor={isDisabled ?
                         colors.disabledButtonBackgroundColor :
                         buttonStyles.filter(style => style.type === type)[0].backgroundColor
                    }
                    color={colors.basicTextColor}
                    _hover={{
                         filter: 'brightness(0.9)',
                         cursor: isDisabled ? 'not-allowed' : 'pointer'
                    }}
                    fontSize={'1.3rem'}
                    aria-label={buttonStyles.filter(style => style.type === type)[0].type}
                    disabled={isDisabled}
               >
                    {buttonStyles.filter(style => style.type === type)[0].icon}
               </Chakra_IconButton>
          </Tooltip>
     )
}

interface WhatsappIconButtonProps {
     linkTo: string
}

export function WhatsappIconButton({ linkTo }: WhatsappIconButtonProps) {
     return (
          <Link
               to={linkTo}
               target="_blank"
          >
               <Tooltip
                    label={'Whatsapp'}
                    aria-label={'tooltip'}
                    hasArrow
                    placement="top"
                    backgroundColor={colors.mainBackgroundColor}
               >
                    <Chakra_IconButton
                         height={'2.5rem'}
                         width={'2.5rem'}
                         backgroundColor={colors.whatsappButtonBackgroundColor}
                         color={colors.basicTextColor}
                         _hover={{
                              filter: 'brightness(0.9)',
                         }}
                         fontSize={'1.3rem'}
                         aria-label={'whatsapp'}
                    >
                         <WhatsappLogo />
                    </Chakra_IconButton>
               </Tooltip>
          </Link>
     )
}