import { colors } from "@/constants/colors";
import { cn } from "@/utils/cn";
import {
  Check,
  CircleAlert,
  Eye,
  EyeClosed,
  LucideIcon,
} from "lucide-react-native";
import { FC, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";
import { Button } from "./button";

interface InputProps extends TextInputProps {
  placeholderAsLabel?: boolean;
  icon?: LucideIcon;
  error?: string;
  showError?: boolean;
  isBlurred?: boolean;
  secure?: boolean;
  label?: string;
}

export const Input: FC<InputProps> = ({
  placeholderAsLabel = false,
  placeholder,
  value,
  icon: Icon,
  error,
  showError = false,
  isBlurred = false,
  secure = false,
  multiline,
  label,
  ...props
}) => {
  const [secureField, setSecureField] = useState(secure);
  const isLightTheme = useColorScheme() === "light";
  const hasValue = value && value.length > 0;

  const labelText = label ?? (placeholderAsLabel ? placeholder : undefined);

  return (
    <View className="w-full">
      <Text
        className={cn(
          "font-roboto-mono mb-1.5 ml-0.5 h-[18px]",
          hasValue ? "opacity-100" : "opacity-0",
          label && !placeholderAsLabel && "opacity-100",
          isLightTheme ? "text-dark-1" : "text-light-1",
        )}
      >
        {labelText}
      </Text>
      <View>
        <View
          className={cn(
            "flex-row justify-between items-center border border-light-1 rounded-[10px] px-3",
            isLightTheme && "border-dark-1",
            showError && "border-attention-5",
            !showError && value && isBlurred && "border-approved-5",
          )}
        >
          <View className="flex-row items-center gap-x-3 flex-1">
            {Icon && (
              <Icon
                color={isLightTheme ? colors["dark-3"] : colors["light-1"]}
              />
            )}
            <TextInput
              {...props}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureField}
              multiline={multiline}
              className={cn(
                "font-inter text-lg text-light-1 h-[46px] leading-[19px] placeholder:text-light-4 flex-1",
                isLightTheme && "text-dark-1 placeholder:text-dark-3",
                multiline && "h-24",
              )}
            />
          </View>
          {secure && value && (
            <Button
              onPress={() => setSecureField((p) => !p)}
              className="mr-2"
              variant="icon"
              iconLeft={secureField ? Eye : EyeClosed}
            />
          )}
          {showError && <CircleAlert color={colors.error} />}
          {!showError && value && isBlurred && <Check color={colors.success} />}
        </View>
        <Text className="text-sm text-attention-5 font-nunito-sans mt-0.5 ml-0.5">
          {showError && error}
        </Text>
      </View>
    </View>
  );
};
