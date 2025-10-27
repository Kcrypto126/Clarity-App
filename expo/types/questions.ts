import { Question } from "./sanity/sanity";

export interface BaseQuestionProps {
	question: Question;
	onAnswer: (answerId: string, answerLabel: string) => void;
	onSkip?: (reason: string) => void;
	isLoading?: boolean;
}

export function hasAnswers(
	question: Question,
): question is Question & { answers: Array<Question["answers"]> } {
	return (
		Array.isArray(question.answers) &&
		question.answers.length > 0 &&
		question.answers.every((answer) => {
			const hasRequired = typeof answer.label === "string";

			const hasValidValue =
				answer.value === undefined ||
				answer.value === null ||
				typeof answer.value === "number";
			const hasValidUnlocks =
				!answer.unlocksNodes || Array.isArray(answer.unlocksNodes);
			const hasValidPoints =
				!answer.nodeUnlockActions || Array.isArray(answer.nodeUnlockActions);

			return hasRequired && hasValidValue && hasValidUnlocks && hasValidPoints;
		})
	);
}

export function hasQuestionLevelRewards(question: Question): boolean {
	const hasDirectUnlocks =
		Array.isArray(question.questionUnlocksNodes) &&
		question.questionUnlocksNodes.length > 0;
	const hasPointRewards =
		Array.isArray(question.questionRewardActions) &&
		question.questionRewardActions.length > 0;

	return hasDirectUnlocks || hasPointRewards;
}
