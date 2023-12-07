import { IconButton, Menu, Avatar, MenuList, MenuItem, Box, Image, MenuButton as C_MenuButton } from "@chakra-ui/react";
import { SignOut, List } from "@phosphor-icons/react";
import { colors } from "../constants/colors";
import logo from '../assets/logo.jpg';

interface MobileHeaderProps {
     onToggleMenu: () => void,
}

export function MobileHeader({ onToggleMenu }: MobileHeaderProps) {
     return (
          <Box
               width={'100%'}
               height={'4rem'}
               backgroundColor={colors.menuBackgroundColor}
               display={{ base: 'flex', lg: 'none' }}
               justifyContent={'space-between'}
               alignItems={'center'}
               paddingX={'1rem'}
          >
               <IconButton
                    aria-label='Abrir menu'
                    icon={<List size={20} />}
                    backgroundColor={'inherit'}
                    color={colors.basicTextColor}
                    _hover={{
                         backgroundColor: colors.primaryColor,
                         color: 'inherit',
                    }}
                    onClick={onToggleMenu}
               />
               <Image
                    src={logo}
                    alt='Dan Abramov'
                    height={'3rem'}
               />
               <Menu isLazy>
                    <C_MenuButton>
                         <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    </C_MenuButton>
                    <MenuList>
                         <MenuItem
                              display={'flex'}
                              gap={'1rem'}
                         >
                              <SignOut size={25} />
                              Sair
                         </MenuItem>
                    </MenuList>
               </Menu>
          </Box>
     )
}