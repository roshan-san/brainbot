import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="p-6 max-w-md text-center shadow-lg border rounded-2xl">
          <CardHeader className="space-y-2">
            <div className="flex justify-center mb-2">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-semibold text-red-600">
              Something Went Wrong
            </CardTitle>
          </CardHeader>

          <CardContent className="text-muted-foreground leading-relaxed">
            We hit an unexpected error. Don’t worry, you can try refreshing the
            page or go back home.
          </CardContent>

          <CardFooter className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-32"
            >
              Refresh
            </Button>
            <Button onClick={() => navigate({ to: "/" })} className="w-32">
              Go Home
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
