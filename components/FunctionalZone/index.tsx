import React from 'react';
import { PersonIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { builtinPrompts } from '../../data/prompts';
import { useAssistantRole } from '../../contexts/assistant';

export interface ListItemProps {
  className?: string;
  children: React.ReactNode;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const RoleSelection = ({ onChange }: { onChange: (p: AssistantRole) => void}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild className="inline-flex items-center justify-center rounded-full px-3 py-2 shadow-md bg-blue-600 text-white hover:bg-blue-500 transition-all active:bg-blue-600 group font-semibold text-xs">
      <div className="cursor-pointer">
        <PersonIcon />
        <span>选择 AI 角色</span>
      </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      {/* <Dialog.Overlay className="DialogOverlay" /> */}
      <Dialog.Content className="DialogContent w-full sm:max-w-[90vw] sm:w-fit">
        <Dialog.Title className="DialogTitle">选择角色</Dialog.Title>
        {/* <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description> */}
        <ul className="List two overflow-y-auto">
          {
            builtinPrompts.map((prompt) => (
              <Dialog.Close asChild key={prompt.id}>
                <ListItem
                  key={prompt.id}
                  title={prompt.title}
                  onClick={() => onChange(prompt)}
                >{prompt.desc}</ListItem>
              </Dialog.Close>
            ))
          }
        </ul>
        {/* <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div> */}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const ListItem = ({ className, children, title, onClick }: ListItemProps ) => (
  <li onClick={onClick}>
      <div className={classNames('ListItemLink', className)}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </div>
  </li>
);

const FunctionalZone = () => {
  const { setValue } = useAssistantRole();

  return (
    <div>
      <RoleSelection onChange={(prompt) => setValue(prompt.id)} />
    </div>
  )
}

export default FunctionalZone;