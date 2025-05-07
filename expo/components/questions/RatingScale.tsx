import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import {
	BaseQuestionProps,
	hasAnswers,
	QuestionAnswer,
} from "@/types/questions";

export function RatingScale({
	question,
	onAnswer,
	onSkip,
	isLoading,
}: BaseQuestionProps) {
	if (!hasAnswers(question)) {
		return (
			<View className="p-4">
				<Text className="text-red-500">
					This question has no rating scale configured.
				</Text>
			</View>
		);
	}

	// Sort answers by value to ensure they're in the correct order
	const sortedAnswers = [...question.answers].sort(
		(a, b) => (a.value || 0) - (b.value || 0),
	);

	return (
		<View className="p-4 space-y-6">
			<View className="space-y-2">
				<H2>{question.title}</H2>
				{question.notes && <Muted>{question.notes}</Muted>}
			</View>

			<View className="flex-row flex-wrap justify-center gap-2">
				{sortedAnswers.map((answer) => (
					<Button
						key={answer.id}
						onPress={() => onAnswer(answer.id, answer.label)}
						variant="outline"
						className="w-12 h-12 rounded-full"
						disabled={isLoading}
					>
						<Text>{answer.value}</Text>
					</Button>
				))}
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
