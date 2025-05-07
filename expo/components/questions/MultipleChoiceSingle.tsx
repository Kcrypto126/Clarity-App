import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { BaseQuestionProps, hasAnswers } from "@/types/questions";

export function MultipleChoiceSingle({
	question,
	onAnswer,
	onSkip,
	isLoading,
}: BaseQuestionProps) {
	if (!hasAnswers(question)) {
		return (
			<View className="p-4">
				<Text className="text-red-500">
					This question has no answers configured.
				</Text>
			</View>
		);
	}

	return (
		<View className="p-4 space-y-6">
			<View className="space-y-2">
				<H2>{question.title}</H2>
				{question.notes && <Muted>{question.notes}</Muted>}
			</View>

			<View className="space-y-3">
				{question.answers.map((answer) => (
					<Button
						key={answer.label}
						onPress={() => onAnswer(answer.label || "", answer.label || "")}
						variant="outline"
						className="w-full justify-start px-4 py-3"
						disabled={isLoading}
					>
						<Text>{answer.label}</Text>
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
