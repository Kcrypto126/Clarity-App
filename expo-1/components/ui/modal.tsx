import React from "react";
import {
	Modal as RNModal,
	View,
	Pressable,
	ScrollView,
	StyleSheet,
} from "react-native";
import { Text } from "./text";
import { XIcon } from "lucide-react-native";

interface ModalProps {
	isVisible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
	isVisible,
	onClose,
	title,
	children,
}) => {
	return (
		<RNModal
			animationType="fade"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View className="flex-1 justify-center items-center bg-foreground/50">
				<View className="w-[90%] max-w-md bg-background rounded-lg shadow-xl">
					<View
						className={`flex-row items-center p-4 ${
							title ? "justify-between border-b border-border" : "justify-end"
						}`}
					>
						{title && (
							<Text className="text-lg font-semibold text-foreground">
								{title}
							</Text>
						)}
						<Pressable
							onPress={onClose}
							className="rounded-full p-2 hover:bg-secondary"
						>
							<XIcon className="w-5 h-5 text-foreground" />
						</Pressable>
					</View>

					<ScrollView className="p-4 max-h-[80vh]">{children}</ScrollView>
				</View>
			</View>
		</RNModal>
	);
};
