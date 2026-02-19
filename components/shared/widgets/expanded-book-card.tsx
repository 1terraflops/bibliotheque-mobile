import { Book } from "@/types/books";
import { FC } from "react";
import { View } from "react-native";
import { Typography } from "../typography";
import { BookCard } from "./book-card";

type ExpandedBookCardProps = {
  book: Book;
  loading?: boolean;
};

export const ExpandedBookCard: FC<ExpandedBookCardProps> = ({
  book,
  loading = false,
}) => {
  return (
    <View className="flex-row gap-x-4">
      <BookCard book={book} loading={loading} />

      <View className="gap-y-2">
        <Typography className="font-inter-600 text-xl">
          {book?.title}
        </Typography>
        <Typography className="font-inter-500 text-lg">
          {book?.author}
        </Typography>

        {book?.description && (
          <Typography numberOfLines={5} className="w-[200px]">
            {book?.description}
          </Typography>
        )}
        {!!book?.pageCount && (
          <Typography className="mt-3">{`${book.pageCount} pages`}</Typography>
        )}
      </View>
    </View>
  );
};
