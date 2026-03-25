import { UserBook } from "@/types/books";
import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from "react-native-modalfy";
import { ConfirmDeleteBookModal } from "./confirm-delete-book-modal";
import { EnterNumberOfPagesModal } from "./enter-number-of-pages-modal";

export type ModalStackParamsList = {
  ConfirmDeleteBook: { book: UserBook };
  EnterNumberOfPages: { book: UserBook };
};

declare module "react-native-modalfy" {
  interface ModalfyCustomParams extends ModalStackParamsList {}
}

const modalConfig: ModalStackConfig = {
  ConfirmDeleteBook: ConfirmDeleteBookModal,
  EnterNumberOfPages: EnterNumberOfPagesModal,
};
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
};

export const stack = createModalStack(modalConfig, defaultOptions);
