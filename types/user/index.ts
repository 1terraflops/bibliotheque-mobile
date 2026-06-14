import { Database } from "../database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type IUpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];
