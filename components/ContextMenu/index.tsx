import { useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const ContextMenuChat = ({ children }: { children: React.ReactNode }) => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
       { children }
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        {/* @ts-ignore */}
        <ContextMenu.Content className="ContextMenuContent" sideOffset={5} align="end">
          <ContextMenu.Item className="ContextMenuItem" onClick={() => {
            // FIXME: 这里先这样
            localStorage.removeItem('ec-records');
          }}>
            删除缓存
          </ContextMenu.Item>
          {/* <ContextMenu.Item className="ContextMenuItem" disabled>
            Remove <div className="RightSlot">⌘+]</div>
          </ContextMenu.Item> */}
          <ContextMenu.Item className="ContextMenuItem" onClick={() => {
            location.reload();
          }}>
            刷新 <div className="RightSlot">⌘+R</div>
          </ContextMenu.Item>
          {/* <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
              More Tools
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="ContextMenuSubContent"
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenu.Item className="ContextMenuItem">
                  Save Page As… <div className="RightSlot">⌘+S</div>
                </ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">Create Shortcut…</ContextMenu.Item>
                <ContextMenu.Item className="ContextMenuItem">Name Window…</ContextMenu.Item>
                <ContextMenu.Separator className="ContextMenuSeparator" />
                <ContextMenu.Item className="ContextMenuItem">Developer Tools</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub> */}

          {/* <ContextMenu.Separator className="ContextMenuSeparator" />

          <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              <CheckIcon />
            </ContextMenu.ItemIndicator>
            Show Bookmarks <div className="RightSlot">⌘+B</div>
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem
            className="ContextMenuCheckboxItem"
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
              <CheckIcon />
            </ContextMenu.ItemIndicator>
            Show Full URLs
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator className="ContextMenuSeparator" />

          <ContextMenu.Label className="ContextMenuLabel">People</ContextMenu.Label>
          <ContextMenu.RadioGroup value={person} onValueChange={setPerson}>
            <ContextMenu.RadioItem className="ContextMenuRadioItem" value="pedro">
              <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                <DotFilledIcon />
              </ContextMenu.ItemIndicator>
              Pedro Duarte
            </ContextMenu.RadioItem>
            <ContextMenu.RadioItem className="ContextMenuRadioItem" value="colm">
              <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                <DotFilledIcon />
              </ContextMenu.ItemIndicator>
              Colm Tuite
            </ContextMenu.RadioItem>
          </ContextMenu.RadioGroup> */}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default ContextMenuChat;