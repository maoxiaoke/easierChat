declare interface ChatMessage {
  date: number;
  role: 'assistant' | 'user';
  text: string;
  id?: string;
  conversationId?: string;
}

declare interface AssistantRole {
  id: string,
  character: string,
  prompt: string;
  title: string;
  desc: string;
}
