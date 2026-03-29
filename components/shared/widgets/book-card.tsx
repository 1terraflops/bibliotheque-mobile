import { colors } from "@/constants/colors";
import { Book } from "@/types/books";
import stringToColor from "@/utils/stringToColor";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { Image, useColorScheme, View } from "react-native";
import { Typography } from "../typography";

type BookCardProps = {
  book?: Book;
  cover?: string | null;
  loading?: boolean;
};

export const BookCard: FC<BookCardProps> = ({
  book,
  cover,
  loading = false,
}) => {
  const isLightTheme = useColorScheme() === "light";

  const gradientColors = isLightTheme
    ? [colors["light-2"], colors["light-5"]]
    : [colors["dark-2"], colors["dark-4"]];

  if (loading) {
    return (
      <Skeleton
        show={loading}
        radius={8}
        height={200}
        width={130}
        colors={gradientColors}
      />
    );
  }

  if (!cover && !book?.coverUrl) {
    const bgColor = book?.title ? stringToColor(book.title) : "#888";

    return (
      <View
        className="h-[200px] w-[130px] rounded-lg pt-6 px-1 gap-y-1"
        style={{ backgroundColor: bgColor }}
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

  let coverUrl = book?.coverUrl;

  if (book?.coverUrl) {
    coverUrl = coverUrl?.replace("http://", "https://");
  }

  return (
    <Image
      src={cover ?? coverUrl}
      height={200}
      width={130}
      className="rounded-lg"
    />
  );
};
