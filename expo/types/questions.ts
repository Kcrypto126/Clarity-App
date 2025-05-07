import { Question } from './sanity/sanity';

export interface BaseQuestionProps {
  question: Question;
  onAnswer: (answerId: string, answerLabel: string) => void;
  onSkip?: (reason: string) => void;
  isLoading?: boolean;
}

declare const internalGroqTypeReferenceTo: unique symbol;


// Helper type guard to check if answers exist and have required fields
export function hasAnswers(question: Question): question is Question & { answers: Array<Question['answers']> } {
  return Array.isArray(question.answers) &&
    question.answers.length > 0 &&
    question.answers.every(answer => {
      // Required fields - at minimum we need a label
      const hasRequired = typeof answer.label === 'string';

      // Optional fields should be of correct type if present
      const hasValidValue = answer.value === undefined || typeof answer.value === 'number';
      const hasValidUnlocks = !answer.unlocksNodes || Array.isArray(answer.unlocksNodes);
      const hasValidPoints = !answer.addsUnlockPointsToNodes || Array.isArray(answer.addsUnlockPointsToNodes);

      return hasRequired && hasValidValue && hasValidUnlocks && hasValidPoints;
    });
} 