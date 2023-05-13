import { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Link from "next/link";
import ClaudeSetting from "../ClaudeSetting";
import { useIsSupportCapture } from "../../hooks/useIsSupportCapture";

import { builtinPrompts } from "../../data/prompts";
import { useAssistantRole } from "../../contexts/assistant";
import CommandBar from "../CommandBar";
import { KBarProvider } from "kbar";

import type { Action } from "kbar";

const about = [
  {
    id: "about_me",
    name: "关于我",
    keywords: "about, me, author",
    section: "About",
    perform: () => {
      window.open("https://twitter.com/xiaokedada", "__blank");
    },
  },
];

const ContextMenuChat = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsSupportCapture();

  const [claudeSettingOpen, setClaueSettingOpen] = useState(false);
  const { setValue } = useAssistantRole();

  const promptsActions: Action[] = builtinPrompts.map((prompt) => ({
    id: prompt.id,
    name: prompt.title,
    keywords: prompt.keywords.join(", "),
    section: "Prompt",
    subtitle: prompt.desc,
    perform: (action) => {
      setValue(action.id);
    },
  }));

  const settingActions = [
    {
      id: "claude_setting",
      name: "模型设置",
      keywords: "setting",
      section: "Setting",
      subtitle: "设置 CLAUDE 的参数",
      perform: () => {
        setClaueSettingOpen(true);
      },
    },
  ];

  const functionActions = [
    {
      id: "upload_files",
      name: "上传文件",
      keywords: "upload",
      section: "Functions",
      subtitle: "",
    },
  ];

  const actions = [...settingActions, ...promptsActions, ...about];

  return (
    <KBarProvider actions={actions}>
      <CommandBar />
      {isMobile ? (
        <div>{children}</div>
      ) : (
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <>
              {children}
              <ClaudeSetting
                open={claudeSettingOpen}
                setOpen={(o) => setClaueSettingOpen(false)}
              />
            </>
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            {/* @ts-ignore */}
            <ContextMenu.Content
              className="ContextMenuContent"
              sideOffset={5}
              align="end"
            >
              <ContextMenu.Item
                className="ContextMenuItem cursor-pointer"
                onClick={() => {
                  // FIXME: 这里先这样
                  localStorage.removeItem("ec-records");
                  location.reload();
                }}
              >
                删除历史记录
              </ContextMenu.Item>
              <ContextMenu.Item
                className="ContextMenuItem cursor-pointer"
                onClick={() => {
                  location.reload();
                }}
              >
                刷新 <div className="RightSlot">⌘+R</div>
              </ContextMenu.Item>

              <ContextMenu.Separator className="ContextMenuSeparator" />
              <ContextMenu.Item
                className="ContextMenuItem cursor-pointer"
                onClick={() => {
                  setClaueSettingOpen(true);
                }}
              >
                Claude 配置
              </ContextMenu.Item>

              <ContextMenu.Separator className="ContextMenuSeparator" />
              <ContextMenu.Label className="ContextMenuLabel">
                关于
              </ContextMenu.Label>
              <ContextMenu.Item className="ContextMenuItem cursor-pointer">
                EasierChat
              </ContextMenu.Item>
              <ContextMenu.Item className="ContextMenuItem">
                <Link href="https://twitter.com/xiaokedada">作者</Link>
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      )}
    </KBarProvider>
  );
};

export default ContextMenuChat;
