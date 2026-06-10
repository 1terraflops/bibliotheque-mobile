import { ScreenLayout, Tabs, TabsOptions } from "@/components/shared";
import { StatsTab, UserInfo } from "@/components/user-profile";
import { ReviewsTab } from "@/components/user-profile/ui/reviews-tab";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";

enum PROFILE_TABS {
  STATS = "STATS",
  REVIEWS = "REVIEWS",
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState(PROFILE_TABS.STATS);
  const isLightTheme = useColorScheme() === "light";

  const tabs: TabsOptions[] = [
    { value: PROFILE_TABS.STATS, label: "Stats" },
    { value: PROFILE_TABS.REVIEWS, label: "Reviews" },
  ];

  return (
    <ScreenLayout>
      <UserInfo />

      <ScrollView
        className={cn(
          "w-full flex-1 my-4 rounded-[32px] px-6 py-5",
          isLightTheme ? "bg-light-2" : "bg-dark-2",
        )}
      >
        <Tabs
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as PROFILE_TABS)}
        />

        {activeTab === PROFILE_TABS.STATS && <StatsTab />}
        {activeTab === PROFILE_TABS.REVIEWS && <ReviewsTab />}
      </ScrollView>
    </ScreenLayout>
  );
}
