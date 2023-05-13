import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";

export interface FileInfo {
  content: string;
  name: string;
  fileSize: string;
}

interface FastOperationsProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onFileUpload: (file: FileInfo) => void;
}

const FastOperations = ({
  children,
  visible,
  onClose,
  onFileUpload,
}: FastOperationsProps) => (
  <Popover.Root open={visible}>
    <Popover.Trigger asChild>{children}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="z-50 rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
        align="start"
      >
        <ul className="flex flex-col gap-2.5">
          <li className="flex gap-5 items-center">
            <label
              className="text-[13px] text-violet11 w-[75px]"
              htmlFor="width"
            >
              上传文件
            </label>
            <input
              onAbort={onClose}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                console.log("fefsf", file);
                if (!file) {
                  onClose();
                  return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                  const content = e.target?.result;
                  if (!content) {
                    onClose();
                    return;
                  }
                  onFileUpload({
                    content: content.toString(),
                    name: file.name,
                    fileSize: file.size.toString(),
                  });
                  onClose();
                };
                reader.readAsText(file);
              }}
              accept=".txt"
              className="w-full mt-2 inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none h-[25px] outline-none"
              id="width"
            />
          </li>
        </ul>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default FastOperations;
