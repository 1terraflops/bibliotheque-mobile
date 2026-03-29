import { updateBookMutationOptions } from "@/api/books/update-book.mutation";
import { uploadCoverMutationOptions } from "@/api/books/upload-cover.mutation";
import { BookStatus, UserBook } from "@/types/books";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import ImageCropPicker from "react-native-image-crop-picker";
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
  const { mutate: updateCover } = useMutation(uploadCoverMutationOptions());

  const STATUS_CONFIG: Record<BookStatus, { label: string; icon: string }> = {
    [BookStatus.IN_PROGRESS]: { label: "In Progress", icon: "book.fill" },
    [BookStatus.NOT_STARTED]: { label: "Not Started", icon: "bookmark" },
    [BookStatus.COMPLETED]: { label: "Completed", icon: "checkmark.circle" },
    [BookStatus.DROPPED]: { label: "Dropped", icon: "xmark.circle" },
  };

  const confirmDelete = () => openModal("ConfirmDeleteBook", { book });

  const handleUploadCover = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 400,
        height: 600,
        cropping: true,
        cropperCircleOverlay: false,
        mediaType: "photo",
        compressImageQuality: 0.8,
      });

      updateCover({
        id: book.book.id,
        isbn: book.book.isbn,
        imageUri: image.path,
      });
    } catch (error: any) {
      if (error?.code === "E_PICKER_CANCELLED") return;
      throw error;
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger key="status">
            <DropdownMenu.ItemTitle>Change Status</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "book" }} />
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

        <DropdownMenu.Item key="cover" onSelect={handleUploadCover}>
          <DropdownMenu.ItemTitle>Upload New Cover</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon ios={{ name: "square.and.arrow.up" }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item
          key="review"
          onSelect={() => openModal("AddReview", { id: book.book.id })}
        >
          <DropdownMenu.ItemTitle>Add Review</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon ios={{ name: "pencil.line" }} />
        </DropdownMenu.Item>

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
          <DropdownMenu.ItemIcon ios={{ name: "trash.fill" }} />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
