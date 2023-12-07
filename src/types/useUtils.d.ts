export interface InputsValidationType {
     name: string,
     value: string | number | boolean | undefined,
     type?: 'text' | 'password' | 'email'
}

export interface InputsValidationReturnType {
     isValidated: boolean,
     invalidatedInputs: string[]
}