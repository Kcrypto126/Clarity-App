import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BaseQuestionProps, hasAnswers } from "@/types/questions";
import Animated, { FadeIn } from "react-native-reanimated";

export function MultipleChoiceMultiple({
	question,
	onAnswer,
	isLoading,
}: BaseQuestionProps) {
	const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(
		new Set(),
	);

	if (!hasAnswers(question)) {
		return (
			<View className="p-4">
				<Text className="text-red-500">
					This question has no answers configured.
				</Text>
			</View>
		);
	}

	const toggleAnswer = (answerId: string) => {
		const newSelectedAnswers = new Set(selectedAnswers);
		if (selectedAnswers.has(answerId)) {
			newSelectedAnswers.delete(answerId);
		} else {
			newSelectedAnswers.add(answerId);
		}
		setSelectedAnswers(newSelectedAnswers);
	};

	const handleSubmit = () => {
		const selectedLabels = Array.from(selectedAnswers)
			.map((id) => question.answers.find((a) => a._key === id)?.label || "")
			.filter(Boolean);

		if (selectedLabels.length > 0) {
			onAnswer(selectedLabels.join(", "), selectedLabels.join(", "));
		}
	};

	return (
		<View className="space-y-4">
			<View className="space-y-2">
				{question.answers.map((answer, index) => {
					const isSelected = selectedAnswers.has(answer._key);
					return (
						<Animated.View
							key={answer._key}
							entering={FadeIn.delay(index * 100).duration(400)}
						>
							<Button
								onPress={() => toggleAnswer(answer._key)}
								variant={isSelected ? "default" : "outline"}
								className={`w-full justify-start px-4 py-3 ${
									!isSelected && "web:hover:bg-accent/5 web:hover:border-accent"
								}`}
								disabled={isLoading}
							>
								<Text className={isSelected ? "text-primary-foreground" : ""}>
									{answer.label}
								</Text>
							</Button>
						</Animated.View>
					);
				})}
			</View>

			<Button
				onPress={handleSubmit}
				className="w-full"
				disabled={isLoading || selectedAnswers.size === 0}
			>
				<Text className="text-primary-foreground">
					Submit {selectedAnswers.size} Answer
					{selectedAnswers.size !== 1 ? "s" : ""}
				</Text>
			</Button>
		</View>
	);
}
