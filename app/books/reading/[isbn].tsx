import { getUserBookQueryOptions } from "@/api/books/get-user-book.query";
import { SessionView, StatsView } from "@/components/reading";
import { Button, ScreenLayout, Tabs, TabsOptions } from "@/components/shared";
import { ExpandedBookCard } from "@/components/shared/widgets";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Play } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

type ReadingParams = {
  isbn: string;
};

enum READING_SESSIONS_TABS {
  SESSIONS = "SESSIONS",
  STATS = "STATS",
}

export default function Reading() {
  const isbn = useLocalSearchParams<ReadingParams>();
  const [activeTab, setActiveTab] = useState(READING_SESSIONS_TABS.SESSIONS);

  const {
    data: book,
    isLoading,
    refetch,
  } = useQuery(getUserBookQueryOptions(isbn));

  const tabs: TabsOptions[] = [
    { value: READING_SESSIONS_TABS.SESSIONS, label: "Sessions" },
    { value: READING_SESSIONS_TABS.STATS, label: "Stats" },
  ];

  return (
    <ScreenLayout
      backButton
      scrollable
      isRefreshing={isLoading}
      refresh={refetch}
    >
      <View className="gap-6 mt-4 px-2">
        <ExpandedBookCard book={book!} loading={isLoading} />
        <Button title="Start Reading" iconLeft={Play} />

        <View className="bg-dark-2 w-full min-h-[420px] rounded-3xl px-6 py-5">
          <Tabs
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={(tabId) =>
              setActiveTab(tabId as READING_SESSIONS_TABS)
            }
          />

          {activeTab === READING_SESSIONS_TABS.SESSIONS && <SessionView />}
          {activeTab === READING_SESSIONS_TABS.STATS && <StatsView />}
          {/* <Typography className="text-4xl font-inter-700">History</Typography> */}
        </View>
      </View>
    </ScreenLayout>
  );
}
