import React, { useState } from 'react';
import { FInput } from './FInput.tsx'
import { FDropdown } from './FDropDown.tsx'
import { FCheckBox } from './FCheckBox.tsx';
import { FRadio } from './FRadio.tsx';
import { FIcon } from './FIcon.tsx'
import { FDropDownInput } from './FDropDownInput.tsx'
import { FAdminValidationBox } from './FAdminValidationBox.tsx'
import { FVerDevider } from './FVerDevider.tsx';
import './FInputBuilder.css';

export const FInputBuilder = () => {
  const [selectedOption, setSelectedOption] = useState('Text');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderInput = () => {
    switch (selectedOption) {
      case 'Text':
        return <FInput placeholder="Short answer text" isBorder isReadonly />;
      case 'Checkbox':
        return <FCheckBox />;
      case 'Radio':
        return <FRadio />;
      case 'Dropdown':
        return <FDropDownInput />;
      default:
        return console.log("kirekhar"); // Return null if no conditions are met
    }
  };
  return (
    <div
      className={
        'grid grid-rows-6 grid-cols-1 w-2/3 h-80 bg-white shadow-2xl p-4 border-2 border-gray-500'
      }
    >
      <main className={'row-span-5'}>
        <header className={'w-full flex justify-between items-center h-3/5'}>
          <FInput placeholder={'Untitled Question'} isBorder />
          <FDropdown selectedOption={selectedOption} handleChange={handleChange} />
        </header>
        <main>
          {/*<FInput placeholder={'Short answer text'} isBorder isReadonly />*/}
          {/* <FDropDownInput /> */}
          {renderInput()}
          
        </main>
      </main>
      <footer
        className={
          'flex justify-end items-center row-span-1 border-t-2 border-t-neutral-400'
        }
      >
        <label className={'flex items-center px-4'}>
          <FIcon src={'../public/icon/delete.png'} alt={'delete'} />
          <FVerDevider />
          <FAdminValidationBox value={'isRequired'} />
          <FAdminValidationBox value={'isUnique'} />
        </label>
      </footer>
    </div>
  )
}
