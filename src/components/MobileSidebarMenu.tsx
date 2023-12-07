import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { MenuOptionsType } from "../types/menuOptions";
import { MenuButton } from "./MenuButton";
import { colors } from "../constants/colors";

interface MobileSidebarMenuProps {
     isOpen: boolean,
     menuOptions: MenuOptionsType[]
     onClose: () => void
}

export function MobileSidebarMenu({ isOpen, onClose, menuOptions }: MobileSidebarMenuProps) {
     return (
          <Drawer
               isOpen={isOpen}
               placement='left'
               onClose={onClose}
          >
               <DrawerOverlay />
               <DrawerContent backgroundColor={colors.menuBackgroundColor}>
                    <DrawerCloseButton />
                    <DrawerBody paddingX={0}>
                              {
                                   menuOptions.map((option, index) => {
                                        return (
                                             <MenuButton
                                                  icon={option.icon}
                                                  text={option.text}
                                                  link={option.link}
                                                  type={option.type}
                                                  key={index}
                                             />
                                        )
                                   })
                              }
                    </DrawerBody>
               </DrawerContent>
          </Drawer>
     )
}