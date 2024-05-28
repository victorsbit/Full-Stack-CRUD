import { NextUIProvider } from '@nextui-org/system';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider className='h-full' navigate={navigate}>
      <Toaster richColors />
      {children}
    </NextUIProvider>
  );
}
