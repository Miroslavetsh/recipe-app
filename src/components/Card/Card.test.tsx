import { render } from '@testing-library/react'
import Card from '../Card/Card'

const cardProps = {
  title: 'Card title',
  num: 240,
  image: '',
  textForNumber: 'Some text',
}

test('should be on page with truthy params', () => {
  render(<Card {...cardProps} />)
})

test('should correctly process className prop', () => {
  render(<Card {...{ ...cardProps, className: 'some__class' }} />)
})
