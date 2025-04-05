import React, { useState } from "react"
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native"
import { supabase } from "../../supabase/client"
import { Button, Input, Text } from "@rneui/themed"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert("Please check your inbox for email verification!")
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      {/* Logo and Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Clarity</Text>
        <Text style={styles.headerText}>{isSignUp ? "Time to find it." : "Log in"}</Text>
        <Text style={styles.subHeaderText}>
          {isSignUp
            ? "Begin your journey of self discovery."
            : "Welcome back! Please enter your details."}
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Input
          label="Email"
          labelStyle={styles.inputLabel}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Input
          label="Password"
          labelStyle={styles.inputLabel}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputField}
        />

        <Button
          title={isSignUp ? "Create account" : "Log in"}
          onPress={isSignUp ? signUpWithEmail : signInWithEmail}
          disabled={loading}
          loading={loading}
          buttonStyle={styles.mainButton}
          titleStyle={styles.buttonText}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchLink}>{isSignUp ? "Log in" : "Sign up"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 60,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -1,
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 12,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  inputLabel: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 44,
  },
  mainButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    height: 44,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  switchText: {
    color: "#6B7280",
    marginRight: 4,
  },
  switchLink: {
    color: "#000000",
    fontWeight: "500",
  },
})
