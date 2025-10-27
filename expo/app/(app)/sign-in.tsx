import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View, Pressable } from "react-native";
import * as z from "zod";
import { useRouter } from "expo-router";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

const formSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z
		.string()
		.min(8, "Please enter at least 8 characters.")
		.max(64, "Please enter fewer than 64 characters."),
});

export default function SignIn() {
	const { signInWithPassword } = useSupabase();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await signInWithPassword(data.email, data.password);

			form.reset();
		} catch (error: Error | any) {
			console.log(error.message);
		}
	}

	return (
		// <SafeAreaView className="flex-1 bg-background p-4">
		<View className="flex-1 justify-center bg-background p-4 gap-6">
			<H1 className="self-center">Sign In</H1>
			<Form {...form}>
				<View className="gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormInput
								label="Email"
								placeholder="Email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect={false}
								keyboardType="email-address"
								{...field}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormInput
								label="Password"
								placeholder="Password"
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
								{...field}
							/>
						)}
					/>
				</View>
				<Button
					size="default"
					variant="default"
					onPress={form.handleSubmit(onSubmit)}
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<ActivityIndicator size="small" />
					) : (
						<Text>Sign In</Text>
					)}
				</Button>
				<View className="items-center mt-4 flex-row justify-center">
					<Text>Don't have account? </Text>
					<Pressable onPress={() => router.push("/sign-up")}>
						<Text className="text-primary underline">Sign Up</Text>
					</Pressable>
				</View>
			</Form>
		</View>
		// </SafeAreaView>
	);
}
