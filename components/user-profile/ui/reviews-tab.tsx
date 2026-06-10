import { getReviewsInfiniteQueryOptions } from "@/api/books/get-reviews.query";
import { Button, Spinner, Typography } from "@/components/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react-native";
import { useWindowDimensions, View } from "react-native";
import { ReviewContextMenu } from "./review-context-menu";
import { ReviewItem } from "./review-item";

export const ReviewsTab = () => {
  const { height } = useWindowDimensions();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      getReviewsInfiniteQueryOptions({
        take: 10,
      }),
    );

  const reviews = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <View
        style={{ minHeight: height * 0.6 }}
        className="justify-center items-center gap-2"
      >
        <Spinner />
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View
        style={{ minHeight: height * 0.6 }}
        className="justify-center items-center gap-2"
      >
        <Typography className="text-xl font-inter-600">
          No reviews yet
        </Typography>
        <Typography className="text-xl text-center font-inter-400">
          Books you review will appear here
        </Typography>
      </View>
    );
  }

  return (
    <View className="mt-6 mb-24 gap-8">
      {reviews.map((item) => (
        <ReviewContextMenu key={item.id} id={item.id}>
          <ReviewItem
            review={item.review}
            containsSpoilers={item.hasSpoilers}
            book={item.book}
          />
        </ReviewContextMenu>
      ))}

      {hasNextPage && (
        <Button
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="items-center justify-center flex-row gap-2 py-3"
        >
          {isFetchingNextPage ? (
            <Spinner />
          ) : (
            <>
              <Typography className="text-sm font-inter-400 text-muted-foreground">
                Load more
              </Typography>
              <ChevronDown size={16} className="text-muted-foreground" />
            </>
          )}
        </Button>
      )}
    </View>
  );
};
