type InputValidatorPropsTypes = {
  searchRef: any
  len: number
  className?: string
}

const InputValidator: React.FC<InputValidatorPropsTypes> = (props) => {
  const { len, className, searchRef } = props
  let message = ''
  try {
    const searchInput = searchRef.current as unknown as HTMLInputElement

    if (len === 0 && searchInput.value.length === 0)
      message = 'There are no words entered to the input :('
    else if (len === 0 && searchInput.value.length !== 0)
      message =
        'It seems like your entered word is not an ingredient. Try again :)'
  } catch {}
  return <p className={className}>{message}</p>
}

InputValidator.defaultProps = {
  className: '',
}

export default InputValidator
