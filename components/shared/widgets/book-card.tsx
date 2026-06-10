import { colors } from "@/constants/colors";
import { Book } from "@/types/books";
import { cn } from "@/utils/cn";
import stringToColor from "@/utils/stringToColor";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { Image, useColorScheme, View } from "react-native";
import { Typography } from "../typography";

type BookCardProps = {
  book?: Book;
  cover?: string | null;
  loading?: boolean;
  size?: "small" | "medium";
};

export const BookCard: FC<BookCardProps> = ({
  book,
  cover,
  loading = false,
  size = "medium",
}) => {
  const isLightTheme = useColorScheme() === "light";

  const gradientColors = isLightTheme
    ? [colors["light-2"], colors["light-5"]]
    : [colors["dark-2"], colors["dark-4"]];

  const height = size === "small" ? 160 : 200;
  const width = size === "small" ? 110 : 130;

  if (loading) {
    return (
      <Skeleton
        show={loading}
        radius={8}
        height={height}
        width={width}
        colors={gradientColors}
      />
    );
  }

  if (!cover && !book?.coverUrl) {
    const bgColor = book?.title ? stringToColor(book.title) : "#888";

    return (
      <View
        className={cn(
          "rounded-lg pt-6 px-1 gap-y-1",
          size === "small" && "pt-3",
        )}
        style={{ height, width, backgroundColor: bgColor }}
      >
        <Typography
          numberOfLines={2}
          className="font-inter-600 text-lg text-center text-light-1"
        >
          {book?.title}
        </Typography>
        <Typography
          numberOfLines={2}
          className="font-inter-500 text-center text-light-1"
        >
          {book?.author}
        </Typography>
      </View>
    );
  }

  const toHttps = (url: string) =>
    url.startsWith("http://") ? url.replace("http://", "https://") : url;

  const coverUrl = cover
    ? toHttps(cover)
    : book?.coverUrl
      ? toHttps(book.coverUrl)
      : "";

  return (
    <Image
      src={coverUrl}
      height={height}
      width={width}
      className="rounded-lg"
    />
  );
};
