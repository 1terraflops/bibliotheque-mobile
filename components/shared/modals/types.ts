import { UserBook } from "@/types/books";
import {
  createModalStack,
  ModalOptions,
  ModalStackConfig,
} from "react-native-modalfy";
import { ConfirmDeleteBookModal } from "./confirm-delete-book-modal";

export type ModalStackParamsList = {
  ConfirmDeleteBook: { book: UserBook };
};

declare module "react-native-modalfy" {
  interface ModalfyCustomParams extends ModalStackParamsList {}
}

const modalConfig: ModalStackConfig = {
  ConfirmDeleteBook: ConfirmDeleteBookModal,
};
const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
};

export const stack = createModalStack(modalConfig, defaultOptions);
