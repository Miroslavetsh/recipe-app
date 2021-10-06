import { createContext, useContext } from 'react'

export type ErrorContextType = {
  errorMessage: string
  setErrorMessage: (message: string) => void
}

export const ErrorContext = createContext<ErrorContextType>({
  errorMessage: '',
  setErrorMessage: () => {},
})

export const useErrorContext = () => useContext(ErrorContext)
