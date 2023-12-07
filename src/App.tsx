import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

export function App() {
     return (

          <ChakraProvider
               toastOptions={{ defaultOptions: { position: 'top-right' } }}
          >
               <RouterProvider router={Router} />
          </ChakraProvider>
     )
}

