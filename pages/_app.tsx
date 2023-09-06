import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {QueryClient} from "@tanstack/query-core";
import {useState} from "react";
import {QueryClientProvider} from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
