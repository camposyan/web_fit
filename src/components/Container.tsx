import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { colors } from "../constants/colors";

interface ContainerProps {
     title: string,
     isLoading: boolean
     children: ReactNode
}

export function Container({ title, isLoading, children }: ContainerProps) {
     return (
          <Box
               width={{ base: '100vw', lg: '70rem' }}
               height={'100%'}
               padding={'1rem'}
          >
               <Flex
                    width={'100%'}
                    minHeight={'100%'}
                    backgroundColor={colors.menuBackgroundColor}
                    padding={'1rem'}
                    borderRadius={'1rem'}
                    direction={'column'}
               >
                    <Text
                         fontSize={'2xl'}
                         fontWeight={'semibold'}
                         color={colors.primaryColor}
                    >
                         {title}
                    </Text>
                    <Flex
                         flex={1}
                         justifyContent={isLoading ? 'center' : 'flex-start'}
                         alignItems={isLoading ? 'center' : 'flex-start'}
                         marginTop={isLoading ? 0 : '2rem'}
                    >
                         {
                              isLoading &&
                              <Spinner
                                   size={'xl'}
                                   color={colors.primaryColor}
                              />
                         }
                         {!isLoading && children}
                    </Flex>
               </Flex>
          </Box >
     )
}