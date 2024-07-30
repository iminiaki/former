import { FHeader } from './componenet/FHeader.tsx'
import { FMain } from './componenet/FMain.tsx'
import { FTitleBox } from './componenet/FTitleBox.tsx'
import { FInputBuilder } from './componenet/FInputBuilder.tsx'

function App() {
  return (
    <>
      <FHeader />
      <FMain>
        <FTitleBox />
        <FInputBuilder />
      </FMain>
    </>
  )
}

export default App
