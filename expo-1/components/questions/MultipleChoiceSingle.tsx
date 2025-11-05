import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BaseQuestionProps, hasAnswers } from "@/types/questions";
import Animated, { FadeIn } from "react-native-reanimated";

export function MultipleChoiceSingle({
	question,
	onAnswer,
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
		<View className="space-y-2">
			{question.answers.map((answer, index) => (
				<Animated.View
					key={answer.label}
					entering={FadeIn.delay(index * 100).duration(400)}
				>
					<Button
						onPress={() => onAnswer(answer.label || "", answer.label || "")}
						variant="outline"
						className="w-full justify-start h-auto py-4 px-4 border-input/50"
						disabled={isLoading}
					>
						<Text className="text-base">{answer.label}</Text>
					</Button>
				</Animated.View>
			))}
		</View>
	);
}
