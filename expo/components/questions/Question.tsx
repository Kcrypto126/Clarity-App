import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { BaseQuestionProps } from "@/types/questions";
import { MultipleChoiceSingle } from "./MultipleChoiceSingle";
import { MultipleChoiceMultiple } from "./MultipleChoiceMultiple";
import { RatingScale } from "./RatingScale";
import { TextInput } from "./TextInput";
import { JournalEntry } from "./JournalEntry";

export function Question(props: BaseQuestionProps) {
	const { question } = props;

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
}
