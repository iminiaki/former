//Todo: complete this component
export const FInput = ({
  placeholder,
  isBorder = false,
  isReadonly = false,
  value,
  clickHandler,
  changeHandler,
}) => {
  return (
    <input
      readOnly={isReadonly}
      placeholder={placeholder}
      value={value}
      onClick={clickHandler}
      onChange={changeHandler}
      className={`w-1/2 px-2 outline-none bg-transparent ${isBorder ? 'border-b-2 border-gray-500' : ''}`}
    />
  )
}
