import { BookStatusAndFav } from "@/types/books";
import startCase from "lodash.startcase";

export const formatStatus = (status: BookStatusAndFav) => {
  const strippedStatus = status.replace("_", " ").toLowerCase();
  return startCase(strippedStatus);
};
