import {
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signIn } from "../store/reducers/AuthSlice";
import { auth } from "../../config/firebase";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email."),
  password: Yup.string()
    .min(6, "Must contain  minimum 6 characters")
    .required("Please enter your password"),
});

export default function SignInScreen({ route }) {
  const { promptAsync } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(selectAuth);

  // const signIn = async (data) => {
  //   const { email, password } = data;

  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       console.log("sign in", userCredential._tokenResponse.idToken);
  //       dispatch(signIn(userCredential._tokenResponse.idToken));
  //       // await AsyncStorage.setItem(
  //       //   "@user",
  //       //   JSON.stringify(userCredential._tokenResponse.idToken)
  //       // );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const signInFunc = async (data) => {
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("sign in", userCredential._tokenResponse.idToken);
      console.log("Sign in Auth ", userId);
      dispatch(signIn(userCredential._tokenResponse.idToken));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View className="bg-white flex-1 ">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="items-center mt-24 mx-5 ">
        <Text className=" text-2xl text-[#1e6aca] font-bold">Sign In</Text>
        <Text className="my-3">Please login to continue using our app</Text>

        {/* Formik  */}
        <Formik
          initialValues={{ email: "", password: "" }}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(data) => signInFunc(data)}
          validationSchema={SignupSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldTouched,
          }) => (
            <View className="w-full">
              <View className="border w-full border-gray-500 p-3 rounded-[24px] mt-5">
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  value={values.email}
                  placeholder="Email"
                />
              </View>
              {touched.email && errors.email && (
                <View className=" items-end px-4">
                  <Text className="text-red-600 ">{errors.email}</Text>
                </View>
              )}

              <View className="border w-full border-gray-500 p-3 rounded-[24px] mt-5">
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  value={values.password}
                  placeholder="Password"
                />
              </View>
              {touched.password && errors.password && (
                <View className=" items-end px-4">
                  <Text className="text-red-600 ">{errors.password}</Text>
                </View>
              )}

              <TouchableOpacity
                disabled={!isValid}
                onPress={handleSubmit}
                title="submit"
                className="bg-[#1e6aca] items-center justify-center p-4 mt-5 rounded-[24px]"
              >
                <Text className="text-white text-[16px] font-semibold">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            //  <View>
            //    <TextInput
            //      onChangeText={handleChange('email')}
            //      onBlur={handleBlur('email')}
            //      value={values.email}
            //    />
            //    <Button onPress={handleSubmit} title="Submit" />
            //  </View>
          )}
        </Formik>

        {/* <View className="w-full">
          <View className="border w-full border-gray-500 p-3 rounded-[24px] mt-5">
            <TextInput onChange={handleChange} onBlur={handleBlur} value={values.email}  placeholder="Email" />
          </View>
          <View className="border w-full border-gray-500 p-3 rounded-[24px] mt-5">
            <TextInput onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder="Password" />
          </View>

          <Pressable className="bg-[#1e6aca] items-center justify-center p-4 mt-5 rounded-[24px]" onPress={handleSubmit} disabled={isSubmitting}>
            <Text className="text-white text-[16px] font-semibold">Login</Text>
          </Pressable>
        </View> */}

        <Text className="text-lg my-3">or</Text>

        <View className="w-full">
          <Pressable
            onPress={() => promptAsync()}
            className="border flex-row items-center justify-center w-full border-gray-500 p-3 rounded-[24px] mt-3"
          >
            <Image
              source={require("./../../assets/google-logo.png")}
              className="w-[30] h-[30] mr-3"
            />
            <Text>Continue with Google</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate("SignUp")}
          className="flex-row mt-5"
        >
          <Text className="font-medium">Don't have have an account?</Text>
          <Text className="font-medium text-[#1e6aca] font-bold"> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
