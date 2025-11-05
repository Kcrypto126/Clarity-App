import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import { Text } from "./text";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <View className="mb-4">
      {label && <Text className="font-medium mb-2">{label}</Text>}
      <RNTextInput
        className={`bg-background border rounded-md px-4 py-2 ${
          error ? "border-destructive" : "border-border"
        }`}
        {...props}
      />
      {error && <Text className="text-destructive text-sm mt-1">{error}</Text>}
    </View>
  );
}
