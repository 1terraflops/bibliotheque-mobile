import { queryClient } from "@/api/queryClient";
import { supabase } from "@/api/supabase";
import { useSessionStore } from "@/store/session.store";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  NunitoSans_400Regular,
  NunitoSans_500Medium,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black,
} from "@expo-google-fonts/nunito-sans";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const sessionStore = useSessionStore();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    RobotoMono_400Regular,
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error);
        }

        sessionStore.setSession(data.session ?? null);
      } catch (err) {
        console.error("Unexpected error initializing auth:", err);
        sessionStore.setSession(null);
      } finally {
        sessionStore.setIsHydrated();
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      sessionStore.setSession(session ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionStore]);

  useEffect(() => {
    if (!sessionStore.isHydrated) return;

    if (sessionStore.isAuthenticated) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/landing");
    }
  }, [sessionStore.isHydrated, sessionStore.isAuthenticated]);

  if (!sessionStore.isHydrated || !loaded) return null;

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
