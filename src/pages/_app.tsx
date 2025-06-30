import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/providers/WebSocketProvider";
import NotificationBanner from "@/components/NotificationBanner";
import AuthProvider from "@/providers/Auth";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <WebSocketProvider>
        <Component {...pageProps} />
        <NotificationBanner />
      </WebSocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
