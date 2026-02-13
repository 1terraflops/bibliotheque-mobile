import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const pickImage = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    Alert.alert(
      "Permission required",
      "Permission to access the media library is required.",
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};

export default pickImage;
