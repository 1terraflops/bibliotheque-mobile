import { queryClient } from "@/api/queryClient";
import { supabase } from "@/api/supabase";
import { useSessionStore } from "@/store/session.store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const sessionStore = useSessionStore();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      }

      sessionStore.setSession(data.session ?? null);
      sessionStore.setIsHydrated();
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      sessionStore.setSession(session ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!sessionStore.isHydrated) return;

    if (sessionStore.isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/login");
    }
  }, [sessionStore.isHydrated, sessionStore.isAuthenticated]);

  if (!sessionStore.isHydrated) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {sessionStore.isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, animation: "none" }}
          />
        )}
      </Stack>
    </QueryClientProvider>
  );
}
