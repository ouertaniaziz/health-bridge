export interface IMessage {
  message: string;
  sender: string;
  direction: 'incoming' | 'outgoing' | 0 | 1;
  position: 'single' | 'first' | 'normal' | 'last' | 0 | 1 | 2 | 3;
}
