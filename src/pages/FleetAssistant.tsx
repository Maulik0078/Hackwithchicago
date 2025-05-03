import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import MainSidebar from '@/components/Sidebar';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw, Bot } from 'lucide-react';

const FleetAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MainSidebar />
        
        <div className="flex-1 container py-6">
          <div className="flex flex-col gap-6 fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Fleet Assistant</h1>
                <p className="text-muted-foreground">
                  Your intelligent AI assistant for fleet management insights
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Reset Conversation
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="bg-background rounded-lg border shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 mr-2 text-primary" />
                  <h2 className="text-xl font-semibold">Fleet Assistant</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Ask questions about your fleet data, driver performance, route optimization, 
                  maintenance schedules, or any other fleet management concerns.
                </p>
                
                <div className="flex flex-col h-[60vh]">
                  <ChatBot open={chatOpen} onOpenChange={setChatOpen} embedded={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FleetAssistant;
