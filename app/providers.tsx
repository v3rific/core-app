"use client";

import { useMemo } from "react";
import { WagmiProvider, cookieStorage, createStorage, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable.");
  }

  const config = useMemo(
    () =>
      getDefaultConfig({
        appName: "V3rific",
        projectId,
        chains: [sepolia],
        ssr: true,
        storage: createStorage({
          storage: cookieStorage,
        }),
        transports: {
          [sepolia.id]: http(),
        },
      }),
    [projectId]
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
