import { useState, useEffect } from "react";
import { Container } from "../components/Container";

export function Sheets() {
     const [isLoading, setIsLoading] = useState<boolean>(false);

     useEffect(() => {
          setIsLoading(false)
     }, [])

     return (
          <Container
               title={"Fichas"}
               isLoading={isLoading}
          >
               asda
          </Container>
     )
}