import { Typography } from "@/components/shared";
import { formatTimeLong } from "@/utils/formatTime";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { Image, View } from "react-native";

type ReadingHistoryItemProps = {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  duration: number;
  pagesRead: number;
};

export const ReadingHistoryItem: FC<ReadingHistoryItemProps> = ({
  cover,
  title,
  author,
  pagesRead,
  duration,
}) => {
  const formattedDuration = formatTimeLong(duration);
  const coverUri = cover?.replace("http://", "https://") ?? null;

  return (
    <View className="flex-row items-center py-2.5 gap-3">
      {coverUri ? (
        <Image src={coverUri} width={44} height={60} className="rounded" />
      ) : (
        <Skeleton show width={44} height={60} radius={4} />
      )}
      <View className="flex-1 gap-0.5">
        <Typography className="text-base font-semibold" numberOfLines={1}>
          {title}
        </Typography>
        <Typography className="text-sm text-neutral-500" numberOfLines={1}>
          {author}
        </Typography>
        <View className="flex-row items-center gap-1 mt-0.5">
          <Typography className="text-xs text-neutral-400">
            {formattedDuration}
          </Typography>
          <Typography className="text-xs text-neutral-300">|</Typography>
          <Typography className="text-xs text-neutral-400">
            {pagesRead} pages
          </Typography>
        </View>
      </View>
    </View>
  );
};
