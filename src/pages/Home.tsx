import { useState } from "react";
import { Container } from "../components/Container";

export function Home() {
     const [isLoading, setIsLoading] = useState<boolean>(false);

     setIsLoading(false)
     return (
          <Container
               title={"Home"}
               isLoading={isLoading}
          >
               asda
          </Container>
     )
}