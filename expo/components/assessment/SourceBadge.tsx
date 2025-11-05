import React from "react";
import { Pressable, View, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Modal } from "@/components/ui/modal";
import { Info, ExternalLink } from "lucide-react-native";
import { Source } from "@/types/sanity/sanity";

export const SourceBadge: React.FC<{ source: Source | null }> = ({
	source,
}) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	if (!source) return null;

	return (
		<>
			<Pressable
				className="flex-row items-center bg-source-badge rounded-full px-3 py-1 ml-2 mt-1"
				style={{
					minHeight: 32,
					...(Platform.OS === "ios"
						? {
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 1 },
								shadowOpacity: 0.1,
								shadowRadius: 1,
							}
						: { elevation: 1 }),
				}}
				onPress={() => setIsModalVisible(true)}
			>
				<Info size={14} color="hsl(var(--source-badge-foreground))" />
				<Text className="text-xs font-medium text-source-badge-foreground ml-1">
					Source
				</Text>
			</Pressable>

			<Modal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				title="Source Information"
			>
				<View className="space-y-4">
					<View>
						<Text className="text-lg font-semibold text-foreground">
							{source.title}
						</Text>
						{source.institution && (
							<Text className="text-sm text-muted-foreground mt-1">
								{source.institution}
							</Text>
						)}
					</View>

					{source.authors && source.authors.length > 0 && (
						<View>
							<Text className="text-sm font-medium text-foreground">
								Authors
							</Text>
							<Text className="text-sm text-muted-foreground">
								{source.authors.join(", ")}
							</Text>
						</View>
					)}

					{source.description && (
						<Text className="text-sm text-foreground">
							{source.description}
						</Text>
					)}

					{source.url && (
						<Pressable
							className="flex-row items-center mt-2 py-1"
							style={{ minHeight: 44 }}
							onPress={() => {
								// Handle URL opening
							}}
						>
							<ExternalLink
								size={16}
								color="hsl(var(--info))"
								style={{ marginRight: 4 }}
							/>
							<Text className="text-sm text-info">View Source</Text>
						</Pressable>
					)}
				</View>
			</Modal>
		</>
	);
};
