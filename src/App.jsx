import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { UnitProvider } from './contexts/UnitContext';
import PageLayout from './components/layout/PageLayout';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <UnitProvider>
        <PageLayout>
          <AppRoutes />
        </PageLayout>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: '14px',
            },
          }}
        />
      </UnitProvider>
    </BrowserRouter>
  );
}
