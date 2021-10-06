import { render } from '@testing-library/react'
import Container from './Container'

test('should be on page at least in one component', () => {
  render(<Container />)
})

test('should contain children and correctly show its', () => {
  render(
    <Container>
      <div className='some__chid some__chid--1'></div>
      <div className='some__chid some__chid--2'></div>
    </Container>
  )
})
