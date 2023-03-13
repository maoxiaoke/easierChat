import React from 'react';
import { PersonIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { builtinPrompts } from '../../data/prompts';

export interface ListItemProps {
  className?: string;
  children: React.ReactNode;
  title: string;
  [k: string]: any;
}

const ListItem = ({ className, children, title, ...props }: ListItemProps ) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={classNames('ListItemLink', className)} {...props}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
);

const NavigationMenuDemo = () => {
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
                  <ListItem key={prompt.id} title={prompt.title}>{prompt.desc}</ListItem>
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
  return (
    <div>
      <div>
        <NavigationMenuDemo />
      </div>
    </div>
  )
}

export default FunctionalZone;