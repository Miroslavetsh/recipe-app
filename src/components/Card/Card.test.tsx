import { render } from '@testing-library/react'
import Card from './Card'

const cardProps = {
  title: 'Card title',
  num: 240,
  image: '',
  textForNumber: 'Some text',
  route: '',
  horizontal: false,
  className: 'some__class',
}

const cardPropsWithoutClassName = {
  title: 'Card title',
  num: 240,
  image: '',
  textForNumber: 'Some text',
  route: '',
  horizontal: false,
}

const cardPropsWithoutHorizontal = {
  title: 'Card title',
  num: 240,
  image: '',
  textForNumber: 'Some text',
  route: '',
  className: 'some__class',
}

const cardPropsWithoutClassNameAndHorizontal = {
  title: 'Card title',
  num: 240,
  image: '',
  textForNumber: 'Some text',
  route: '',
}

describe('Card component', () => {
  test('should be on page with truthy params', () => {
    render(<Card {...cardProps} />)
  })

  test('should correctly process className prop', () => {
    render(<Card {...cardPropsWithoutClassName} />)
  })

  test('should correctly process horizontal prop', () => {
    render(<Card {...cardPropsWithoutHorizontal} />)
  })

  test('should correctly process className and horizontal props', () => {
    render(<Card {...cardPropsWithoutClassNameAndHorizontal} />)
  })
})
