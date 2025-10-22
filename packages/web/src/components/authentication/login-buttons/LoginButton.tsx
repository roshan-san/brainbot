
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from '@tanstack/react-query';
import { authClient } from '../auth-provider';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function LoginButton() {
  const { mutate: googleLogin, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({ provider: "google", callbackURL: import.meta.env.VITE_CLIENT_URL + "/" });
    },
  });

  return (
    <Button
    className={"bg-white border text-black rounded-full"}
    onClick={() => googleLogin()}
    disabled={isPending}
  >
      {isPending ? 
        <Spinner className="h-5 w-5" /> : <FcGoogle className="h-5 w-5" />}
      <span className="text-base">Sign in with Google</span>
  </Button>
  )
}
