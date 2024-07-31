import { FInput } from './FInput.tsx'
import { useState } from 'react'

export const FDropDownInput = () => {
  let [count, setCount] = useState(0)
  const [optionsCount, setOptionsCount] = useState([
    { value: `Options${count}` },
  ])
  const clickHandlerOnInput = () => {
    setCount((prevState) => prevState + 1)
    setOptionsCount((prevState) => [...prevState, { value: `Option${count}` }])
  }
  return (
    <div className={'flex flex-col h-20 gap-y-4 overflow-y-scroll'}>
      {optionsCount.map((i) => {
        return (
          <FInput
            value={i.value}
            key={i.value}
            isBorder
            clickHandler={clickHandlerOnInput}
          />
        )
      })}
    </div>
  )
}
