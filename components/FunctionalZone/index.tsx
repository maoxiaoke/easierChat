import React from 'react';
import { PersonIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { builtinPrompts } from '../../data/prompts';
import { useAssistantRole } from '../../contexts/assistant';

import type { AssistantRole } from '../../data/prompts';

export interface ListItemProps {
  className?: string;
  children: React.ReactNode;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const ListItem = ({ className, children, title, onClick }: ListItemProps ) => (
  <li onClick={onClick}>
    <NavigationMenu.Link asChild>
      <div className={classNames('ListItemLink', className)}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </div>
    </NavigationMenu.Link>
  </li>
);

const RoleSelection = ({ onChange }: { onChange: (p: AssistantRole) => void}) => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm shadow-md bg-indigo-600 text-white hover:bg-indigo-500 transition-all active:bg-indigo-600 group space-x-2">
            <PersonIcon />
            <span>选择 AI 角色</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              {
                builtinPrompts.map((prompt) => (
                  <ListItem
                    key={prompt.id}
                    title={prompt.title}
                    onClick={() => onChange(prompt)}
                  >{prompt.desc}</ListItem>
                ))
              }
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const FunctionalZone = () => {
  const { value, setValue } = useAssistantRole();

  const assistantRole = builtinPrompts.find((p) => p.id === value);

  return (
    <div>
      <RoleSelection  onChange={(prompt) => setValue(prompt.id)} />

      { assistantRole
        ? (<div className="px-4 flex items-center justify-center mt-8 mb-2">
            <p className="text-sm text-gray-500 px-4 py-1 rounded-ful dark:invert">
              当前正在跟 <span className="font-bold text-black">{assistantRole.title}</span> 聊天
            </p>
        </div>)
        : null
      }
    </div>
  )
}

export default FunctionalZone;