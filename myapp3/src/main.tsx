import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { AppRouter } from './AppRouter.tsx';
import { Provider } from 'react-redux';
import { UIProvider } from './context/ui/UIProvider.tsx';
import { BrowserRouter } from 'react-router';
import { store } from './store/store.ts';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient(); // Crear una instancia compartida

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
  // <>
  //   <Provider store={store}>
  //     <UIProvider>
  //       <BrowserRouter>
  //         <AppRouter />
  //       </BrowserRouter>
  //     </UIProvider>
  //     <Toaster />
  //   </Provider>
  // </>
)