import { Button } from "src/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { authClient } from "../auth-provider";

export default function LogoutButton() {
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
  });
  
  return (
    <Button variant={"destructive"} disabled={isPending} onClick={() => signOut()}>
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Out"}
    </Button>
  )
}