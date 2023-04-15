import { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';

const Alert = () => {
  const [open, setOpen] = useState(true);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root className="ToastRoot" open={open}>
        <Toast.Title className="ToastTitle">小惊喜</Toast.Title>
        <Toast.Description asChild>
          <div className="ToastDescription">
            记得在空白处<span className="font-bold">长按屏幕</span>或<span className="font-bold">点击鼠标右键</span>
          </div>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <button className="IconButtonWithoutPosition" aria-label="Close" onClick={() => setOpen(false)}>
            <Cross2Icon />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default Alert;
