import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CurrentLocation() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLocationLoading, setIsLocationLoading] = useState(false);

  return (
    <Button
      isLoading={isLocationLoading}
      onClick={() => {
        setIsLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            router.push(`/weather/${latitude}/${longitude}`);
          },
          (error) => {
            setIsLocationLoading(false);
            console.error(error);
            toast({
              title: "Error getting current location",
              description: error.message,
              variant: "destructive",
            });
          }
        );
      }}
    >
      My current location
    </Button>
  );
}
