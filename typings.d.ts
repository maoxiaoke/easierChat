declare interface ChatMessage {
  date: string;
  role: 'assistant' | 'user';
  text: string;
  id?: string;
}