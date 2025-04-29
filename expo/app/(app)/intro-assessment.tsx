import { useRouter } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import { View, ScrollView, Animated, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { TextInput } from "@/components/ui/text-input";
import { client } from "@/sanity/client";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Image } from "@/components/image";

// Define the form schema based on our user table
const introFormSchema = z.object({
	first_name: z.string().min(1, "First name is required"),
	age: z.number().min(13, "Must be at least 13 years old"),
	gender: z.enum(["male", "female", "non-binary", "prefer_not_to_say"]),
	life_stage: z.enum([
		"student",
		"early-career",
		"mid-career",
		"late-career",
		"parent",
		"retiree",
	]),
	// Add dynamic fields for Sanity questions
	responses: z.record(z.string()),
});

type IntroFormData = z.infer<typeof introFormSchema>;

const baseFormSteps = [
	{
		id: "welcome",
		title: "Welcome to Clarity",
		description: "Let's get to know you better",
		progress: 0,
	},
	{
		id: "name",
		title: "What's your name?",
		description: "We'll use this to personalize your experience",
		field: "first_name",
		progress: 0.2,
	},
	{
		id: "age",
		title: "How old are you?",
		description: "This helps us tailor content to your life stage",
		field: "age",
		progress: 0.4,
	},
	{
		id: "gender",
		title: "What's your gender?",
		description: "Help us understand you better",
		field: "gender",
		progress: 0.6,
	},
	{
		id: "life_stage",
		title: "What best describes you?",
		description: "This will help us customize your journey",
		field: "life_stage",
		progress: 0.8,
	},
];

