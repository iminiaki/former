import { IFButton } from '../type/Types.ts'

export const FButton = ({ value, clickHandler }: IFButton) => {
  return (
    <button
      className={'w-32 h-12 p-2 bg-purple-700 rounded text-white'}
      onClick={clickHandler}
    >
      {value}
    </button>
  )
}
