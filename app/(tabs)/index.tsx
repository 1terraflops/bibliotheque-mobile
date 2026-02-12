import { supabase } from "@/api/supabase";
import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import { Button } from "@/components/shared";
import { useSessionStore } from "@/store/session.store";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Text, useColorScheme, View } from "react-native";

export default function Index() {
  const isLightTheme = useColorScheme() === "light";

  const id = useSessionStore().session?.user.id!;
  const { data: user, isLoading } = useQuery(GetActiveUserQueryOptions(id));
  const setUser = useSessionStore().setUser;

  useEffect(() => {
    if (!isLoading && user) {
      setUser(user);
    }
  }, [user, setUser, isLoading]);

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-dark-2",
        isLightTheme && "bg-light-1",
      )}
    >
      <Text>Welcome Home!</Text>
      <Button
        title="Logout"
        variant="text"
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
}
