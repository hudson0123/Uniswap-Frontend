import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/providers/WebSocketProvider";
import AuthProvider from "@/providers/Auth";
import { useModalStore } from "@/lib/store";
import { Toaster } from 'react-hot-toast'
import DestructiveModal from "@/components/Modals/DestructiveModal";
import CreatePostModal from "@/components/Modals/CreatePostModal";
import ViewEventModal from "@/components/Modals/ViewEventModal";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const modalStore = useModalStore()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WebSocketProvider>
          {modalStore.destructive && (
            <DestructiveModal />
          )}
          {modalStore.createPost && (
            <CreatePostModal />
          )}
          {modalStore.viewEvent && (
            <ViewEventModal />
          )}
          <Component {...pageProps} />
        </WebSocketProvider>
      </AuthProvider>
      <Toaster 
        position="bottom-right"
      />
    </QueryClientProvider>
  );
}
