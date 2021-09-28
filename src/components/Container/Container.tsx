import styles from './Container.module.scss'

type ContainerPropsTypes = {
  children?: React.ReactNode
}

const Container: React.FC<ContainerPropsTypes> = (props) => {
  return <div className={styles.container}>{props.children}</div>
}

export default Container
