import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSupabase } from "@/context/supabase-provider";
import { useAssessmentStore } from "./intro-assessment";
import { supabase } from "@/config/supabase";
import { UserResponseInsert } from "@/types/supabase";

const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
	const router = useRouter();
	const { signUp } = useSupabase();
	const { responses, clearResponses } = useAssessmentStore();
	const [error, setError] = React.useState<string>();

	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignUpValues) => {
		try {
			setError(undefined);
			await signUp(values.email, values.password);

			// Get the newly created user's ID
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				// Store the assessment responses
				const { error: responsesError } = await supabase
					.from("user_responses")
					.insert(
						responses.map((response) => ({
							...response,
							user_id: user.id,
						})) satisfies UserResponseInsert[],
					);

				if (responsesError) {
					console.error("Error storing responses:", responsesError);
				}

				// Clear the temporary responses
				clearResponses();
			}
		} catch (e) {
			setError(
				e instanceof Error ? e.message : "An error occurred during sign up",
			);
		}
	};

	return (
		<View className="flex-1 justify-center bg-background p-4">
			<Form {...form}>
				<View className="gap-y-4">
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
					{error ? (
						<Text className="text-destructive text-center">{error}</Text>
					) : null}
					<Button onPress={form.handleSubmit(onSubmit)}>
						<Text>Sign Up</Text>
					</Button>
					<Button
						variant="secondary"
						onPress={() => {
							router.back();
						}}
					>
						<Text>Cancel</Text>
					</Button>
				</View>
			</Form>
		</View>
	);
}
