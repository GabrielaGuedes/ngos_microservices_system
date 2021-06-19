import React from "react";
import { EmojiIconContainer } from "./emoji-icon.style";

interface IEmojiButton {
  emoji: string;
  onClick?: () => void;
}

const EmojiIcon: React.FC<IEmojiButton> = ({ emoji, onClick }) => {
  return <EmojiIconContainer onClick={onClick}>{emoji}</EmojiIconContainer>;
};

export default EmojiIcon;
