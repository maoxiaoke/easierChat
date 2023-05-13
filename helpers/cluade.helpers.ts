export const formatClaudePrompt = (
  chats: ChatMessage[],
  assistant: AssistantRole,
  file?: string
): string => {
  let _chats = chats.filter((chat) => chat.conversationId === assistant.id);

  if (_chats.length === 0) {
    return "";
  }

  if (file) {
    const _context = {
      text: `Here is the file Content: '${file}'`,
      role: "user" as any,
      date: Date.now(),
    };

    _chats = [_context, ..._chats];
  }

  return _chats
    .reduce((pre, chat) => {
      if (chat.role === "user") {
        return `${pre}Human: ${chat.text}\n\n`;
      }
      return `${pre}Assistant: ${chat.text}\n\n`;
    }, `\n\nHuman: ${assistant.prompt} \n\n`)
    .concat("Assistant:");
};
