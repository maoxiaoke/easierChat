declare interface ChatMessage {
  date: Date;
  role: 'assistant' | 'user';
  text: string;
  id?: string;
}