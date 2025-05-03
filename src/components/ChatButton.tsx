import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatButtonProps {
  onClick?: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  if (onClick) {
    return (
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={onClick}
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }
  
  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
      size="icon"
      asChild
    >
      <Link to="/fleet-assistant">
        <MessageSquare className="h-6 w-6" />
      </Link>
    </Button>
  );
};

export default ChatButton;
