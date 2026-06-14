import { getBookByNameQueryOptions } from "@/api/books/get-by-name.query";
import { SearchItem } from "@/components/search";
import { Button, Input, ScreenLayout, Spinner } from "@/components/shared";
import {
  ISearchBookByNameForm,
  ISearchBookByNameFormSchema,
} from "@/types/books/forms";
import { useForm } from "@tanstack/react-form";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon, X } from "lucide-react-native";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Search() {
  const [search, setSearch] = useState("");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery(getBookByNameQueryOptions(search));

  const filteredSearchResults = searchResults?.filter((r) => r.isbn);

  const debouncedSearch = useDebouncedCallback(
    (query: string) => setSearch(query),
    { wait: 650 },
  );

  const form = useForm({
    defaultValues: {
      query: "",
    } satisfies ISearchBookByNameForm,
    validators: {
      onSubmit: ISearchBookByNameFormSchema,
    },
    onSubmit: ({ value }) => {
      debouncedSearch(value.query);
    },
  });

  return (
    <ScreenLayout title="Search">
      <form.Field name="query">
        {(field) => (
          <Input
            icon={SearchIcon}
            button={
              field.state.value.length ? (
                <Button
                  variant="icon"
                  iconLeft={X}
                  onPress={() => {
                    form.reset();
                    setSearch("");
                  }}
                />
              ) : null
            }
            placeholder="Name of the book or author"
            value={field.state.value ?? ""}
            onBlur={field.handleBlur}
            onChangeText={(text) => {
              field.setValue(text);
              setSearch("");
              form.handleSubmit();
            }}
            error={field.state.meta.errors[0]?.message || error?.message}
            showError={
              !!error ||
              (field.state.meta.isDirty &&
                field.state.meta.isBlurred &&
                field.state.meta.errors.length > 0)
            }
            isBlurred={field.state.meta.isBlurred}
          />
        )}
      </form.Field>

      <FlatList
        data={filteredSearchResults}
        keyExtractor={(item) => item.isbn}
        contentContainerClassName="m-2 pb-28"
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => <SearchItem data={item} />}
        ListEmptyComponent={
          isLoading ? (
            <View className="flex-1 items-center justify-center">
              <Spinner />
            </View>
          ) : null
        }
      />
    </ScreenLayout>
  );
}
