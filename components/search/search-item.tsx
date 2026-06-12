import { Typography } from "@/components/shared";
import { Skeleton } from "moti/skeleton";
import { FC } from "react";
import { Image, View } from "react-native";

type SearchItemObj = {
  title: string;
  author: string;
  coverUrl: string;
  isbn: string;
};

type SearchItemProps = {
  data: SearchItemObj;
};

export const SearchItem: FC<SearchItemProps> = ({ data }) => {
  const { title, author, coverUrl } = data;
  const coverUri = coverUrl?.replace("http://", "https://") ?? null;

  return (
    <View className="flex-row  py-2.5 gap-3">
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
      </View>
    </View>
  );
};
