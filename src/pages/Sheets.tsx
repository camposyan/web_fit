import { useState } from "react";
import { Container } from "../components/Container";

export function Sheets() {
     const [isLoading, setIsLoading] = useState<boolean>(false);

     setIsLoading(false)
     return (
          <Container
               title={"Fichas"}
               isLoading={isLoading}
          >
               asda
          </Container>
     )
}