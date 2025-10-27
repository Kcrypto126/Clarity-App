import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BaseQuestionProps, hasAnswers } from "@/types/questions";
import Animated, { FadeIn } from "react-native-reanimated";

export function RatingScale({
	question,
	onAnswer,
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
		<View className="py-4">
			<View className="flex-row justify-between items-center mb-2">
				<Text className="text-sm text-muted-foreground">Not at all</Text>
				<Text className="text-sm text-muted-foreground">Very much</Text>
			</View>
			<View className="flex-row justify-between items-center">
				{sortedAnswers.map((answer, index) => (
					<Animated.View
						key={index}
						entering={FadeIn.delay(index * 50).duration(400)}
					>
						<Button
							onPress={() => onAnswer(answer.label ?? "", answer.label ?? "")}
							variant="outline"
							className="w-14 h-14 rounded-full border-input/50"
							disabled={isLoading}
						>
							<Text className="text-lg font-medium">{answer.value}</Text>
						</Button>
					</Animated.View>
				))}
			</View>
		</View>
	);
}
