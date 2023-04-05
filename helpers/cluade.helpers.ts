export const formatClaudePrompt = (chats: ChatMessage[]): string => {
  if (chats.length === 0) {
    return '';
  }

  return chats
    .reduce((pre, chat) => {
      if (chat.role === 'user') {
        return `${pre}Human: ${chat.text}\n\n`
      }
      return `${pre}Assistant: ${chat.text}\n\n`

    }, '\n\n')
    .concat('Assistant:');
}