import { UserBook } from "@/types/books";
import { formatTime } from "@/utils/formatTime";
import { Book, BookCheck, Clock } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { View } from "react-native";
import { Button } from "../button";
import { ProgressBar } from "../progress-bar";
import { Typography } from "../typography";
import { BookCard } from "./book-card";

type ExpandedBookCardProps = {
  book: UserBook;
  loading?: boolean;
};

export const ExpandedBookCard: FC<ExpandedBookCardProps> = ({
  book,
  loading = false,
}) => {
  if (loading) {
    return (
      <View className="flex-row w-full gap-2 items-start">
        <BookCard loading />

        <View className="gap-2">
          <Typography skeleton />
          <Typography skeleton />

          <Skeleton radius={8} height={130} width={200} />
        </View>
      </View>
    );
  }

  const generalBookInfo = book.book;

  const pagesToGo = Math.max(generalBookInfo.pageCount - book.pagesRead, 0);
  const percentsToGo = Math.round(
    (book.pagesRead / generalBookInfo.pageCount) * 100,
  );

  return (
    <View className="flex-row gap-x-6">
      <BookCard book={book.book} />

      <View className="gap-y-0.5 w-full">
        <Typography numberOfLines={1} className="font-inter-600 text-2xl">
          {generalBookInfo?.title}
        </Typography>
        <Typography numberOfLines={1} className="font-inter-500 text-lg">
          {generalBookInfo?.author}
        </Typography>

        {percentsToGo > 0 ? (
          <View className="gap-4 mt-1">
            <View className="items-center gap-3 max-w-[170px]">
              <ProgressBar progress={percentsToGo} />

              {!!generalBookInfo?.pageCount && (
                <Typography className="font-inter-500">{`${book.pagesRead} / ${generalBookInfo?.pageCount} pages`}</Typography>
              )}
            </View>

            <View className="flex-row gap-2">
              <Button variant="icon" iconLeft={Clock} />
              <Typography className="font-inter-600 text-lg">
                {formatTime(book.spentTime)}
              </Typography>
            </View>

            <View className="flex-row gap-2">
              <Button variant="icon" iconLeft={BookCheck} />
              <Typography className="font-inter-600 text-lg">
                {pagesToGo} pages ({formatTime(book.estimatedTime || 0)})
              </Typography>
            </View>
          </View>
        ) : (
          <View className="gap-y-2">
            {!!generalBookInfo?.description && (
              <Typography numberOfLines={5} className="max-w-[200px]">
                {generalBookInfo?.description}
              </Typography>
            )}

            {!!generalBookInfo?.pageCount && (
              <View className="flex-row gap-2 items-center mt-5">
                <Button variant="icon" iconLeft={Book} />

                <Typography className=" font-inter-500">{`${generalBookInfo?.pageCount} pages`}</Typography>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
