import React, { useState, useEffect, useRef, MouseEvent } from 'react';

// 1. Define types for the component props
interface ProductDropdownProps {
  onSelectProduct?: (productType: string) => void;
}

export default function ProductDropdown({ onSelectProduct }: ProductDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('Select Product Type');
  
  // 2. Strongly type the ref to watch a HTMLDivElement
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const productTypes: string[] = [
    'All',
    'Modern',
    'Intelligent',
    'Incredible',
    'Oriental',
    'Small'
  ];

  // 3. Handle outside click detection safely with TypeScript
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | MouseEventInit | any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (type: string): void => {
    setSelectedType(type);
    setIsOpen(false);
    if (onSelectProduct) onSelectProduct(type); // Safely fires typed callback
  };

  return (
    <div className="relative w-[240px] font-sans" ref={dropdownRef}>
      <button 
        className={`w-full flex justify-between items-center px-4 py-3 bg-white border rounded-md text-[15px] text-left cursor-pointer transition-all duration-200 outline-none
          ${isOpen 
            ? 'border-green-500 ring-3 ring-green-500/15' 
            : 'border-gray-300 hover:border-green-500 hover:ring-3 hover:ring-green-500/15'
          }`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="text-gray-800">{selectedType}</span>
        <span className={`text-[10px] text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && ( 
        <ul className="absolute top-full left-0 w-full mt-1 py-1.5 bg-white border border-gray-200 rounded-md shadow-lg list-none z-10 max-height-[250px] overflow-y-auto"
          role="listbox">
          {productTypes.map((type) => (
            <li 
              key={type} 
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150
                ${selectedType === type 
                  ? 'bg-green-50 text-green-600 font-bold' 
                  : 'text-gray-700 hover:bg-[#C8FAD6]'
                }`}
              onClick={() => handleSelect(type)}
              role="option"
              aria-selected={selectedType === type}
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}