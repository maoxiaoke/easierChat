export const formatClaudePrompt = (chats: ChatMessage[], assistant: AssistantRole): string => {
  const _chats = chats.filter(chat => chat.conversationId === assistant.id);
  if (_chats.length === 0) {
    return '';
  }

  return _chats
    .reduce((pre, chat) => {
      if (chat.role === 'user') {
        return `${pre}Human: ${chat.text}\n\n`
      }
      return `${pre}Assistant: ${chat.text}\n\n`

    }, `\n\nHuman: ${assistant.prompt} \n\n`)
    .concat('Assistant:');
}