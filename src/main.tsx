import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppErrorBoundary } from './components/ErrorBoundary.tsx';
import { FirebaseProvider } from './context/FirebaseContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <ThemeProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ThemeProvider>
  </AppErrorBoundary>
);
