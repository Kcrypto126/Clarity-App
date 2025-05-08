import React from "react";
import { View, Animated } from "react-native";
import { Text } from "@/components/ui/text";

interface AssessmentHeaderProps {
	title: string;
	description?: string;
	currentIndex: number;
	totalQuestions: number;
	progress: Animated.Value;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
	title,
	description,
	currentIndex,
	totalQuestions,
	progress,
}) => {
	return (
		<>
			<Animated.View
				style={{
					height: 4,
					backgroundColor: "hsl(var(--info))",
					width: progress.interpolate({
						inputRange: [0, 1],
						outputRange: ["0%", "100%"],
					}),
				}}
			/>

			<View className="px-4 py-3 border-b border-border">
				<View className="flex-row justify-between items-center">
					<Text className="text-base font-medium text-foreground">{title}</Text>
					<Text className="text-sm text-muted-foreground">
						{currentIndex + 1} of {totalQuestions}
					</Text>
				</View>
				{description && (
					<Text className="text-sm text-muted-foreground mt-1">
						{description}
					</Text>
				)}
			</View>
		</>
	);
};
