import React from "react";
import { View, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "@/components/safe-area-view";
import { useNodesByType } from "@/hooks/nodes";

export default function IntroAssessmentScreen() {
	const progressAnimation = React.useRef(new Animated.Value(0)).current;

	const { data: nodes } = useNodesByType("intro_assessment");

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
				<View className="flex-1 justify-center py-8 web:m-4"></View>
			</ScrollView>
		</SafeAreaView>
	);
}
