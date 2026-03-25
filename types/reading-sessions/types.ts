import z from "zod";
import { IEnterNumberOfPagesFormSchema, ReadingSessionSchema } from "./schema";

export enum SESSION_STATUS {
  STARTED = "STARTED",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export type ReadingSession = z.infer<typeof ReadingSessionSchema>;

export type IEnterNumberOfPagesForm = z.infer<
  typeof IEnterNumberOfPagesFormSchema
>;
