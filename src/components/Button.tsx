import { Button as Chakra_Button } from "@chakra-ui/react";
import { colors } from "../constants/colors";

interface ButtonProps {
     primary: boolean,
     text?: string,
     isLoading?: boolean
     onClick: () => void
     width?: string,
     icon?: JSX.Element
}

export function Button({ primary, width, icon, text, isLoading, onClick }: ButtonProps) {
     return (
          <Chakra_Button
               height={'3rem'}
               width={width}
               isLoading={isLoading}
               onClick={onClick}
               backgroundColor={primary ? colors.primaryColor : 'inherit'}
               border={`1px solid ${colors.primaryColor}`}
               color={primary ? colors.basicTextColor : colors.primaryColor}
               _hover={{backgroundColor: colors.primaryColorHover, color: colors.basicTextColor }}
               fontSize={'1.3rem'}
               gap={'0.5rem'}
               fontWeight={'normal'}
          >
               {icon}
               {text}
          </Chakra_Button>
     )
}