import { getUserBookQueryOptions } from "@/api/books/get-user-book.query";
import { getActiveSessionQueryOptions } from "@/api/reading-sessions/get-active-session.query";
import { startSessionMutationOptions } from "@/api/reading-sessions/start-session.mutation";
import { SessionView, StatsView } from "@/components/reading";
import { Button, ScreenLayout, Tabs, TabsOptions } from "@/components/shared";
import { ExpandedBookCard } from "@/components/shared/widgets";
import { SESSION_STATUS } from "@/types/reading-sessions";
import { cn } from "@/utils/cn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Play, StopCircle } from "lucide-react-native";
import { useState } from "react";
import { useColorScheme, View } from "react-native";
import { useModal } from "react-native-modalfy";

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
  const { openModal } = useModal();

  const { data: session, isLoading: isSessionLoading } = useQuery(
    getActiveSessionQueryOptions(),
  );
  const { data: book, isLoading: isBookLoading } = useQuery(
    getUserBookQueryOptions(isbn),
  );

  const { mutate: startSession, error } = useMutation(
    startSessionMutationOptions(),
  );

  const tabs: TabsOptions[] = [
    { value: READING_SESSIONS_TABS.SESSIONS, label: "Sessions" },
    { value: READING_SESSIONS_TABS.STATS, label: "Stats" },
  ];

  const handleToggleSession = () => {
    if (!book) return;

    if (!session && !book?.actualPageCount) {
      openModal("EnterNumberOfPages", { book });
      return;
    }

    if (!session) {
      startSession({
        isbn: isbn.isbn,
        bookId: book.book.id,
        startPage: book.pagesRead > 0 ? book.pagesRead : 1,
      });
      return;
    }

    openModal("EndSession", { isbn: book.book.isbn });
  };

  return (
    <ScreenLayout backButton>
      <View className="flex-1 gap-6 mt-4 px-2">
        <View className="relative">
          <ExpandedBookCard book={book!} loading={isBookLoading} />
          {(!session || session.bookId === book?.book.id) &&
            !isBookLoading &&
            !isSessionLoading && (
              <View className="absolute -bottom-2 left-[106px]">
                <Button
                  variant="icon-filled"
                  iconLeft={
                    session?.status === SESSION_STATUS.STARTED
                      ? StopCircle
                      : Play
                  }
                  iconSize={24}
                  onPress={handleToggleSession}
                />
              </View>
            )}
        </View>

        <View
          className={cn(
            "w-full flex-1 mb-7 rounded-3xl px-6 py-5",
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
