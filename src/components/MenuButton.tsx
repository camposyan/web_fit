import { Link, useLocation } from "react-router-dom";
import { MenuOptionsType } from "../types/menuOptions";
import { Button, Text } from "@chakra-ui/react";
import { colors } from "../constants/colors";

export function MenuButton({ icon, text, link }: MenuOptionsType) {
     const path = useLocation().pathname;

     return (
          <Button
               as={Link}
               width={'100%'}
               height={'4rem'}
               minHeight={'4rem'}
               borderRadius={0}
               borderLeft={`4px solid ${link === path ? colors.primaryColor : 'transparent'}`}
               justifyContent={'flex-start'}
               backgroundColor={'inherit'}
               color={'#FFF'}
               _hover={{ backgroundColor: colors.primaryColorHover }}
               gap={'1rem'}
               to={link}
          >
               {icon}
               <Text fontSize={'xl'}>{text}</Text>
          </Button>
     )
}