export default function IntroAssessmentScreen() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(0);
	const [responses, setResponses] = useLocalStorage("intro_responses", {});
	const progressAnimation = React.useRef(new Animated.Value(0)).current;

	// Fetch intro assessment questions from Sanity
	const { data: sanityQuestions, isLoading } = useQuery({
		queryKey: ["intro-assessment-questions"],
		queryFn: async () => {
			const query = `*[_type == "node" && type == "intro_assessment"] {
				_id,
				title,
				description,
				"questions": questions[] {
					_key,
					question,
					type,
					options
				}
			}`;
			return client.fetch(query);
		},
	});

	// Combine base steps with Sanity questions
	const formSteps = React.useMemo(() => {
		if (!sanityQuestions?.length) return baseFormSteps;

		const questionSteps = sanityQuestions[0].questions.map(
			(q: any, index: number) => ({
				id: q._key,
				title: q.question,
				description: "",
				field: `responses.${q._key}`,
				progress:
					0.8 + ((index + 1) / (sanityQuestions[0].questions.length + 1)) * 0.2,
				type: q.type,
				options: q.options,
			}),
		);

		return [...baseFormSteps, ...questionSteps];
	}, [sanityQuestions]);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<IntroFormData>({
		resolver: zodResolver(introFormSchema),
		mode: "onChange",
		defaultValues: {
			first_name: "",
			age: undefined,
			gender: undefined,
			life_stage: undefined,
			responses: {},
		},
	});

	const currentStepData = formSteps[currentStep];
	const formValues = watch();

	// Add logging for step changes
	React.useEffect(() => {
		console.log("Current step changed:", {
			currentStep,
			stepId: currentStepData?.id,
		});
	}, [currentStep, currentStepData]);

	// Add logging for Sanity data changes
	React.useEffect(() => {
		if (!isLoading) {
			console.log("Sanity questions loaded:", {
				questionCount: sanityQuestions?.length ?? 0,
				formStepsCount: formSteps.length,
			});
		}
	}, [sanityQuestions, isLoading, formSteps.length]);

	useLayoutEffect(() => {
		Animated.timing(progressAnimation, {
			toValue: currentStepData.progress,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [currentStep, currentStepData.progress, progressAnimation]);

	const onNext = React.useCallback(() => {
		console.log("onNext called", {
			currentStep,
			formStepsLength: formSteps.length,
		});
		if (currentStep < formSteps.length - 1) {
			// Get the next field
			const nextField = formSteps[currentStep + 1].field;

			// Reset the next field's value before moving to it
			if (nextField) {
				if (nextField.startsWith("responses.")) {
					setValue(`responses.${nextField.split(".")[1]}`, "");
				} else {
					// Set appropriate default values based on field type
					switch (nextField) {
						case "first_name":
							setValue(nextField, "");
							break;
						case "age":
							setValue(nextField, 0);
							break;
						case "gender":
							setValue(nextField, "prefer_not_to_say");
							break;
						case "life_stage":
							setValue(nextField, "student");
							break;
					}
				}
			}

			setCurrentStep((prev) => prev + 1);
		}
	}, [currentStep, formSteps, setValue]);

	const onBack = React.useCallback(() => {
		if (currentStep > 0) {
			// Get the previous field
			const prevField = formSteps[currentStep - 1].field;

			// Reset the previous field's value before moving to it
			if (prevField) {
				if (prevField.startsWith("responses.")) {
					setValue(`responses.${prevField.split(".")[1]}`, "");
				} else {
					// Set appropriate default values based on field type
					switch (prevField) {
						case "first_name":
							setValue(prevField, "");
							break;
						case "age":
							setValue(prevField, 0);
							break;
						case "gender":
							setValue(prevField, "prefer_not_to_say");
							break;
						case "life_stage":
							setValue(prevField, "student");
							break;
					}
				}
			}

			setCurrentStep((prev) => prev - 1);
		}
	}, [currentStep, formSteps, setValue]);

	const onSubmit = React.useCallback(
		async (data: IntroFormData) => {
			await setResponses({
				...responses,
				userData: data,
			});
			router.push("/sign-up");
		},
		[responses, router],
	);

	const renderStepContent = React.useCallback(() => {
		const step = formSteps[currentStep];

		if (step.id === "welcome") {
			return (
				<View className="flex-1 items-center justify-center gap-y-8">
					<Image
						source={require("@/assets/icon.png")}
						className="w-24 h-24 rounded-2xl"
					/>
					<View className="gap-y-4">
						<H1 className="text-4xl font-bold text-center">{step.title}</H1>
						<Muted className="text-xl text-center">{step.description}</Muted>
					</View>
					<Pressable
						onPress={() => {
							console.log("Get Started button pressed via Pressable");
							onNext();
						}}
						className="w-full h-14 rounded-xl bg-primary flex items-center justify-center"
					>
						<Text className="text-lg font-medium text-primary-foreground">
							Get Started
						</Text>
					</Pressable>
				</View>
			);
		}

		if (step.field === "first_name") {
			return (
				<View className="gap-y-8">
					<View className="gap-y-4">
						<H1 className="text-3xl font-bold text-center">{step.title}</H1>
						<Muted className="text-lg text-center">{step.description}</Muted>
					</View>
					<Controller
						control={control}
						name="first_name"
						render={({ field: { onChange, value } }) => (
							<TextInput
								label="First Name"
								onChangeText={onChange}
								value={value ?? ""}
								error={errors.first_name?.message}
								placeholder="Enter your first name"
								className="bg-card rounded-xl h-14 px-4 text-lg"
								autoFocus
								key={`first_name-${currentStep}`}
								defaultValue=""
							/>
						)}
					/>
				</View>
			);
		}

		if (step.field === "age") {
			return (
				<View className="gap-y-8">
					<View className="gap-y-4">
						<H1 className="text-3xl font-bold text-center">{step.title}</H1>
						<Muted className="text-lg text-center">{step.description}</Muted>
					</View>
					<Controller
						control={control}
						name="age"
						render={({ field: { onChange, value } }) => (
							<TextInput
								label="Age"
								keyboardType="numeric"
								onChangeText={(text) => {
									const num = parseInt(text, 10);
									onChange(isNaN(num) ? 0 : num);
								}}
								value={value === 0 ? "" : value?.toString()}
								error={errors.age?.message}
								placeholder="Enter your age"
								className="bg-card rounded-xl h-14 px-4 text-lg"
								autoFocus
								key={`age-${currentStep}`}
								defaultValue=""
							/>
						)}
					/>
				</View>
			);
		}

		if (step.field === "gender") {
			return (
				<View className="gap-y-8">
					<View className="gap-y-4">
						<H1 className="text-3xl font-bold text-center">{step.title}</H1>
						<Muted className="text-lg text-center">{step.description}</Muted>
					</View>
					<Controller
						control={control}
						name="gender"
						render={({ field: { onChange, value } }) => (
							<View className="gap-y-3">
								{["male", "female", "non-binary", "prefer_not_to_say"].map(
									(option) => (
										<Button
											key={option}
											variant={value === option ? "default" : "outline"}
											onPress={() => onChange(option)}
											className="w-full h-14 rounded-xl justify-start px-4"
										>
											<Text
												className={`text-lg ${
													value === option
														? "text-primary-foreground"
														: "text-foreground"
												}`}
											>
												{option
													.charAt(0)
													.toUpperCase()
													.concat(option.slice(1).replace("_", " "))}
											</Text>
										</Button>
									),
								)}
								{errors.gender && (
									<Text className="text-destructive text-sm text-center">
										{errors.gender.message}
									</Text>
								)}
							</View>
						)}
					/>
				</View>
			);
		}

		if (step.field === "life_stage") {
			return (
				<View className="gap-y-8">
					<View className="gap-y-4">
						<H1 className="text-3xl font-bold text-center">{step.title}</H1>
						<Muted className="text-lg text-center">{step.description}</Muted>
					</View>
					<Controller
						control={control}
						name="life_stage"
						render={({ field: { onChange, value } }) => (
							<View className="gap-y-3">
								{[
									"student",
									"early-career",
									"mid-career",
									"late-career",
									"parent",
									"retiree",
								].map((option) => (
									<Button
										key={option}
										variant={value === option ? "default" : "outline"}
										onPress={() => onChange(option)}
										className="w-full h-14 rounded-xl justify-start px-4"
									>
										<Text
											className={`text-lg ${
												value === option
													? "text-primary-foreground"
													: "text-foreground"
											}`}
										>
											{option
												.charAt(0)
												.toUpperCase()
												.concat(option.slice(1).replace("-", " "))}
										</Text>
									</Button>
								))}
								{errors.life_stage && (
									<Text className="text-destructive text-sm text-center">
										{errors.life_stage.message}
									</Text>
								)}
							</View>
						)}
					/>
				</View>
			);
		}

		// Render Sanity questions
		if (step.field?.startsWith("responses.")) {
			const questionKey = step.field.split(".")[1];
			return (
				<View className="gap-y-8">
					<View className="gap-y-4">
						<H1 className="text-3xl font-bold text-center">{step.title}</H1>
						{step.description && (
							<Muted className="text-lg text-center">{step.description}</Muted>
						)}
					</View>
					<Controller
						control={control}
						name={step.field as any}
						render={({ field: { onChange, value } }) => (
							<View className="gap-y-3">
								{step.type === "multiple_choice" &&
									step.options?.map((option: string) => (
										<Button
											key={option}
											variant={value === option ? "default" : "outline"}
											onPress={() => onChange(option)}
											className="w-full h-14 rounded-xl justify-start px-4"
										>
											<Text
												className={`text-lg ${
													value === option
														? "text-primary-foreground"
														: "text-foreground"
												}`}
											>
												{option}
											</Text>
										</Button>
									))}
								{step.type === "text" && (
									<TextInput
										value={value ?? ""}
										onChangeText={onChange}
										placeholder="Type your answer"
										className="bg-card rounded-xl h-14 px-4 text-lg"
										multiline
										key={`${step.field}-${currentStep}`}
										defaultValue=""
									/>
								)}
							</View>
						)}
					/>
				</View>
			);
		}

		return null;
	}, [currentStep, formSteps, control, errors]);

	const canProceed = React.useCallback(() => {
		if (currentStep === 0) return true;
		const field = formSteps[currentStep].field as keyof IntroFormData;
		if (field?.startsWith("responses.")) {
			const value = formValues.responses?.[field.split(".")[1]];
			return !!value;
		}
		return !!formValues[field] && !errors[field];
	}, [currentStep, formValues, errors, formSteps]);

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-background">
				<View className="flex-1 items-center justify-center">
					<Text>Loading questions...</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			{/* Progress Bar */}
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
				<View className="flex-1 justify-center py-8 web:m-4">
					{renderStepContent()}

					{/* Navigation Buttons */}
					{currentStep > 0 && (
						<View className="flex-row gap-x-3 mt-8">
							<Button
								onPress={onBack}
								variant="outline"
								className="flex-1 h-14 rounded-xl"
							>
								<Text className="text-lg font-medium">Back</Text>
							</Button>
							<Button
								onPress={
									currentStep === formSteps.length - 1
										? handleSubmit(onSubmit)
										: onNext
								}
								disabled={!canProceed()}
								className="flex-1 h-14 rounded-xl"
								variant="default"
							>
								<Text className="text-lg font-medium text-primary-foreground">
									{currentStep === formSteps.length - 1 ? "Continue" : "Next"}
								</Text>
							</Button>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
