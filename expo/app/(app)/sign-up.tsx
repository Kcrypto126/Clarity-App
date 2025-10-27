import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSupabase } from "@/context/supabase-provider";
import { useAssessmentStore } from "./intro-assessment";
import { supabase } from "@/config/supabase";
// import { UserResponseInsert } from "@/types/supabase"; // Remove if unused
import { H1 } from "@/components/ui/typography";

// Use same password requirements as sign-in
const signUpSchema = z
	.object({
		email: z.string().email("Please enter a valid email address."),
		password: z
			.string()
			.min(8, "Please enter at least 8 characters.")
			.max(64, "Please enter fewer than 64 characters."),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters.")
			.max(64, "Please enter fewer than 64 characters."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
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
			confirmPassword: "",
		},
		mode: "onChange", // Ensures formState.isValid always up-to-date
	});

	async function onSubmit(values: SignUpValues) {
		setError(undefined);

		try {
			await signUp(values.email, values.password);
			const {
				data: { user },
				error: getUserError,
			} = await supabase.auth.getUser();

			if (getUserError) {
				setError(getUserError.message || "An error occurred during sign up");
				return;
			}

			if (user) {
				form.reset();
				router.replace("/sign-in");
			}
		} catch (e: any) {
			setError(e instanceof Error ? e.message : "An error occurred during sign up");
		}
	}

	return (
		<View className="flex-1 justify-center bg-background p-4 gap-6">
			<H1 className="self-center">Sign Up</H1>
			<Form {...form}>
				<View className="gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<>
								<FormInput
									label="Email"
									placeholder="Email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect={false}
									keyboardType="email-address"
									{...field}
								/>
								{form.formState.errors.email?.message && (
									<Text className="text-destructive mt-1">{form.formState.errors.email.message}</Text>
								)}
							</>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<>
								<FormInput
									label="Password"
									placeholder="Password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									{...field}
								/>
								{form.formState.errors.password?.message && (
									<Text className="text-destructive mt-1">{form.formState.errors.password.message}</Text>
								)}
							</>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<>
								<FormInput
									label="Confirm Password"
									placeholder="Confirm Password"
									autoCapitalize="none"
									autoCorrect={false}
									secureTextEntry
									{...field}
								/>
								{form.formState.errors.confirmPassword?.message && (
									<Text className="text-destructive mt-1">{form.formState.errors.confirmPassword.message}</Text>
								)}
							</>
						)}
					/>
					{error ? (
						<Text className="text-destructive text-center">{error}</Text>
					) : null}
					<Button
						size="default"
						variant="default"
						onPress={form.handleSubmit(onSubmit)}
						disabled={form.formState.isSubmitting}
					>
						<View className="flex-row items-center justify-center">
							{form.formState.isSubmitting ? (
								<ActivityIndicator size="small" />
							) : (
								<Text>Sign Up</Text>
							)}
						</View>
					</Button>
					<View className="items-center mt-4 flex-row justify-center">
						<Text>Already have account? </Text>
						<Pressable onPress={() => router.push("/sign-in")}>
							<Text className="text-primary underline">Sign In</Text>
						</Pressable>
					</View>
				</View>
			</Form>
		</View>
	);
}
