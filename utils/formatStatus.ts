import { BookStatus } from "@/types/books";
import startCase from "lodash.startcase";

export const formatStatus = (status: BookStatus | "FAVORITES") => {
  const strippedStatus = status.replace("_", " ").toLowerCase();
  return startCase(strippedStatus);
};
