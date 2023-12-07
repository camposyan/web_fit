import { Box } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { MobileMenuOptionsType } from "../types/menuOptions";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "./IconButton";

interface MobileFooterProps {
     menuOptions: MobileMenuOptionsType[]
}

export function MobileFooter({ menuOptions }: MobileFooterProps) {
     const navigate = useNavigate();
     const path = useLocation().pathname;

     return (
          <Box
               width={'100%'}
               height={'4rem'}
               backgroundColor={colors.menuBackgroundColor}
               display={{ base: 'flex', lg: 'none' }}
               justifyContent={'center'}
               alignItems={'center'}
               gap={'1rem'}
          >
               {
                    menuOptions.map((option, index) => {
                         return (
                              <IconButton
                                   icon={option.icon}
                                   onClick={() => navigate(option.link)}
                                   primary={false}
                                   isActive={option.link === path}
                                   key={index}
                              />
                         )
                    })
               }
          </Box>
     )
}