import React, { useState } from 'react';
import { FIcon } from './FIcon.tsx';

export const FCheckBox = () => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const handleInputChange = (event) => {
    setNewOption(event.target.value);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <div className="checkbox-container flex flex-col gap-2 overflow-y-scroll">
      <div className="checkbox-options">
        {options.map((option, index) => (
          <div key={index} className="checkbox-option flex justify-start items-center">
            <label className='flex gap-2 text-nowrap'>
              <input type="checkbox" value={option} className='w-1/2 px-2 outline-none bg-transparent border-b-2 border-gray-500'/>
              {option}
            </label>
            <button onClick={() => handleDeleteOption(index)} className="delete-button">
            <FIcon src={'../public/icon/delete.png'} alt={'delete'} />
            </button>
          </div>
        ))}
      </div>
      <div className="add-option flex items-center justify-start">
        <input
          type="text"
          value={newOption}
          onChange={handleInputChange}
          placeholder="Enter new option"
          className="option-input w-1/2 px-2 outline-none bg-transparent border-b-2 border-gray-500"
        />
        <button onClick={handleAddOption} className="add-button">
          <FIcon src={'../public/icon/plus.png'} alt={'plus'} />
        </button>
      </div>
    </div>
  );
};

