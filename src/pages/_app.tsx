import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/providers/WebSocketProvider";
import NotificationBanner from "@/components/NotificationBanner";
import AuthProvider from "@/providers/Auth";
import SingleButtonModal from "@/components/Models/SingleButtonModal";
import { useModalStore } from "@/lib/store";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const modalOpen = useModalStore((state) => state.modalOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WebSocketProvider>
          {modalOpen === "deleteAccount" && (
            <SingleButtonModal
              title="Delete Account"
              description="Are you sure you want to delete your account?"
              buttonText="Delete Account"
              onButtonClick={ () => {
                  alert("Deleting account...");
                  closeModal();
              }}
            />
          )}
          {modalOpen === "deleteConversation" && (
            <SingleButtonModal
              title="Delete Conversation"
              description="Are you sure you want to delete this conversation?"
              buttonText="Delete Conversation"
              onButtonClick={() => {
                alert("Deleting conversation...");
                closeModal();
              }}
            />
          )}
          {modalOpen === "deletePost" && (
            <SingleButtonModal
              title="Delete Post"
              description="Are you sure you want to delete this post?"
              buttonText="Delete Post"
              onButtonClick={() => {
                alert("Deleting post...");
                closeModal();
              }}
            />
          )}
          <Component {...pageProps} />
          <NotificationBanner />
        </WebSocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
