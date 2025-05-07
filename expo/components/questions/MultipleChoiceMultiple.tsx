import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, Muted } from "@/components/ui/typography";
import { BaseQuestionProps, hasAnswers } from "@/types/questions";

export function MultipleChoiceMultiple({
	question,
	onAnswer,
	onSkip,
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
		setSelectedAnswers((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(answerId)) {
				newSet.delete(answerId);
			} else {
				newSet.add(answerId);
			}
			return newSet;
		});
	};

	const handleSubmit = () => {
		const selectedAnswerObjects = question.answers.filter((a) =>
			selectedAnswers.has(a.id || ""),
		);
		const ids = selectedAnswerObjects.map((a) => a.id || "").join(",");
		const labels = selectedAnswerObjects.map((a) => a.label || "").join(", ");
		onAnswer(ids, labels);
	};

	return (
		<View className="p-4 space-y-6">
			<View className="space-y-2">
				<H2>{question.title}</H2>
				{question.notes && <Muted>{question.notes}</Muted>}
			</View>

			<View className="space-y-3">
				{question.answers.map((answer) => {
					const isSelected = selectedAnswers.has(answer.id || "");
					return (
						<Button
							key={answer.id}
							onPress={() => toggleAnswer(answer.id || "")}
							variant={isSelected ? "default" : "outline"}
							className="w-full justify-start px-4 py-3"
							disabled={isLoading}
						>
							<Text className={isSelected ? "text-primary-foreground" : ""}>
								{answer.label}
							</Text>
						</Button>
					);
				})}
			</View>

			<Button
				onPress={handleSubmit}
				className="w-full"
				disabled={isLoading || selectedAnswers.size === 0}
			>
				<Text className="text-primary-foreground">Submit Answers</Text>
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
		</View>
	);
}
