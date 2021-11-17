import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  test('should be on page', () => {
    render(<App />)
  })
  
  test('contains every part of application', () => {
    render(<App />)
    expect(screen.getByText('Welcome To Application')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
    expect(screen.getByText('Sorting')).toBeInTheDocument()
  })
})
