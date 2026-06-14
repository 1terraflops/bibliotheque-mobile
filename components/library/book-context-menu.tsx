import { updateBookMutationOptions } from "@/api/books/update-book.mutation";
import { BookStatus, UserBook } from "@/types/books";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { useModal } from "react-native-modalfy";
import * as ContextMenu from "zeego/context-menu";

type BookContextMenuProps = {
  children: ReactNode;
  book: UserBook;
};

export const BookContextMenu: FC<BookContextMenuProps> = ({
  children,
  book,
}) => {
  const { isFavorite, status } = book;

  const { openModal } = useModal();

  const { mutate: updateBook } = useMutation(updateBookMutationOptions());

  const STATUS_CONFIG: Record<BookStatus, { label: string; icon: string }> = {
    [BookStatus.IN_PROGRESS]: { label: "In Progress", icon: "book.fill" },
    [BookStatus.NOT_STARTED]: { label: "Not Started", icon: "bookmark" },
    [BookStatus.COMPLETED]: { label: "Completed", icon: "checkmark.circle" },
    [BookStatus.DROPPED]: { label: "Dropped", icon: "xmark.circle" },
  };

  const confirmDelete = () => openModal("ConfirmDeleteBook", { book });

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger key="status">
            <ContextMenu.ItemTitle>Change Status</ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "book",
              }}
            />
          </ContextMenu.SubTrigger>

          <ContextMenu.SubContent>
            {Object.entries(STATUS_CONFIG).map(([value, { label, icon }]) => (
              <ContextMenu.Item
                key={value}
                onSelect={() =>
                  updateBook({
                    isbn: book.book.isbn,
                    status: value as BookStatus,
                  })
                }
              >
                <ContextMenu.ItemTitle>{label}</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: status === value ? "checkmark" : icon,
                  }}
                />
              </ContextMenu.Item>
            ))}
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Item
          key="favorites"
          onSelect={() =>
            updateBook({
              isbn: book.book.isbn,
              isFavorite: !isFavorite,
            })
          }
        >
          <ContextMenu.ItemTitle>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: isFavorite ? "star.fill" : "star",
            }}
          />
        </ContextMenu.Item>

        <ContextMenu.Item destructive key="delete" onSelect={confirmDelete}>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: "trash.fill",
            }}
          />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
