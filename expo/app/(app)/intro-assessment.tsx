// import React from "react";
// import { View, ScrollView, Animated } from "react-native";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "@/components/safe-area-view";
// import { useNodesByType } from "@/hooks/nodes";
// import { Text } from "@/components/ui/text";
// import { create } from "zustand";
// import { QuestionView } from "@/components/assessment/QuestionView";
// import { AssessmentHeader } from "@/components/assessment/NodeHeader";
// import { UserResponseInsert } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Text, View } from "react-native";

// interface AssessmentStore {
// 	responses: UserResponseInsert[];
// 	addResponse: (response: UserResponseInsert) => void;
// 	clearResponses: () => void;
// }

// export const useAssessmentStore = create<AssessmentStore>((set) => ({
// 	responses: [],
// 	addResponse: (response) =>
// 		set((state) => ({
// 			responses: [
// 				...state.responses.filter(
// 					(r) =>
// 						r.sanity_node_ref !== response.sanity_node_ref ||
// 						r.sanity_question_ref !== response.sanity_question_ref,
// 				),
// 				response,
// 			],
// 		})),
// 	clearResponses: () => set({ responses: [] }),
// }));

// export default function IntroAssessmentScreen() {
// 	const router = useRouter();
// 	const progressAnimation = React.useRef(new Animated.Value(0)).current;
// 	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
// 	const { addResponse } = useAssessmentStore();

// 	const { data: nodes, isLoading } = useNodesByType("intro_assessment");
// 	const currentNode = nodes?.[0];

// 	const handleAnswer = (answerId: string, answerLabel: string) => {
// 		if (!currentNode) return;

// 		addResponse({
// 			user_id: "",
// 			sanity_node_ref: currentNode._id,
// 			sanity_question_ref:
// 				currentNode.questions?.[currentQuestionIndex]?._ref || "",
// 			answer_id: answerId,
// 			answer_label: answerLabel,
// 			skipped: false,
// 		});

// 		if (currentQuestionIndex < (currentNode.questions?.length || 0) - 1) {
// 			setCurrentQuestionIndex(currentQuestionIndex + 1);
// 			Animated.timing(progressAnimation, {
// 				toValue:
// 					(currentQuestionIndex + 1) / (currentNode.questions?.length || 1),
// 				duration: 300,
// 				useNativeDriver: false,
// 			}).start();
// 		} else {
// 			router.push("/sign-up");
// 		}
// 	};

// 	const handleSkip = (reason: string) => {
// 		if (!currentNode) return;

// 		addResponse({
// 			user_id: "",
// 			sanity_node_ref: currentNode._id,
// 			sanity_question_ref:
// 				currentNode.questions?.[currentQuestionIndex]?._ref || "",
// 			answer_id: "",
// 			answer_label: "",
// 			skipped: true,
// 			skip_reason: reason,
// 		});

// 		if (currentQuestionIndex < (currentNode.questions?.length || 0) - 1) {
// 			setCurrentQuestionIndex(currentQuestionIndex + 1);
// 			Animated.timing(progressAnimation, {
// 				toValue:
// 					(currentQuestionIndex + 1) / (currentNode.questions?.length || 1),
// 				duration: 300,
// 				useNativeDriver: false,
// 			}).start();
// 		} else {
// 			router.push("/sign-up");
// 		}
// 	};

// 	if (isLoading || !currentNode) {
// 		return (
// 			<SafeAreaView className="flex-1 bg-background">
// 				<View className="flex-1 justify-center items-center">
// 					<Text>Loading assessment...</Text>
// 				</View>
// 			</SafeAreaView>
// 		);
// 	}

// 	const currentQuestion = currentNode.questions?.[currentQuestionIndex];
// 	const totalQuestions = currentNode.questions?.length || 0;

// 	return (
// 		<SafeAreaView className="flex-1 bg-background">
// 			<AssessmentHeader
// 				title={currentNode.title}
// 				description={currentNode.description}
// 				currentIndex={currentQuestionIndex}
// 				totalQuestions={totalQuestions}
// 				progress={progressAnimation}
// 			/>

// 			<ScrollView
// 				className="flex-1"
// 				contentContainerStyle={{ flexGrow: 1 }}
// 				keyboardShouldPersistTaps="handled"
// 				showsVerticalScrollIndicator={false}
// 			>
// 				<View className="flex-1 justify-center p-4">
// 					{currentQuestion && (
// 						<QuestionView
// 							question={currentQuestion}
// 							onAnswer={handleAnswer}
// 							onSkip={handleSkip}
// 							isLoading={isLoading}
// 						/>
// 					)}
// 				</View>
// 			</ScrollView>
// 		</SafeAreaView>
// 	);
// }

export default function IntroAssessmentScreen() {
  return (
    <View>
      <Text>Intro Assessment</Text>
      <Button onPress={() => router.push("/welcome")}>
        <Text>Welcome</Text>
      </Button>
    </View>
  );
}
