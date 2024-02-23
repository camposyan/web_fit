import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";

export function App() {
     return (
          <ChakraProvider
               toastOptions={{ defaultOptions: { position: 'top-right' } }}
          >
               <Router />
          </ChakraProvider>
     )
}

