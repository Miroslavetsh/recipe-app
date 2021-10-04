import { render } from '@testing-library/react'
import Card from '../Card/Card'

const cardProps  = {
  title: 'Card title',
  num: 240,
  image: '',
}

test('should be on page with truthy params', () => {
  render(<Card {...cardProps} />)
})
