import { UserBook } from "@/types/books";
import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from "react-native-modalfy";
import { AddReviewModal } from "./add-review-modal";
import { ConfirmDeleteBookModal } from "./confirm-delete-book-modal";
import { ConfirmLogOutModal } from "./confirm-log-out";
import { EndSessionModal } from "./end-session-modal";
import { EnterNumberOfPagesModal } from "./enter-number-of-pages-modal";

export type ModalStackParamsList = {
  ConfirmDeleteBook: { book: UserBook };
  EnterNumberOfPages: { book: UserBook };
  EndSession: { isbn: string };
  AddReview: { id: number };
  ConfirmLogOut: void;
};

declare module "react-native-modalfy" {
  interface ModalfyCustomParams extends ModalStackParamsList {}
}

const modalConfig: ModalStackConfig = {
  ConfirmDeleteBook: ConfirmDeleteBookModal,
  EnterNumberOfPages: EnterNumberOfPagesModal,
  EndSession: EndSessionModal,
  AddReview: AddReviewModal,
  ConfirmLogOut: ConfirmLogOutModal,
};
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
};

export const stack = createModalStack(modalConfig, defaultOptions);
