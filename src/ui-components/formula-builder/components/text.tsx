import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { HELP_TEXT } from '../constants';
import { ObjType } from '../formula-builder.interface';

export default function Text({
  value: defaultValue,
  placeholder,
  onHover,
  onChange,
  className,
  index,
  label,
  isView = false,
}) {
  const [value, setValue] = useState('');
  const [isEditing, setEditing] = useState(!defaultValue);
  const inputEl = useRef<any>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (!isEditing && inputEl?.current) {
      inputEl.current?.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames(
        `font-inter relative flex flex-col top-[0.5px] focus:outline-none`,
        className,
      )}
    >
      {isEditing && (
        <input
          ref={inputEl}
          className="w-36 border-[#E1E1E1] dark:border-[#3D3D3D] border-b-2  bg-inherit font-inter outline-none"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          onMouseEnter={() => onHover && onHover(HELP_TEXT.EDITOR_TEXT)}
          onKeyDown={(e) => {
            if (e?.key === 'Enter') {
              e.preventDefault();
              onChange((prevState: ObjType[]) => {
                prevState[index].value = value;
                prevState[index].label = value;
                return [...prevState];
              });
              setEditing(false);
            }
          }}
        />
      )}
      {!isEditing && (
        <span
          className={classNames('text-primary', { ' cursor-pointer': !isView })}
          onMouseEnter={() => !isView && onHover && onHover(HELP_TEXT.CHANGE_TEXT)}
          onDoubleClick={() => !isView && setEditing(true)}
        >{`"${label}"`}</span>
      )}
    </li>
  );
}
