import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { Text } from "@/components/ui/text";

export default function Modal() {
  const { signOut } = useSupabase();

  return (
    <View className="flex flex-1 items-center justify-center bg-background p-4 gap-y-4">
      <H1 className="text-center">Modal</H1>
      <Muted className="text-center">This is a modal screen.</Muted>
      <Button variant="destructive" onPress={signOut} className="mt-4">
        <Text>Sign Out</Text>
      </Button>
    </View>
  );
}
