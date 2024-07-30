//Todo: complete this component
export const FInput = ({
  placeholder,
  isBorder = false,
  isReadonly = false,
}) => {
  return (
    <input
      readOnly={isReadonly}
      placeholder={placeholder}
      className={`w-1/2 px-2 outline-none bg-transparent ${isBorder ? 'border-b-2 border-gray-500' : ''}`}
    />
  )
}
