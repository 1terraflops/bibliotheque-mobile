import { LoginRequest, LoginResponseSchema } from "@/types/auth";
import { parseResponse } from "@/utils/parseResponse";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { api } from "../axios";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (dto: LoginRequest) =>
      await api
        .post("auth/signIn", dto)
        .then(parseResponse(LoginResponseSchema)),
    onSuccess: async (response) => {
      await SecureStore.setItemAsync(
        "access_token",
        response.session.access_token
      );
      await SecureStore.setItemAsync(
        "refresh_token",
        response.session.refresh_token
      );
    },
    onError: (err) => {
      console.error(err);
    },
  });
