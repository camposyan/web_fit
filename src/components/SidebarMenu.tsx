import { Flex, Box, Image, Text } from "@chakra-ui/react"
import { SignOut } from "@phosphor-icons/react"
import { colors } from "../constants/colors"
import { MenuOptionsType } from "../types/menuOptions"
import { MenuButton } from "./MenuButton"
import logo from '../assets/logo.jpg'
import { useAuth } from "../contexts/AuthContext"

interface SidebarMenuProps {
     menuOptions: MenuOptionsType[]
}

export function SidebarMenu({ menuOptions }: SidebarMenuProps) {
     const { user } = useAuth();

     function formatName(): string {
          const name = user.NAME.toLocaleLowerCase().split(' ')[0];
          const lettersArray = name.split('');
          const firstLetter = lettersArray[0]?.toUpperCase();
          
          lettersArray.shift();

          return `${firstLetter}${lettersArray.join('')}`
     }

     return (
          <Box
               width={'15rem'}
               height={'100%'}
               backgroundColor={colors.menuBackgroundColor}
               flexDirection={'column'}
               display={{ base: 'none', lg: 'flex' }}
          >
               <Flex
                    height={'8rem'}
                    direction={"column"}
                    justifyContent={'center'}
                    alignItems={'center'}
                    marginY={'2rem'}
                    gap={"1rem"}
               >
                    <Image
                         src={logo}
                         alt='Azevedo'
                         height={'90%'}
                         borderRadius={'50%'}
                    />
                    <Text
                         color={colors.basicTextColor}
                         fontSize={"1.2rem"}
                    >
                         Olá, {formatName()}
                    </Text>
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