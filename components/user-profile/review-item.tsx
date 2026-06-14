import { Typography } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets/book-card";
import { Book } from "@/types/books";
import { FC } from "react";
import { View } from "react-native";

type ReviewItemProps = {
  review: string;
  containsSpoilers: boolean;
  book: Book;
};

export const ReviewItem: FC<ReviewItemProps> = ({ review, book }) => {
  return (
    <View className="flex-row gap-4 items-start">
      <BookCard book={book} size="small" />
      <View className="flex-1">
        <Typography numberOfLines={1} className="font-inter-600 text-xl">
          {book?.title}
        </Typography>
        <Typography numberOfLines={1} className="font-inter-500 text-lg">
          {book?.author}
        </Typography>

        <Typography className="mt-2">{review}</Typography>
      </View>
    </View>
  );
};
