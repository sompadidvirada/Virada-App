import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { singIn } from "@/lib/appwrite";
import * as Sentry from '@sentry/react-native';
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SingIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const sumit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter valid email address & password.");
      return
    }
    
    setIsSubmitting(true);
    try {
      await singIn({email: form.email, password: form.password })
      router.replace("/");
    } catch (error) {
      const errorMessage = (error instanceof Error && error.message) ? error.message : 'An unexpected error occurred.';
      Alert.alert('Error', errorMessage);
      Sentry.captureException(error)
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter Your Email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter Your Password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sing In" isLoading={isSubmitting} onPress={sumit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          {" "}
          Don't have an account?
        </Text>
        <Link href="/sing-up" className="base-bold text-primary">
          SingUp
        </Link>
      </View>
    </View>
  );
};

export default SingIn;
