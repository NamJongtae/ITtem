import useSignupStore from '@/store/signup-store';
import { useEffect } from 'react';

export function useResetEmailSendStatus() {
  const actions = useSignupStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.resetIsSendToVerifyEmail();
    };
  }, []);
}
