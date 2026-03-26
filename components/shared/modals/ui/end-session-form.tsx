import { endSessionMutationOptions } from "@/api/reading-sessions/end-session.mutation";
import { getActiveSessionQueryOptions } from "@/api/reading-sessions/get-active-session.query";
import {
  IEndSessionForm,
  IEndSessionFormSchema,
} from "@/types/reading-sessions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FC } from "react";
import { View } from "react-native";
import { useModal } from "react-native-modalfy";
import { Button } from "../../button";
import { Input } from "../../input";
import { Typography } from "../../typography";

type EndSessionFormProps = {
  isbn: string;
};

export const EndSessionForm: FC<EndSessionFormProps> = ({ isbn }) => {
  const closeModal = useModal().closeModal;

  const { data: session } = useQuery(getActiveSessionQueryOptions());
  const { mutate: endSession, isPending } = useMutation(
    endSessionMutationOptions(),
  );

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
      if (!isbn) return;

      const { startedAt, finishedAt, startPage, endPage } = value;

      endSession({
        isbn,
        startedAt,
        finishedAt,
        startPage,
        endPage,
      });
      closeModal("EndSession");
    },
  });

  return (
    <View className="mt-4">
      <View className="flex flex-row gap-2">
        <View className="flex-1">
          <form.Field name="startPage">
            {(field) => (
              <Input
                label="Start Page"
                returnKeyType="done"
                keyboardType="number-pad"
                value={field.state.value === 0 ? "" : String(field.state.value)}
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
                value={field.state.value === 0 ? "" : String(field.state.value)}
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
  );
};
