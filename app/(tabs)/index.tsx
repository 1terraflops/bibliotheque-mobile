import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Loader } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

export default function Index() {
  const isLightTheme = useColorScheme() === "light";
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await SecureStore.getItemAsync("access_token");
      const refreshToken = await SecureStore.getItemAsync("refresh_token");

      if (!accessToken && !refreshToken) {
        router.replace("/(auth)/login");
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["books"],
  //   queryFn: async () => {
  //     const res = await api.get("books");
  //     return res.data;
  //   },
  // });

  // if (isLoading) return <Loader />;

  // console.log(data);

  if (loading) {
    return <Loader />;
  }

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-darker",
        isLightTheme && "bg-light"
      )}
    >
      <Text>Welcome Home!</Text>
    </View>
  );
}
