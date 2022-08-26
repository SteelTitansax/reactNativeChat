import React, {useLayoutEffect, useState} from "react"
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image} from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import {auth} from "../firebase";


const RegisterScreen = ({navigation}) => 
    {
        const [name,setName] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [imageUrl,setImageUrl] = useState("");

        useLayoutEffect(()=> {
            navigation.setOptions({
                headerBackTitle:"Back to Login",
            });

        }, [navigation]);

        const register = () => {
            auth
            .createUserWithEmailAndPassword(email,password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                });
            })
            .catch((error) => alert(error.message));
        };

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text  h3 style={{marginBottom: 50 }}>
                    Create a Signal Account
                </Text>

                <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                <Input 
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input 
                    placeholder="Password"
                    autoFocus
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Input 
                    placeholder="Profile picture URL (optional)"
                    autoFocus
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
                </View>

                <Button 
                containerStyle={styles.button}
                raised onPress={register} title="Register" />
                <View style={{height:100}}/>
            </KeyboardAvoidingView>
            );

    };

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor:"white",
    },
    button:  {
        width:200,
        marginTop:10,
    },
});