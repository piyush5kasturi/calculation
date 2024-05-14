import { useState } from 'react';
import ShorthandPopup from 'src/components/modals/category/shorthand-popup';

import Button from '../../button';

export default function Shorthand({ onAction, tooltip }) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-end items-end h-full">
      <Button
        size="large"
        full
        text={'Shorthand'}
        onClick={() => setModalOpen(true)}
        tooltip={tooltip}
        className="!py-2"
      />
      {isModalOpen && (
        <ShorthandPopup
          isOpen={isModalOpen}
          toggle={() => setModalOpen(false)}
          onAction={(v: any[]) => {
            onAction([...v.slice(0, v.length - 2), ...v.slice(v.length - 1)]);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
