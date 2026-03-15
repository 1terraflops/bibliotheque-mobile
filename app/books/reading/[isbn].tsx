import { getUserBookQueryOptions } from "@/api/books/get-user-book.query";
import { Button, ScreenLayout } from "@/components/shared";
import { ExpandedBookCard } from "@/components/shared/widgets";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Play } from "lucide-react-native";
import { View } from "react-native";

type ReadingParams = {
  isbn: string;
};

export default function Reading() {
  const isbn = useLocalSearchParams<ReadingParams>();

  const { data: book, isLoading } = useQuery(getUserBookQueryOptions(isbn));

  return (
    <ScreenLayout backButton scrollable>
      <View className="gap-6 mt-4 px-2">
        <ExpandedBookCard book={book!} loading={isLoading} />
        <Button title="Start Reading" iconLeft={Play} />

        <View className="bg-dark-2 w-full min-h-[420px] rounded-3xl p-6">
          {/* <Typography className="text-4xl font-inter-700">History</Typography> */}
        </View>
      </View>
    </ScreenLayout>
  );
}
