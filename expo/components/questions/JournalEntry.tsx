import React, { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { BaseQuestionProps } from "@/types/questions";

export function JournalEntry({
	question,
	onAnswer,
	onSkip,
	isLoading,
}: BaseQuestionProps) {
	const [content, setContent] = useState("");
	const minLength = 10; // Minimum characters required

	const handleSubmit = () => {
		const trimmedContent = content.trim();
		if (trimmedContent.length >= minLength) {
			// We use the content as both the id and label since this will be stored
			// in both user_responses and journal_entries tables
			onAnswer(trimmedContent, trimmedContent);
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
					value={content}
					onChangeText={setContent}
					placeholder="Write your journal entry here..."
					multiline={true}
					numberOfLines={6}
					textAlignVertical="top"
					className="bg-input border border-input rounded-md px-3 py-2 text-base min-h-[150px]"
					editable={!isLoading}
					style={{ color: "#000" }} // Ensure text is visible
				/>

				<Muted>
					{content.length} characters
					{content.length < minLength ? ` (minimum ${minLength} required)` : ""}
				</Muted>

				<Button
					onPress={handleSubmit}
					className="w-full"
					disabled={isLoading || content.trim().length < minLength}
				>
					<Text className="text-primary-foreground">Submit Entry</Text>
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
