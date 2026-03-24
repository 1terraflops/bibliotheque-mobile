import { getUserBookQueryOptions } from "@/api/books/get-user-book.query";
import { SessionView, StatsView } from "@/components/reading";
import { Button, ScreenLayout, Tabs, TabsOptions } from "@/components/shared";
import { ExpandedBookCard } from "@/components/shared/widgets";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Play } from "lucide-react-native";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

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
  const isLightTheme = useColorScheme() === "light";

  const { data: book, isLoading } = useQuery(getUserBookQueryOptions(isbn));

  const tabs: TabsOptions[] = [
    { value: READING_SESSIONS_TABS.SESSIONS, label: "Sessions" },
    { value: READING_SESSIONS_TABS.STATS, label: "Stats" },
  ];

  return (
    <ScreenLayout backButton>
      <View className="gap-6 mt-4 px-2">
        <ExpandedBookCard book={book!} loading={isLoading} />
        <Button title="Start Reading" iconLeft={Play} />

        <View
          className={cn(
            "w-full min-h-[420px] rounded-3xl px-6 py-5",
            isLightTheme ? "bg-light-2" : "bg-dark-2",
          )}
        >
          <Tabs
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={(tabId) =>
              setActiveTab(tabId as READING_SESSIONS_TABS)
            }
          />

          {activeTab === READING_SESSIONS_TABS.SESSIONS && (
            <SessionView isbn={book?.book.isbn ?? ""} />
          )}
          {activeTab === READING_SESSIONS_TABS.STATS && <StatsView />}
        </View>
      </View>
    </ScreenLayout>
  );
}
