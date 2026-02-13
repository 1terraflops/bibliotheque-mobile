import { queryClient } from "@/api/queryClient";
import { supabase } from "@/api/supabase";
import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
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
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

const RootLayoutContent = () => {
  const sessionStore = useSessionStore();

  const { data: user, isLoading } = useQuery({
    ...GetActiveUserQueryOptions(sessionStore.session?.user?.id ?? ""),
    enabled: !!sessionStore.session?.user?.id,
  });

  useEffect(() => {
    if (!sessionStore.isHydrated) return;

    if (!sessionStore.isAuthenticated) {
      router.replace("/(auth)/landing");
      return;
    }

    if (isLoading) return;

    sessionStore.setUser(user || null);

    if (!user?.username) {
      router.replace("/(auth)/onboarding");
      return;
    }

    router.replace("/(tabs)");
  }, [
    sessionStore.isHydrated,
    sessionStore.isAuthenticated,
    isLoading,
    user?.username,
  ]);

  const isCheckingRoute =
    !sessionStore.isHydrated ||
    (sessionStore.isAuthenticated && (isLoading || !user));

  if (isCheckingRoute) {
    return (
      <View className="flex-1 items-center justify-center bg-dark-1">
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
    </Stack>
  );
};

export default function RootLayout() {
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

  if (!sessionStore.isHydrated || !loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutContent />
    </QueryClientProvider>
  );
}
