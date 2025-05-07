import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { BaseQuestionProps } from "@/types/questions";

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
		<View className="p-4 space-y-6">
			<View className="space-y-2">
				<H2>{question.title}</H2>
				{question.notes && <Muted>{question.notes}</Muted>}
			</View>

			<View className="space-y-4">
				<RNTextInput
					value={text}
					onChangeText={setText}
					placeholder="Type your answer here..."
					multiline={false}
					className="bg-input border border-input rounded-md px-3 py-2 text-base"
					editable={!isLoading}
					style={{ color: "#000" }} // Ensure text is visible
				/>

				<Button
					onPress={handleSubmit}
					className="w-full"
					disabled={isLoading || !text.trim()}
				>
					<Text className="text-primary-foreground">Submit Answer</Text>
				</Button>
			</View>

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
		</View>
	);
}
