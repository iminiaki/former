// import React, { useState } from 'react'

// export const FDropdown = () => {
//   const [selectedOption, setSelectedOption] = useState('')

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value)
//   }

//   return (
//     <div>
//       <select
//         id="dropdown"
//         value={selectedOption}
//         onChange={handleChange}
//         className={
//           'w-44 h-12 bg-white border-2 border-gray-500 px-2 outline-none'
//         }
//       >
//         <option value="Text">Text Input</option>
//         <option value="Checkbox">Checkbox</option>
//         <option value="Radio">Radio</option>
//         <option value="Dropdown">Dropdown</option>
//       </select>
//     </div>
//   )
// }

import React from 'react';

export const FDropdown = ({ selectedOption, handleChange }) => {
  return (
    <div>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className={
          'w-44 h-12 bg-white border-2 border-gray-500 px-2 outline-none rounded'
        }
      >
        <option value="Text">Text Input</option>
        <option value="Checkbox">Checkbox</option>
        <option value="Radio">Radio</option>
        <option value="Dropdown">Dropdown</option>
      </select>
    </div>
  );
};