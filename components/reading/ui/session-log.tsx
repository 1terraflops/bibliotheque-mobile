import { Indicator, Typography } from "@/components/shared";
import { ActivityRingsChart } from "@/components/shared/charts";
import { colors } from "@/constants/colors";
import { ReadingSession } from "@/types/reading-sessions";
import { formatTimeLong } from "@/utils/formatTime";
import moment from "moment";
import { FC } from "react";
import { View } from "react-native";

type SessionLogProps = {
  session: ReadingSession;
  highestPagesRead: number;
  longestSession: number;
  fastestSpeed: number;
};

export const SessionLog: FC<SessionLogProps> = ({
  session,
  highestPagesRead,
  longestSession,
  fastestSpeed,
}) => {
  const normalize = (value: number | undefined, max: number) =>
    (value ?? 0) / max;

  const ringsData = [
    {
      progress: normalize(session.pagesRead ?? 0, highestPagesRead),
      color: colors.pages,
    },
    {
      progress: normalize(session.duration ?? 0, longestSession),
      color: colors.duration,
    },
    {
      progress: normalize(session.readingSpeed ?? 0, fastestSpeed),
      color: colors.speed,
    },
  ];

  return (
    <View className="mt-4 flex flex-row justify-between items-center">
      <View>
        <Typography className="text-xl font-inter-600">
          {moment(session.startedAt).format("HH:mm")} -{" "}
          {moment(session.finishedAt).format("HH:mm")}
        </Typography>

        <View className="flex flex-row items-center gap-2 mt-1">
          <View className="h-2.5 w-2.5 rounded-full bg-pages" />
          <Typography className="text-lg leading-normal">
            {session.pagesRead} {session.pagesRead === 1 ? "page" : "pages"}
          </Typography>
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-duration" />
          <Typography className="text-lg leading-normal">
            {formatTimeLong(session.duration ?? 0)}
          </Typography>
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-speed" />
          <Typography className="text-lg leading-normal">
            {session.readingSpeed} pages / hr
          </Typography>
        </View>
      </View>

      <View className="flex flex-row items-center gap-1.5">
        <ActivityRingsChart
          size={36}
          strokeWidth={4}
          gap={1.5}
          rings={ringsData}
        />
        {session.improvedFromPrevious !== undefined && (
          <Indicator positive={session.improvedFromPrevious} />
        )}
      </View>
    </View>
  );
};
