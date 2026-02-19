import { Input, Typography } from "@/components/shared";
import { BookISBN } from "@/components/shared/assets";
import { View } from "react-native";

export default function AddBook() {
  return (
    <View className="items-center px-8 py-2">
      <Input placeholder="ISBN" keyboardType="numeric" returnKeyType="search" />

      <View className="items-center mt-2 gap-y-6">
        <Typography className="text-center text-lg leading-6">
          {
            "ISBN is a 10 or 13-digit code located near your book’s barcode. It serves as a unique identifier for each book edition. Enter the ISBN into the text field to quickly add your book."
          }
        </Typography>

        <BookISBN />
      </View>
    </View>
  );
}
