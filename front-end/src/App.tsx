import { FHeader } from './componenet/FHeader.tsx'
import { FMain } from './componenet/FMain.tsx'
import { FTitleBox } from './componenet/FTitleBox.tsx'
import { FInputBuilder } from './componenet/FInputBuilder.tsx'
import { FIcon } from './componenet/FIcon.tsx'

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
