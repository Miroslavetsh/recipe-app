import { render, screen } from '@testing-library/react'
import App from './App'

test('should be on page', () => {
  render(<App />)
  expect(screen.getByText('Recipe Application')).toBeInTheDocument()
})
