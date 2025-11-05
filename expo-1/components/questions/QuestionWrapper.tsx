import React from "react";
import { View, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { H2, Muted } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionWrapperProps {
	children: React.ReactNode;
	title: string;
	notes?: string;
	isLoading?: boolean;
	onSkip?: (reason: string) => void;
	skipLogic?: Array<{ reason: string }>;
	className?: string;
}

export function QuestionWrapper({
	children,
	title,
	notes,
	isLoading,
	onSkip,
	skipLogic,
	className,
}: QuestionWrapperProps) {
	console.log("QuestionWrapper", title, notes);
	return (
		<View className={cn("flex flex-col", className)}>
			{/* Question Content */}
			<View>{children}</View>

			{/* Skip Button */}
			{skipLogic && skipLogic.length > 0 && (
				<View>
					<Button
						onPress={() => onSkip?.(skipLogic[0]?.reason || "Skipped")}
						variant="ghost"
						className="w-full"
						disabled={isLoading}
					>
						<Text className="text-muted-foreground">Skip</Text>
					</Button>
				</View>
			)}
		</View>
	);
}
