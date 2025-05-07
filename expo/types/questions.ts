import { Question } from './sanity/sanity';

export interface BaseQuestionProps {
  question: Question;
  onAnswer: (answerId: string, answerLabel: string) => void;
  onSkip?: (reason: string) => void;
  isLoading?: boolean;
}

export interface QuestionAnswer {
  id: string;
  label: string;
  value?: number;
}

// Helper type guard to check if answers exist and have required fields
export function hasAnswers(question: Question): question is Question & { answers: Array<{ id: string; label: string }> } {
  return Array.isArray(question.answers) &&
    question.answers.length > 0 &&
    question.answers.every(answer => typeof answer.id === 'string' && typeof answer.label === 'string');
} 