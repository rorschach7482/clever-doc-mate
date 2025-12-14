import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Pencil, Check, X, Database } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatContainer, ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { RecentChatsPreview } from "@/components/chat/RecentChatsPreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useChatThreads } from "@/contexts/ChatThreadsContext";
import type { ChatMessage as ChatMessageType } from "@/services/api/types";

export default function CentralChat() {
  const { chatId } = useParams<{ chatId?: string }>();
  const {
    activeThreadId,
    setActiveThreadId,
    createThread,
    getThread,
    addMessage,
    updateMessage,
    renameThread,
    getRecentChats,
  } = useChatThreads();

  const [isStreaming, setIsStreaming] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(true);

  // Sync URL param with active thread
  useEffect(() => {
    if (chatId && chatId !== activeThreadId) {
      setActiveThreadId(chatId);
    }
  }, [chatId, activeThreadId, setActiveThreadId]);

  const activeThread = activeThreadId ? getThread(activeThreadId) : null;
  const messages = activeThread?.messages || [];
  const recentChats = getRecentChats(3).filter((c) => c.id !== activeThreadId);

  const handleStartEditTitle = () => {
    if (activeThread) {
      setEditedTitle(activeThread.title);
      setIsEditingTitle(true);
    }
  };

  const handleSaveTitle = () => {
    if (activeThread && editedTitle.trim()) {
      renameThread(activeThread.id, editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
    setEditedTitle("");
  };

  const simulateStreamingResponse = useCallback(
    async (threadId: string) => {
      setIsStreaming(true);

      const responses = [
        "Based on my analysis, ",
        "I found several relevant insights. ",
        "Here are the key points:\n\n",
        "**1. Main Finding**\n",
        "The information you're looking for relates to important aspects of your query.\n\n",
        "**2. Supporting Details**\n",
        "Additional context supports this conclusion and provides more depth.",
      ];

      const assistantMessage: ChatMessageType = {
        id: `msg-${Date.now()}`,
        projectId: "",
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString(),
      };

      addMessage(threadId, assistantMessage);

      let fullContent = "";
      for (const chunk of responses) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        fullContent += chunk;
        updateMessage(threadId, assistantMessage.id, { content: fullContent });
      }

      // Add sources after streaming completes
      updateMessage(threadId, assistantMessage.id, {
        content: fullContent,
        sources: [
          {
            id: "source-1",
            name: "Analysis Result",
            snippet:
              "Relevant information extracted from your query context...",
          },
        ],
      });

      setIsStreaming(false);
    },
    [addMessage, updateMessage]
  );

  const handleSendMessage = useCallback(
    (content: string) => {
      let threadId = activeThreadId;

      // Build request payload with KB flag based on toggle state
      // TODO: Backend will use this payload structure
      const _requestPayload = {
        query: content,
        useKnowledgeBase,
      };

      // Create thread on first message
      if (!threadId) {
        const newThread = createThread(content);
        threadId = newThread.id;
      }

      // Add user message
      const userMessage: ChatMessageType = {
        id: `msg-${Date.now()}`,
        projectId: "",
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      addMessage(threadId, userMessage);
      simulateStreamingResponse(threadId);
    },
    [activeThreadId, createThread, addMessage, simulateStreamingResponse]
  );

  const handleSelectRecentChat = (chatId: string) => {
    setActiveThreadId(chatId);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        {activeThread ? (
          <div className="border-b border-border px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="max-w-md h-8"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveTitle();
                      if (e.key === "Escape") handleCancelEditTitle();
                    }}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={handleSaveTitle}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={handleCancelEditTitle}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="font-medium text-foreground">
                    {activeThread.title}
                  </h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={handleStartEditTitle}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="kb-toggle-active" className="text-sm text-muted-foreground cursor-pointer">
                Include Knowledge Base
              </Label>
              <Switch
                id="kb-toggle-active"
                checked={useKnowledgeBase}
                onCheckedChange={setUseKnowledgeBase}
              />
            </div>
          </div>
        ) : (
          <div className="border-b border-border px-6 py-3 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="kb-toggle" className="text-sm text-muted-foreground cursor-pointer">
                Include Knowledge Base
              </Label>
              <Switch
                id="kb-toggle"
                checked={useKnowledgeBase}
                onCheckedChange={setUseKnowledgeBase}
              />
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 && !activeThread ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-1">
                Start a new conversation
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Ask questions and get AI-powered insights. Your chat history
                will be saved automatically.
              </p>
            </div>
          ) : (
            <ChatContainer>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </ChatContainer>
          )}

          <div className="border-t border-border">
            <ChatInput onSend={handleSendMessage} disabled={isStreaming} />

            {/* Recent Chats Preview - only show when no active thread */}
            {!activeThread && recentChats.length > 0 && (
              <RecentChatsPreview
                chats={recentChats.slice(0, 3)}
                onSelect={handleSelectRecentChat}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
