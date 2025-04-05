import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { ViewStyle, TextStyle, View } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"

interface IntroductoryAssessmentScreenProps extends AppStackScreenProps<"IntroductoryAssessment"> {}

export const IntroductoryAssessmentScreen: FC<IntroductoryAssessmentScreenProps> = observer(
  function IntroductoryAssessmentScreen() {
    const { themed } = useAppTheme()
    const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
    const [currentStep, setCurrentStep] = useState(0)

    // Basic demographic questions as defined in SUPABASE_SCHEMA.md
    const questions = [
      { id: "first_name", label: "What's your first name?", type: "text" },
      { id: "age", label: "What's your age?", type: "number" },
      { id: "gender", label: "What's your gender identity?", type: "text" },
      { id: "life_stage", label: "What's your current life stage?", type: "text" },
    ]

    const currentQuestion = questions[currentStep]

    const handleNext = () => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // TODO: Handle assessment completion
        // This will later connect to Supabase and unlock initial nodes
      }
    }

    return (
      <Screen
        preset="fixed"
        contentContainerStyle={[$styles.flex1, themed($screenContainer)]}
        safeAreaEdges={["top"]}
      >
        <View style={themed($topContainer)}>
          <Text text="Welcome to Clarity" preset="heading" style={themed($welcomeHeading)} />
          <Text
            text="Let's start with a few questions to personalize your journey"
            preset="subheading"
            style={themed($welcomeSubheading)}
          />
        </View>

        <View style={themed($contentContainer)}>
          <Text text={currentQuestion.label} preset="formLabel" />
          <TextField
            placeholder="Enter your answer"
            keyboardType={currentQuestion.type === "number" ? "numeric" : "default"}
          />
        </View>

        <View style={themed([$bottomContainer, $bottomContainerInsets])}>
          <Text text={`Question ${currentStep + 1} of ${questions.length}`} size="sm" />
          <Button
            text={currentStep === questions.length - 1 ? "Complete" : "Next"}
            preset="default"
            onPress={handleNext}
          />
        </View>
      </Screen>
    )
  },
)

const $screenContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl,
  paddingBottom: spacing.lg,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
  textAlign: "center",
})

const $welcomeSubheading: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.lg,
  textAlign: "center",
  color: colors.textDim,
})

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.lg,
  justifyContent: "center",
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  gap: spacing.sm,
})
