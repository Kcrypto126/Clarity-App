import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Question } from "@/components/questions";
import { SourceBadge } from "./SourceBadge";
import { QuestionTooltip } from "./QuestionTooltip";
import { SkipQuestionButton } from "./SkipQuestionButton";
import { Question as QuestionSanity } from "@/types/sanity/sanity";
import { Source } from "@/types/sanity/sanity";
interface QuestionViewProps {
	question: QuestionSanity;
	onAnswer: (answerId: string, answerLabel: string) => void;
	onSkip: (reason: string) => void;
	isLoading: boolean;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
	question,
	onAnswer,
	onSkip,
	isLoading,
}) => {
	const source = question.source;

	if (!question) return null;

	return (
		<View className="relative mb-4">
			<View className="flex-row justify-between items-start mb-6 mt-2 pr-10">
				<View className="flex-1">
					<Text className="text-xl font-semibold text-foreground leading-7">
						{question.title}
					</Text>
					{question.notes && (
						<Text className="text-base text-muted-foreground mt-2">
							{question.notes}
						</Text>
					)}
				</View>
				<SourceBadge source={source as unknown as Source | null} />
			</View>

			<QuestionTooltip notes={question.notes || null} />

			<Question question={question} onAnswer={onAnswer} isLoading={isLoading} />

			<SkipQuestionButton
				skipLogic={question.skipLogic || []}
				onSkip={onSkip}
			/>
		</View>
	);
};
