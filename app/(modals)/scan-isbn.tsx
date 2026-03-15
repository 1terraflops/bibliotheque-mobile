import { Spinner } from "@/components/shared";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Pressable, View } from "react-native";

export default function ScanISBN() {
  const [permission, requestPermission] = useCameraPermissions();
  const scanned = useRef(false);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  if (!permission.granted) {
    router.back();
  }

  return (
    <View className="relative flex-1">
      <CameraView
        zoom={0.1}
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        onBarcodeScanned={({ data }) => {
          if (scanned.current) return;
          scanned.current = true;
          router.replace({
            pathname: "/(modals)/add-book",
            params: { isbn: data },
          });
        }}
      />
      <Pressable
        onPress={() => router.back()}
        className="absolute top-14 right-6 bg-black/50 rounded-full p-2"
      >
        <X color="white" size={24} />
      </Pressable>
    </View>
  );
}
