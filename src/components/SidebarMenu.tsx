import { Flex, Box, Image } from "@chakra-ui/react"
import { SignOut } from "@phosphor-icons/react"
import { colors } from "../constants/colors"
import { MenuOptionsType } from "../types/menuOptions"
import { MenuButton } from "./MenuButton"
import logo from '../assets/logo.jpg'

interface SidebarMenuProps {
     menuOptions: MenuOptionsType[]
}

export function SidebarMenu({ menuOptions }: SidebarMenuProps) {
     return (
          <Box
               width={'15rem'}
               height={'100%'}
               backgroundColor={colors.menuBackgroundColor}
               flexDirection={'column'}
               display={{ base: 'none', lg: 'flex' }}
          >
               <Flex
                    height={'7rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    marginY={'1rem'}
               >
                    <Image
                         src={logo}
                         alt='Azevedo'
                         height={'100%'}
                         borderRadius={'50%'}
                    />
               </Flex>
               <Flex
                    height={'calc(100vh - 11rem)'}
                    flexDirection={'column'}
                    overflowY={'auto'}
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
                    }}
               >
                    {
                         menuOptions.map((option, index) => {
                              return (
                                   <MenuButton
                                        icon={option.icon}
                                        text={option.text}
                                        link={option.link}
                                        key={index}
                                   />
                              )
                         })
                    }
               </Flex>
               <MenuButton
                    icon={<SignOut size={30} />}
                    text={'Sair'}
                    link={'/'}
               />
          </Box>
     )
}