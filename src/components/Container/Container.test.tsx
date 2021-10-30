import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container component', () => {
  test('should be on page without component', () => {
    render(
      <section>
        <Container />
      </section>
    )
  })

  test('should contain children', () => {
    render(
      <section>
        <Container>
          <div className='some__chid some__chid--1'>Here child 1</div>
          <div className='some__chid some__chid--2'>Here child 2</div>
        </Container>
      </section>
    )

    expect(screen.getByText('Here child 1')).toBeInTheDocument()
    expect(screen.getByText('Here child 2')).toBeInTheDocument()
  })
})
