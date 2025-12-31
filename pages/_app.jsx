import '../styles/globals.css';
import 'leaflet/dist/leaflet.css';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/Layout';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

const routeToPageName = {
  '/': 'Home',
  '/menu': 'Menu',
  '/contact': 'Contact',
  '/checkout': 'Checkout',
  '/order-confirmation': 'OrderConfirmation',
  '/not-registered': 'UserNotRegisteredError'
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentPageName = routeToPageName[router.pathname] || '';

  return (
    <QueryClientProvider client={queryClient}>
      <Layout currentPageName={currentPageName}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
