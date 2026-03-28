import { getActiveSessionQueryOptions } from "@/api/reading-sessions/get-active-session.query";
import { BookStatus, UserBook } from "@/types/books";
import { SESSION_STATUS } from "@/types/reading-sessions";
import { formatTime, formatTimeWithSeconds } from "@/utils/formatTime";
import { useElapsedTime } from "@/utils/useElapsedTime";
import { useQuery } from "@tanstack/react-query";
import { BookCheck, Clock } from "lucide-react-native";
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
  const { data: session } = useQuery(getActiveSessionQueryOptions());

  const elapsed = useElapsedTime(
    session?.status === SESSION_STATUS.STARTED &&
      session.bookId === book?.book.id
      ? session.startedAt
      : null,
  );

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

  const pagesToGo = Math.max(book.actualPageCount - book.pagesRead, 0);
  const percentsToGo = Math.round(
    (book.pagesRead / book.actualPageCount) * 100,
  );

  return (
    <View className="flex-row gap-x-6">
      <BookCard book={book.book} />

      <View className="gap-y-0.5 flex-1">
        <Typography numberOfLines={1} className="font-inter-600 text-2xl">
          {generalBookInfo?.title}
        </Typography>
        <Typography numberOfLines={1} className="font-inter-500 text-lg">
          {generalBookInfo?.author}
        </Typography>

        {book.status === BookStatus.IN_PROGRESS && book.actualPageCount ? (
          <View className="gap-3 mt-1">
            <View className="items-center gap-3 max-w-[170px]">
              <ProgressBar progress={percentsToGo} />

              {!!book?.actualPageCount && (
                <Typography className="font-inter-500">{`${book.pagesRead} / ${book?.actualPageCount} pages`}</Typography>
              )}
            </View>

            <View className="flex-row gap-2">
              <Button variant="icon" iconLeft={Clock} />
              <Typography className="font-inter-600 text-lg">
                {session?.status === SESSION_STATUS.STARTED &&
                session.bookId === book.book.id
                  ? formatTimeWithSeconds(elapsed)
                  : formatTime(book.spentTime)}
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
          <View className="flex-1 overflow-hidden">
            {!!generalBookInfo?.description && (
              <Typography ellipsizeMode="tail">
                {generalBookInfo?.description}
              </Typography>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
