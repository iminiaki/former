import { FTitle } from './FTitle.tsx'
import { FInput } from './FInput.tsx'

export const FTitleBox = () => {
  return (
    <div
      className={
        'w-2/3 my-4 mx-auto grid grid-rows-2 grid-cols-1 justify-start items-center p-5 rounded bg-white shadow border-2 border-gray-300'
      }
    >
      <FTitle value={'Untitled form'} />
      <FInput placeholder={'Form Description...'} />
    </div>
  )
}
