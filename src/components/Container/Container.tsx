import styles from './Container.module.scss'

type ContainerPropsTypes = {
  className?: string
  children?: React.ReactNode
}

const Container: React.FC<ContainerPropsTypes> = (props) => {
  return (
    <div className={[styles.container, props.className].join(' ')}>
      {props.children}
    </div>
  )
}

Container.defaultProps = {
  className: '',
  children: [],
}

export default Container
