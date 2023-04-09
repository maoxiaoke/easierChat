declare interface ChatMessage {
  /* 创建日期 */
  date: number;
  /* 角色 */
  role: 'assistant' | 'user';
  /* 文本 */
  text: string;
  /* uniqueID */
  id?: string;
  /* 会话 id */
  conversationId?: string;
}

declare interface AssistantRole {
  id: string,
  character: string,
  prompt: string;
  title: string;
  desc: string;
}
