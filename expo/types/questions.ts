import { Question } from './sanity/sanity';

export interface BaseQuestionProps {
  question: Question;
  onAnswer: (answerId: string, answerLabel: string) => void;
  onSkip?: (reason: string) => void;
  isLoading?: boolean;
}

export function hasAnswers(question: Question): question is Question & { answers: Array<Question['answers']> } {
  return Array.isArray(question.answers) &&
    question.answers.length > 0 &&
    question.answers.every(answer => {
      const hasRequired = typeof answer.label === 'string';

      const hasValidValue = answer.value === undefined || typeof answer.value === 'number';
      const hasValidUnlocks = !answer.unlocksNodes || Array.isArray(answer.unlocksNodes);
      const hasValidPoints = Array.isArray(answer.nodeUnlockActions?.find(action => action.pointsToAdd && action.targetNode && action.pointsToAdd > 0));

      return hasRequired && hasValidValue && hasValidUnlocks && hasValidPoints;
    });
} 