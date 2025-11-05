import React from "react";
import { Pressable, View, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Modal } from "@/components/ui/modal";
import { HelpCircle } from "lucide-react-native";

interface QuestionTooltipProps {
	notes: string | null;
}

export const QuestionTooltip: React.FC<QuestionTooltipProps> = ({ notes }) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	if (!notes) return null;

	return (
		<>
			<Pressable
				className="absolute right-0 top-0 z-10"
				hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
				onPress={() => setIsModalVisible(true)}
			>
				<View
					className="bg-tooltip-background rounded-full p-2"
					style={{
						...(Platform.OS === "ios"
							? {
									shadowColor: "#000",
									shadowOffset: { width: 0, height: 1 },
									shadowOpacity: 0.1,
									shadowRadius: 2,
								}
							: { elevation: 2 }),
					}}
				>
					<HelpCircle size={16} />
				</View>
			</Pressable>

			<Modal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			>
				<Text className="text-foreground">{notes}</Text>
			</Modal>
		</>
	);
};
