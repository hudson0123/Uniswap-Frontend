import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebSocketProvider from "@/providers/WebSocketProvider";
import NotificationBanner from "@/components/NotificationBanner";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <Component {...pageProps} />
        <NotificationBanner />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}
