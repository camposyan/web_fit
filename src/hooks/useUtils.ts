import { useToast } from "@chakra-ui/react";
import { InputsValidationReturnType, InputsValidationType } from "../types/useUtils";

export function useUtils() {
     const toast = useToast();

     const emailValidation = (email: string): boolean => {
          const emailRegex = /\S+@\S+\.\S+/;

          if (!emailRegex?.test(email)) {
               toast({
                    title: 'E-mail inválido!',
                    description: 'Preencha o campo com um e-mail em um formato válido.',
                    status: 'error'
               })

               return false;
          }

          return true;
     }

     const passwordValidation = (password: string): boolean => {
          if (password.length < 8) {
               toast({
                    title: 'Senha inválida!',
                    description: 'O campo de senha deve ter no mínimo 8 caracteres.',
                    status: 'error',
               })

               return false;
          }

          return true;
     }

     const inputsValidation = (inputs: InputsValidationType[]): InputsValidationReturnType => {
          let isValidated = false;
          let invalidatedInputs = [''];
          let toastMessage: string[] = [];

          inputs?.map((input, index) => {
               if (input.value === undefined || input.value === '') {
                    invalidatedInputs[index] = input.name;
                    if (toastMessage.length === 0) {
                         toastMessage.push('Preencha os campos obrigatórios corretamente.');
                    }
               } else {
                    if (input.type === 'email') {
                         const emailRegex = /\S+@\S+\.\S+/;

                         if (!emailRegex?.test(input.value as string)) {
                              invalidatedInputs.push(input.name);
                              toastMessage.push('Preencha o campo com um e-mail em um formato válido.');
                         } else {
                              invalidatedInputs.slice(index, 1);
                         }
                    } else if (input.type === 'password') {
                         if ((input.value as string).length < 8) {
                              invalidatedInputs.push(input.name);
                              toastMessage.push('O campo de senha deve ter no mínimo 8 caracteres.');
                         } else {
                              invalidatedInputs.slice(index, 1);
                         }
                    } else {
                         invalidatedInputs.slice(index, 1);
                    }
               }
          })

          if (invalidatedInputs.length === 0 || (invalidatedInputs.length === 1 && invalidatedInputs[0] === '')) {
               isValidated = true;
          } else {
               isValidated = false;

               toastMessage.map((message) => {
                    toast({
                         title: 'Atenção!',
                         description: message,
                         status: 'error',
                    })
               })
          }

          return {
               isValidated: isValidated,
               invalidatedInputs: invalidatedInputs
          }
     }

     return {
          emailValidation,
          passwordValidation,
          inputsValidation
     }
}