import { updateBookMutationOptions } from "@/api/books/update-book.mutation";
import { BookStatus, UserBook } from "@/types/books";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import { useModal } from "react-native-modalfy";
import * as DropdownMenu from "zeego/dropdown-menu";

type BookDropdownMenuProps = {
  children: ReactNode;
  book: UserBook;
};

export const BookDropdownMenu: FC<BookDropdownMenuProps> = ({
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger key="status">
            <DropdownMenu.ItemTitle>Change Status</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "book",
              }}
            />
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            {Object.entries(STATUS_CONFIG).map(([value, { label, icon }]) => (
              <DropdownMenu.Item
                key={value}
                onSelect={() =>
                  updateBook({
                    isbn: book.book.isbn,
                    status: value as BookStatus,
                  })
                }
              >
                <DropdownMenu.ItemTitle>{label}</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: status === value ? "checkmark" : icon,
                  }}
                />
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        {/* Rate Book Sub-menu */}
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger key="rating">
            <DropdownMenu.ItemTitle>Rate Book</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "hand.thumbsup" }} />
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            {[1, 2, 3, 4, 5].map((rating) => (
              <DropdownMenu.Item
                key={String(rating)}
                onSelect={() => updateBook({ isbn: book.book.isbn, rating })}
              >
                <DropdownMenu.ItemTitle>{`⭐️ ${rating}`}</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: book.rating === rating ? "checkmark" : undefined,
                  }}
                />
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Item
          key="favorites"
          onSelect={() =>
            updateBook({
              isbn: book.book.isbn,
              isFavorite: !isFavorite,
            })
          }
        >
          <DropdownMenu.ItemTitle>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: isFavorite ? "star.fill" : "star",
            }}
          />
        </DropdownMenu.Item>

        <DropdownMenu.Item destructive key="delete" onSelect={confirmDelete}>
          <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "trash.fill",
            }}
          />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
