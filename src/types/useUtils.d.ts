export interface InputsValidationType {
     name: string,
     value: string | number | boolean | undefined,
     type?: 'text' | 'password' | 'email',
     isSelect?: boolean
}

export interface InputsValidationReturnType {
     isValidated: boolean,
     invalidatedInputs: string[]
}