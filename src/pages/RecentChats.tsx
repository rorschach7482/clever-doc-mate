import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatListItem } from "@/components/chat/ChatListItem";
import { MoveToProjectModal } from "@/components/chat/MoveToProjectModal";
import { useChatThreads } from "@/contexts/ChatThreadsContext";

const PAGE_SIZE = 25;

export default function RecentChats() {
  const navigate = useNavigate();
  const { threads, deleteThread, renameThread, moveToProject, setActiveThreadId } =
    useChatThreads();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const filteredChats = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = searchQuery
      ? threads.filter(
          (t) =>
            t.title.toLowerCase().includes(lowerQuery) ||
            t.messages.some((m) =>
              m.content.toLowerCase().includes(lowerQuery)
            )
        )
      : threads;

    return [...filtered].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [threads, searchQuery]);

  const visibleChats = filteredChats.slice(0, visibleCount);
  const hasMore = visibleCount < filteredChats.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleChatClick = (chatId: string) => {
    setActiveThreadId(chatId);
    navigate("/chat");
  };

  const handleDelete = (chatId: string) => {
    deleteThread(chatId);
  };

  const handleRename = (chatId: string, newTitle: string) => {
    renameThread(chatId, newTitle);
  };

  const handleMoveToProject = (chatId: string) => {
    setSelectedChatId(chatId);
    setMoveModalOpen(true);
  };

  const handleConfirmMove = (projectId: string) => {
    if (selectedChatId) {
      moveToProject(selectedChatId, projectId);
      setMoveModalOpen(false);
      setSelectedChatId(null);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Recent Chats
          </h1>
          <p className="text-muted-foreground">
            View and manage your conversation history
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Chat List */}
        {visibleChats.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-1">
              {searchQuery ? "No chats found" : "No chats yet"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Start a new conversation to see it here"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                onClick={() => handleChatClick(chat.id)}
                onDelete={() => handleDelete(chat.id)}
                onRename={(title) => handleRename(chat.id, title)}
                onMoveToProject={() => handleMoveToProject(chat.id)}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        )}

        {/* Move to Project Modal */}
        <MoveToProjectModal
          open={moveModalOpen}
          onOpenChange={setMoveModalOpen}
          onConfirm={handleConfirmMove}
        />
      </div>
    </AppLayout>
  );
}
