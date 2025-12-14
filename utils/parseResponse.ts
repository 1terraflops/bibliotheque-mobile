import { AxiosResponse } from "axios";
import { ZodType } from "zod";

export function parseResponse<T>(schema: ZodType<T>) {
  return (res: AxiosResponse) => schema.parse(res.data);
}
