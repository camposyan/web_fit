import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { colors } from "../constants/colors";
import { SidebarMenu } from "../components/SidebarMenu";
import { MobileHeader } from "../components/MobileHeader";
import { MobileFooter } from "../components/MobileFooter";
import { MobileSidebarMenu } from "../components/MobileSidebarMenu";
import { useState } from "react";
import { menuOptions, mobileMenuOptions } from "../constants/menuOptions";

export function DefaultLayout() {
     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

     return (
          <Flex
               width={'100vw'}
               height={'100vh'}
               minWidth={'350px'}
               direction={{ base: 'column', lg: 'row' }}
          >
               <SidebarMenu menuOptions={menuOptions}/>
               <MobileHeader onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
               <Flex
                    flex={1}
                    backgroundColor={colors.mainBackgroundColor}
                    overflowX={'hidden'}
                    justifyContent={'center'}
                    sx={{
                         '&::-webkit-scrollbar': {
                              width: '8px',
                              borderRadius: '8px',
                         },
                         '&::-webkit-scrollbar-track': {
                              backgroundColor: 'inherit',
                         },
                         '&::-webkit-scrollbar-thumb': {
                              backgroundColor: colors.primaryColor,
                              borderRadius: '8px',
                         },
                         '&::-webkit-scrollbar-thumb:hover': {
                              backgroundColor: colors.primaryColorHover,
                         },
                         'input[type="date"]::-webkit-calendar-picker-indicator': {
                              // display: 'none'
                         }
                    }}
               >
                    <Outlet />
               </Flex>
               <MobileFooter menuOptions={mobileMenuOptions} />
               <MobileSidebarMenu
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    menuOptions={menuOptions}
               />
          </Flex>
     )
}