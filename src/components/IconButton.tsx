import { IconButton as Chakra_IconButton } from "@chakra-ui/react";
import { colors } from "../constants/colors";

interface IconButtonProps {
     id?: string,
     primary: boolean,
     icon: JSX.Element,
     isLoading?: boolean,
     isActive?: boolean,
     onClick: () => void
}

export function IconButton({ id, primary, icon, isLoading, isActive, onClick }: IconButtonProps) {
     return (
          <Chakra_IconButton
               id={id}
               height={'3rem'}
               width={'4rem'}
               isLoading={isLoading}
               onClick={onClick}
               backgroundColor={primary ? colors.primaryColor : 'inherit'}
               border={primary ? '0' : '2px'}
               borderColor={colors.primaryColor}
               color={primary ? colors.basicTextColor : colors.primaryColor}
               _hover={{
                    backgroundColor: colors.primaryColorHover,
                    color: colors.basicTextColor,
                    borderColor: colors.primaryColorHover,
               }}
               _active={{
                    backgroundColor: colors.primaryColorHover,
                    color: colors.basicTextColor,
                    borderColor: colors.primaryColorHover,
               }}
               isActive={isActive}
               fontSize={'1.3rem'}
               aria-label={""}
          >
               {icon}
          </Chakra_IconButton>
     )
}