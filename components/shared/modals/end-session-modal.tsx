import { cancelSessionMutationOptions } from "@/api/reading-sessions/cancel-session.mutation";
import { endSessionMutationOptions } from "@/api/reading-sessions/end-session.mutation";
import { getActiveSessionQueryOptions } from "@/api/reading-sessions/get-active-session.query";
import {
  IEndSessionForm,
  IEndSessionFormSchema,
} from "@/types/reading-sessions";
import { cn } from "@/utils/cn";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FC, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Input } from "../input";
import { Tabs, TabsOptions } from "../tabs";
import { Typography } from "../typography";

enum END_SESSION_TABS {
  END_SESSION = "END_SESSION",
  CANCEL_SESSION = "CANCEL_SESSION",
}

type EndSessionModalProps = ModalProps<"EndSession">;

export const EndSessionModal: FC<EndSessionModalProps> = ({ modal }) => {
  const { params, closeModal } = modal;
  const [activeTab, setActiveTab] = useState(END_SESSION_TABS.END_SESSION);

  const isLightTheme = useColorScheme() === "light";

  const { data: session } = useQuery(getActiveSessionQueryOptions());

  const { mutate: endSession, isPending } = useMutation(
    endSessionMutationOptions(),
  );
  const { mutate: cancelSession } = useMutation(cancelSessionMutationOptions());

  const form = useForm({
    defaultValues: {
      startPage: session?.startPage ?? 1,
      endPage: 0,
      startedAt: session?.startedAt ?? moment().toISOString(),
      finishedAt: moment().toISOString(),
    } satisfies IEndSessionForm,
    validators: {
      onChange: IEndSessionFormSchema,
    },
    onSubmit: ({ value }) => {
      if (!params?.isbn) return;

      const { startedAt, finishedAt, startPage, endPage } = value;

      endSession({
        isbn: params.isbn,
        startedAt,
        finishedAt,
        startPage,
        endPage,
      });
      closeModal();
    },
  });

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
          <View className="mt-4">
            <View className="flex flex-row gap-2">
              <View className="flex-1">
                <form.Field name="startPage">
                  {(field) => (
                    <Input
                      label="Start Page"
                      returnKeyType="done"
                      keyboardType="number-pad"
                      value={
                        field.state.value === 0 ? "" : String(field.state.value)
                      }
                      onBlur={field.handleBlur}
                      onChangeText={(text) =>
                        field.setValue(text === "" ? 0 : Number(text))
                      }
                      error={field.state.meta.errors[0]?.message}
                      showError={
                        field.state.meta.isDirty &&
                        field.state.meta.isBlurred &&
                        field.state.meta.errors.length > 0
                      }
                      isBlurred={field.state.meta.isBlurred}
                    />
                  )}
                </form.Field>
              </View>

              <View className="flex-1">
                <form.Field name="endPage">
                  {(field) => (
                    <Input
                      autoFocus
                      label="End Page"
                      returnKeyType="done"
                      keyboardType="number-pad"
                      value={
                        field.state.value === 0 ? "" : String(field.state.value)
                      }
                      onBlur={field.handleBlur}
                      onChangeText={(text) =>
                        field.setValue(text === "" ? 0 : Number(text))
                      }
                      error={field.state.meta.errors[0]?.message}
                      showError={
                        field.state.meta.isDirty &&
                        field.state.meta.isBlurred &&
                        field.state.meta.errors.length > 0
                      }
                      isBlurred={field.state.meta.isBlurred}
                    />
                  )}
                </form.Field>
              </View>
            </View>

            <form.Field name="finishedAt">
              {(field) => (
                <View className="items-center">
                  <Typography className="font-roboto-mono text-lg">
                    Ended At
                  </Typography>
                  <DateTimePicker
                    minimumDate={new Date(session?.startedAt ?? "")}
                    maximumDate={new Date(moment().toISOString())}
                    value={new Date(field.state.value)}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    onChange={(_: unknown, date?: Date) => {
                      if (date) field.setValue(date.toISOString());
                    }}
                  />
                </View>
              )}
            </form.Field>

            <View className="flex-row gap-4 mt-6">
              <Button
                title="End Session"
                className="flex-1"
                loading={isPending}
                onPress={() => form.handleSubmit()}
              />
            </View>
          </View>
        )}

        {activeTab === END_SESSION_TABS.CANCEL_SESSION && (
          <View>
            <Typography className="text-lg my-4">
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
