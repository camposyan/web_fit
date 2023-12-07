import { useState } from "react";
import { Container } from "../components/Container";

export function Dashboard() {
     const [isLoading, setIsLoading] = useState<boolean>(false);

     return (
          <Container
               title={"Dashboard"}
               isLoading={isLoading}
          >
               asda
          </Container>
     )
}