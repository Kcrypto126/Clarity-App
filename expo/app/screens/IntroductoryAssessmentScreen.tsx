import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Screen, Text, TextField, Logo, Header } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { supabase } from "@/supabase/client"

interface IntroductoryAssessmentScreenProps extends AppStackScreenProps<"IntroductoryAssessment"> {}

export const IntroductoryAssessmentScreen: FC<IntroductoryAssessmentScreenProps> = observer(
  function IntroductoryAssessmentScreen() {
    const {
      theme: { colors },
    } = useAppTheme()
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})

    const handleLogout = async () => {
      await supabase.auth.signOut()
    }

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

    const handleAnswerChange = (value: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }))
    }

    return (
      <Screen style={styles.screen} safeAreaEdges={["top", "bottom"]}>
        <View style={styles.container}>
          <Header
            rightText="Logout"
            onRightPress={handleLogout}
            rightIconColor="#6B7280"
            style={styles.header}
          />

          {/* Logo and Header */}
          <View style={styles.headerContainer}>
            <Logo style={styles.logoMargin} />
            <Text style={styles.headerText} text="Let's get to know you" />
            <Text
              style={styles.subHeaderText}
              text="Answer a few questions to personalize your journey"
            />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextField
              label={currentQuestion.label}
              LabelTextProps={{ style: styles.inputLabel }}
              value={answers[currentQuestion.id]}
              onChangeText={handleAnswerChange}
              autoCapitalize="none"
              keyboardType={currentQuestion.type === "number" ? "numeric" : "default"}
              containerStyle={styles.inputContainer}
              inputWrapperStyle={styles.inputWrapper}
              placeholder="Enter your answer"
            />

            <View style={styles.progressContainer}>
              <Text
                size="sm"
                style={styles.progressText}
                text={`Question ${currentStep + 1} of ${questions.length}`}
              />
            </View>

            <Button
              text={currentStep === questions.length - 1 ? "Complete" : "Next"}
              onPress={handleNext}
              disabled={!answers[currentQuestion.id]}
              style={styles.mainButton}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  logoMargin: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
    color: "#000000",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  formContainer: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputWrapper: {
    borderColor: "#6B7280",
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 16,
  },
  progressContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  progressText: {
    color: "#6B7280",
  },
  mainButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    height: 44,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
})
