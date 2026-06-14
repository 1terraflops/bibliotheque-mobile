import { Typography } from "@/components/shared";
import { Review } from "@/types/reviews";
import moment from "moment";
import { FC } from "react";
import { View } from "react-native";

export const ReviewItem: FC<Review> = ({
  review,
  author,
  createdAt,
  hasSpoilers,
}) => {
  const formattedDate = moment(createdAt).format("DD MMM YYYY");

  return (
    <View className="w-80 py-4 px-4 gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
      <View className="flex-row items-center justify-between">
        <Typography className="text-sm font-semibold">{author}</Typography>

        <Typography className="text-xs text-neutral-400">
          {formattedDate}
        </Typography>
      </View>

      {hasSpoilers && (
        <View className="self-start bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded">
          <Typography className="text-xs text-amber-700 dark:text-amber-400">
            Contains spoilers
          </Typography>
        </View>
      )}

      <Typography className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        {review}
      </Typography>
    </View>
  );
};
