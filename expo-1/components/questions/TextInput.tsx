import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { BaseQuestionProps } from "@/types/questions";
import Animated, { FadeIn } from "react-native-reanimated";

export function TextInput({
	question,
	onAnswer,
	onSkip,
	isLoading,
}: BaseQuestionProps) {
	const [text, setText] = useState("");

	const handleSubmit = () => {
		const trimmedText = text.trim();
		if (trimmedText) {
			onAnswer(trimmedText, trimmedText);
		}
	};

	return (
		<Animated.View
			className="flex flex-col gap-y-4"
			entering={FadeIn.duration(400)}
		>
			<Input
				value={text}
				onChangeText={setText}
				placeholder="Type your answer here..."
				multiline={false}
				editable={!isLoading}
				returnKeyType="done"
				onSubmitEditing={handleSubmit}
				blurOnSubmit
			/>

			<Button
				onPress={handleSubmit}
				className="w-full py-3"
				disabled={isLoading || !text.trim()}
			>
				<Text className="text-primary-foreground text-base font-medium">
					Continue
				</Text>
			</Button>

			{question.skipLogic && question.skipLogic.length > 0 && (
				<View className="pt-4">
					<Button
						onPress={() =>
							onSkip?.(question.skipLogic?.[0]?.reason || "Skipped")
						}
						variant="ghost"
						className="w-full"
						disabled={isLoading}
					>
						<Text className="text-muted-foreground">Skip this question</Text>
					</Button>
				</View>
			)}
		</Animated.View>
	);
}
