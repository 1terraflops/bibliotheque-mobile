import { cancelSessionMutationOptions } from "@/api/reading-sessions/cancel-session.mutation";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Tabs, TabsOptions } from "../tabs";
import { Typography } from "../typography";
import { EndSessionForm } from "./ui/end-session-form";

enum END_SESSION_TABS {
  END_SESSION = "END_SESSION",
  CANCEL_SESSION = "CANCEL_SESSION",
}

type EndSessionModalProps = ModalProps<"EndSession">;

export const EndSessionModal: FC<EndSessionModalProps> = ({ modal }) => {
  const { params, closeModal } = modal;
  const [activeTab, setActiveTab] = useState(END_SESSION_TABS.END_SESSION);

  const isLightTheme = useColorScheme() === "light";

  const { mutate: cancelSession } = useMutation(cancelSessionMutationOptions());

  const tabs: TabsOptions[] = [
    { label: "End Session", value: END_SESSION_TABS.END_SESSION },
    { label: "Cancel Session", value: END_SESSION_TABS.CANCEL_SESSION },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className={cn(
          "border w-[340px] rounded-[20px] p-6 pt-5",
          isLightTheme
            ? "bg-light-1 border-light-3"
            : "bg-dark-1 border-dark-3",
        )}
      >
        <Tabs
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={(tab) => setActiveTab(tab as END_SESSION_TABS)}
          size="medium"
        />

        {activeTab === END_SESSION_TABS.END_SESSION && (
          <EndSessionForm isbn={params?.isbn ?? ""} />
        )}

        {activeTab === END_SESSION_TABS.CANCEL_SESSION && (
          <View>
            <Typography className="text-lg mt-3 mb-6">
              Are you sure you want to cancel this session?
            </Typography>

            <Button
              destructive
              title="Yes, Cancel Session"
              onPress={() => {
                cancelSession();
                closeModal();
              }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
