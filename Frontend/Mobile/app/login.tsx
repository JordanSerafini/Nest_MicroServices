import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { url } from "./utils/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { postLogs } from "./utils/functions/logs_function";
import { setup } from "./utils/functions/setup_function";

const sli = require("./assets/sli.jpg");
const bg = require("./assets/loginBg.png");

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("jordan@solution-logique.fr");
  const [password, setPassword] = useState("pass123");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${url.api_gateway}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      //console.log("Login response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error logging in");
      }
      const data = await response.json();
      //console.log("Login successful:", data);
      const token = data.access_token;
      const user = data.user;
      if (!token) {
        //await postLogs(new Error("Token not found in response"));
        throw new Error("Token not found in response");
      }
      if (!user) {
        //await postLogs(new Error("User information not found in response"));
        throw new Error("User information not found in response");
      }

      const start = new Date().getTime(); 
      const end = new Date().getTime(); 
      const duration = end - start; 
      console.log(`Setup took ${duration} milliseconds`);
      
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      
      await setup();
      router.push("/home");
    } catch (error: any) {
      //await postLogs(error);
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={bg}
      className="h-full w-full bg-cover bg-center"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View className="h-5/10 w-full flex items-center justify-center">
        <View className="w-9/10 h-10/10 flex items-center justify-center">
          <Image source={sli} className=" rounded-full h-5/10 w-10/10" />
        </View>
        <View className="h-5/10 w-9.5/10 items-center justify-center flex gap-6">
          <View className="items-center justify-center flex w-full gap-2">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              className="p-2 bg-white rounded- w-full shadow-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            className=" bg-blue-500 text-white py-3 px-6 shadow-md w-full rounded-full"
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
