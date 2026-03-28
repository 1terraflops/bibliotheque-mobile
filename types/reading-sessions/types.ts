import z from "zod";
import {
  IEndSessionFormSchema,
  IEnterNumberOfPagesFormSchema,
  ReadingSessionSchema,
  SessionsChartSchema,
} from "./schema";

export enum SESSION_STATUS {
  STARTED = "STARTED",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

export type ReadingSession = z.infer<typeof ReadingSessionSchema>;
export type SessionsChart = z.infer<typeof SessionsChartSchema>;

export type IEnterNumberOfPagesForm = z.infer<
  typeof IEnterNumberOfPagesFormSchema
>;
export type IEndSessionForm = z.infer<typeof IEndSessionFormSchema>;
