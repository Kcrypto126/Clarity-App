import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { BaseQuestionProps } from "@/types/questions";
import { MultipleChoiceSingle } from "./MultipleChoiceSingle";
import { MultipleChoiceMultiple } from "./MultipleChoiceMultiple";
import { RatingScale } from "./RatingScale";
import { TextInput } from "./TextInput";
import { JournalEntry } from "./JournalEntry";
import { QuestionWrapper } from "./QuestionWrapper";
import Animated, { FadeIn } from "react-native-reanimated";

export function Question(props: BaseQuestionProps) {
	const { question, isLoading, onSkip } = props;

	const renderQuestion = () => {
		switch (question.answerType) {
			case "multiple-choice-single":
				return <MultipleChoiceSingle {...props} />;
			case "multiple-choice-multiple":
				return <MultipleChoiceMultiple {...props} />;
			case "rating-scale":
				return <RatingScale {...props} />;
			case "journal-entry":
				return <JournalEntry {...props} />;
			case "text-input":
				return <TextInput {...props} />;
			default:
				return (
					<View className="p-4">
						<Text className="text-red-500">
							Unknown question type: {question.answerType || "undefined"}
						</Text>
					</View>
				);
		}
	};

	// Transform skipLogic to match QuestionWrapper's expected type
	const transformedSkipLogic = question.skipLogic?.map((logic) => ({
		reason: logic.reason || "Skipped",
	}));

	return (
		<Animated.View
			entering={FadeIn.duration(400)}
			className="web:hover:z-10 relative"
		>
			<QuestionWrapper
				title={question.title || "Untitled Question"}
				notes={question.notes}
				isLoading={isLoading}
				onSkip={onSkip}
				skipLogic={transformedSkipLogic}
				className="web:hover:shadow-sm flex flex-col gap-y-4"
			>
				{renderQuestion()}
			</QuestionWrapper>
		</Animated.View>
	);
}
