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
    const idx = _chats.findIndex((chat) => chat.role === "user");

    if (idx > -1) {
      _chats = [
        ..._chats.slice(0, idx),
        {
          ..._chats[idx],
          text: `Here is an essay: '${file}'\n\n${_chats[idx].text}`,
        },
      ];
    }
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
