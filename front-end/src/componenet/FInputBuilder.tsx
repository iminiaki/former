import { FInput } from './FInput.tsx'
import { FDropdown } from './FDropDown.tsx'
import { FIcon } from './FIcon.tsx'

export const FInputBuilder = () => {
  return (
    <div
      className={
        'grid grid-rows-6 grid-cols-1 w-2/3 h-80 bg-white shadow-2xl p-4 border-2 border-gray-500'
      }
    >
      <main className={'row-span-5'}>
        <header className={'w-full flex justify-between items-center h-3/5'}>
          <FInput placeholder={'Untitled Question'} isBorder />
          <FDropdown />
        </header>
        <main>
          <FInput placeholder={'Short answer text'} isBorder isReadonly />
        </main>
      </main>
      <footer
        className={
          'flex justify-end row-span-1 border-t-2 border-t-neutral-400'
        }
      >
        <label className={'flex items-center px-4'}>
          <FIcon src={'../public/icon/plus.png'} alt={'plus'} />
          <FIcon src={'../public/icon/delete.png'} alt={'delete'} />
          <span className={'mx-2'}>isRequired</span>
          <input type={'checkbox'} />
        </label>
      </footer>
    </div>
  )
}
