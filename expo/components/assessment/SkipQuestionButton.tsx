import React from "react";
import { Pressable, View, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Question as QuestionSanity } from "@/types/sanity/sanity";

interface SkipQuestionButtonProps {
	skipLogic: QuestionSanity["skipLogic"];
	onSkip: (reason: string) => void;
}

export const SkipQuestionButton: React.FC<SkipQuestionButtonProps> = ({
	skipLogic,
	onSkip,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);

	if (!skipLogic?.length) return null;

	return (
		<View className="mt-6">
			<Pressable
				className="items-center justify-center py-3 px-4 rounded-lg bg-secondary"
				style={{
					minHeight: 44,
					...(Platform.OS === "ios"
						? {
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 1 },
								shadowOpacity: 0.1,
								shadowRadius: 2,
							}
						: { elevation: 2 }),
				}}
				onPress={() => setIsOpen(!isOpen)}
			>
				<Text className="text-sm font-medium text-secondary-foreground">
					Skip this question
				</Text>
			</Pressable>

			{isOpen && (
				<View className="mt-2 bg-card rounded-lg p-4">
					<Text className="text-sm font-medium mb-3">
						Why would you like to skip?
					</Text>
					{skipLogic.map((logic, index) => (
						<Pressable
							key={index}
							className="py-3 border-b border-border/50"
							onPress={() => {
								onSkip(logic.reason || "");
								setIsOpen(false);
							}}
						>
							<Text className="text-sm text-foreground">{logic.reason}</Text>
						</Pressable>
					))}
				</View>
			)}
		</View>
	);
};
