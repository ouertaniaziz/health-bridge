import React from 'react';
import { Button } from 'antd';

type Props = {
  icon: string;
  onClick: () => void;
  type?: 'primary' | 'dashed' | 'text' | 'link' | 'ghost' | 'default';
};
const chatgptlogo = `${window.origin}/content/ChatGPT_logo.svg.png`; //photo

const ChatGPTaction = ({ onClick, icon, type }: Props) => (
  <Button className='page-action' type={type} size='large' shape='circle' onClick={onClick}>
    {/* <span className={`icofont ${icon}`} style={{ fontSize: 40 }} /> */}
    <img src={chatgptlogo} alt='chatgptlogo' />
  </Button>
);

export default ChatGPTaction;
