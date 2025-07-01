import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/providers/WebSocketProvider";
import NotificationBanner from "@/components/NotificationBanner";
import AuthProvider from "@/providers/Auth";
import SingleButtonModal from "@/components/Models/SingleButtonModal";
import { useModalStore } from "@/lib/store";
import api from "@/lib/api";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const modalOpen = useModalStore((state) => state.modalOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/api/users/" + currentUserData?.id + "/");
      resetAuth();
      router.push("/auth/login");
      return null;
    } catch {
      setNotification("error", "Unable to Delete Account.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WebSocketProvider>
          {modalOpen === "deleteAccount" && (
            <SingleButtonModal
              title="Confirm Action"
              description="Are you sure you want to proceed?"
              buttonText="Close"
              onButtonClick={closeModal}
            />
          )}
          <Component {...pageProps} />
          <NotificationBanner />
        </WebSocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
