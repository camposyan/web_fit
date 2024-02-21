import { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { TransferList } from "../components/TransferList";
import { Flex } from "@chakra-ui/react";

interface TransferListItemsType {
     id: number,
     label: string
}

export function StudentSheet() {
     const [isLoading, setIsLoading] = useState<boolean>(false);
     const [isTransferListLoading, setIsTransferListLoading] = useState<boolean>(false);
     const [allItems, setAllItems] = useState<TransferListItemsType[]>([]);
     const [studentItems, setStudentItems] = useState<TransferListItemsType[]>([]);

     useEffect(() => {
          setIsLoading(false);
          setAllItems([
               {
                    id: 1,
                    label: 'Supino reto'
               },
               {
                    id: 2,
                    label: 'Supino inclinado'
               },
               {
                    id: 3,
                    label: 'Supino declinado'
               },
               {
                    id: 4,
                    label: 'Supino com halteres'
               },
          ])
          setStudentItems([])
     }, [])

     return (
          <Container
               title={"Fichas do Yan"}
               isLoading={isLoading}
          >
               <Flex
                    width={'100%'}
                    justifyContent={'center'}
               >
                    <TransferList
                         allItems={allItems}
                         setAllItems={setAllItems}
                         studentItems={studentItems}
                         setStudentItems={setStudentItems}
                         isLoading={isTransferListLoading}
                         setIsLoading={setIsTransferListLoading}
                    />
               </Flex>
          </Container>
     )
}