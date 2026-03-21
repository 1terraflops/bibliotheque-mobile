import { Button, Spinner } from "@/components/shared";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { Flashlight, FlashlightOff, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

export default function ScanISBN() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
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

  const toggleTorch = () => {
    setTorch((prev) => !prev);
  };

  return (
    <View className="relative flex-1">
      <CameraView
        zoom={0.1}
        style={{ flex: 1 }}
        enableTorch={torch}
        barcodeScannerSettings={{ barcodeTypes: ["ean8", "ean13"] }}
        onBarcodeScanned={({ data }) => {
          if (scanned.current) return;
          scanned.current = true;

          router.dismiss(2);
          router.push({
            pathname: "/(modals)/add-book",
            params: { isbn: data },
          });
        }}
      />
      <View className="flex flex-row gap-3 item-center absolute top-16 right-6">
        <Button
          variant="icon"
          iconLeft={torch ? Flashlight : FlashlightOff}
          className="bg-black/50 rounded-full p-3"
          onPress={toggleTorch}
        />
        <Button
          variant="icon"
          iconLeft={X}
          className="bg-black/50 rounded-full p-3"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}
