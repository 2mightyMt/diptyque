import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const CustomSelect = ({ options, defaultValue, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 선택 버튼 */}
      <button
        className={`flex items-center justify-between text-left text-body3 bg-white border border-darkgrey-3 hover:bg-gray-50 focus:outline-none ${className ? className : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`tablet:text-body3-m ${selectedOption.value === '' ? 'text-grey-2' : ''}`}>
          {selectedOption.label}
        </span>
        <Icon
          name="keyboard_arrow_down"
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 max-h-60">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-lightgrey-1 ${
                  selectedOption.value === option.value && option.value === '' && 'text-darkgrey-1'
                } ${selectedOption.value === option.value && option.value !== '' && 'text-darkgrey-3 font-bold'} `}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

/*

// 컴포넌트 사용법 예시

const Component = () => {
  const options = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' },
    { value: 'strawberry', label: '딸기' },
  ];

  return (
    <CustomSelect options={options} defaultValue={options[0]} onChange={(option) => console.log('Selected:', option)} className={style code} />
  );
};

*/
