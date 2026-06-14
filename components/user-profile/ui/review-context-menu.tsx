import { deleteReviewMutationOptions } from "@/api/reviews/delete-review.mutation";
import { useMutation } from "@tanstack/react-query";
import { FC, ReactNode } from "react";
import * as ContextMenu from "zeego/context-menu";

type ReviewContextMenuProps = {
  children: ReactNode;
  id: number;
};

export const ReviewContextMenu: FC<ReviewContextMenuProps> = ({
  children,
  id,
}) => {
  const { mutate: deleteReview } = useMutation(deleteReviewMutationOptions(id));

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item destructive key="delete" onSelect={deleteReview}>
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
