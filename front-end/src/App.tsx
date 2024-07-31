import { FHeader } from './component/FHeader.tsx'
import { FMain } from './component/FMain.tsx'
import { FTitleBox } from './component/FTitleBox.tsx'
import { FInputBuilder } from './component/FInputBuilder.tsx'
import { FIcon } from './component/FIcon.tsx'

function App() {
  return (
    <>
      <FHeader />
      <FMain>
        <FTitleBox />
        <FInputBuilder />
        <FIcon src={'../public/icon/plus.png'} alt={'plus'} />
      </FMain>
    </>
  )
}

export default App
