import useVerificationEmailStore from '@/store/verification-email-store';
import { useEffect } from 'react';

export function useResetEmailSendStatus() {
  const actions = useVerificationEmailStore((state) => state.actions);
  useEffect(() => {
    return () => {
      actions.resetIsSendToVerifyEmail();
    };
  }, []);
}
