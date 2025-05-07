import React from "react";
import { View, ScrollView, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "@/components/safe-area-view";
import { useNodesByType } from "@/hooks/nodes";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { create } from "zustand";
import { Database } from "@/types/supabase/supabase";

type UserResponse = Database["public"]["Tables"]["user_responses"]["Insert"];

// Store for temporary assessment responses
interface AssessmentStore {
	responses: Omit<UserResponse, "created_at" | "updated_at" | "id">[];
	addResponse: (
		response: Omit<UserResponse, "created_at" | "updated_at" | "id">,
	) => void;
	clearResponses: () => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
	responses: [],
	addResponse: (response) =>
		set((state) => ({
			responses: [
				...state.responses.filter(
					(r) =>
						r.sanity_node_ref !== response.sanity_node_ref ||
						r.sanity_question_ref !== response.sanity_question_ref,
				),
				response,
			],
		})),
	clearResponses: () => set({ responses: [] }),
}));

interface Answer {
	id: string;
	label: string;
}

export default function IntroAssessmentScreen() {
	const router = useRouter();
	const progressAnimation = React.useRef(new Animated.Value(0)).current;
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
	const { addResponse } = useAssessmentStore();

	const { data: nodes, isLoading } = useNodesByType("intro_assessment");
	const currentNode = nodes?.[0]; // Assuming we're working with the first intro assessment node

	const handleAnswer = (answer: Answer) => {
		if (!currentNode) return;

		// Add response to store with correct property names
		addResponse({
			user_id: "", // This will be set after sign up
			sanity_node_ref: currentNode._id,
			sanity_question_ref:
				currentNode.questions?.[currentQuestionIndex]?._ref || "",
			answer_id: answer.id,
			answer_label: answer.label,
			skipped: false,
		});

		// Move to next question or finish
		if (currentQuestionIndex < (currentNode.questions?.length || 0) - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			// Animate progress
			Animated.timing(progressAnimation, {
				toValue:
					(currentQuestionIndex + 1) / (currentNode.questions?.length || 1),
				duration: 300,
				useNativeDriver: false,
			}).start();
		} else {
			// Assessment complete, navigate to sign up
			router.push("/sign-up");
		}
	};

	console.log("Current node:", currentNode);

	if (isLoading || !currentNode) {
		return (
			<SafeAreaView className="flex-1 bg-background">
				<View className="flex-1 justify-center items-center">
					<Text>Loading assessment...</Text>
				</View>
			</SafeAreaView>
		);
	}

	const currentQuestion = currentNode.questions?.[currentQuestionIndex];

	return (
		<SafeAreaView className="flex-1 bg-background">
			<Animated.View
				style={{
					height: 2,
					backgroundColor: "#2563eb",
					width: progressAnimation.interpolate({
						inputRange: [0, 1],
						outputRange: ["0%", "100%"],
					}),
				}}
			/>

			<ScrollView
				className="flex-1 px-4"
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View className="flex-1 justify-center py-8 web:m-4">
					<H1 className="text-center mb-4">{currentNode.title}</H1>
					<Muted className="text-center mb-8">{currentNode.description}</Muted>

					{currentQuestion && (
						<View className="gap-y-4">
							<Text className="text-lg text-center mb-4">
								{currentQuestion.title}
							</Text>
							{currentQuestion.answers?.map((answer: Answer) => (
								<Button
									key={answer.id}
									onPress={() => handleAnswer(answer)}
									className="w-full"
								>
									<Text>{answer.label}</Text>
								</Button>
							))}
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
