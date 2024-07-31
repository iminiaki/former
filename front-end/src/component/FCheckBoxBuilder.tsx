import { FIcon } from './FIcon.tsx'
import { FInput } from './FInput.tsx'
import { useState } from 'react'

export const FCheckBoxBuilder = () => {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className={'flex justify-start items-center'}>
      <FInput
        placeholder={'new-option'}
        isBorder
        value={inputValue}
        changeHandler={(e) => {
          setInputValue(e.target.value)
        }}
      />
      <FIcon src={'../public/icon/delete.png'} alt={'delete'} />
      <FIcon
        src={'../public/icon/plus.png'}
        alt={'plus'}
        clickHandler={() => {
          console.log('add new option for check box')
        }}
      />
    </div>
  )
}
