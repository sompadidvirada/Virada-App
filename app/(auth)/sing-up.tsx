import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SingUn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name:"" });

  const sumit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter valid email address & password.");
      return
    }
    setIsSubmitting(true);

    try {

      await createUser({
        email: form.email,
        password: form.password,
        name: form.name
      })

      Alert.alert("success", "User sing ing Successfully!!");
      router.replace("/");
    } catch (error) {
      Alert.alert('Error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter Your Fullname"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Fullname"
      />
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
      <CustomButton title="Sing Up" isLoading={isSubmitting} onPress={sumit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          {" "}
         Already have account?
        </Text>
        <Link href="/sing-in" className="base-bold text-primary">
          SingIn
        </Link>
      </View>
    </View>
  );
};

export default SingUn;
