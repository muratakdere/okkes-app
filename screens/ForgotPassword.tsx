import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotPassword({ navigation }: any) {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Hata", "Email giriniz");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Başarılı", "Şifre sıfırlama maili gönderildi!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Şifremi Unuttum</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#888" style={{marginRight:8}}/>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity onPress={handleReset} style={{width:'100%'}}>
          <LinearGradient
            colors={['#f39c12', '#e74c3c']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Şifreyi Sıfırla</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f3f5", padding: 20 },
  card: { width: "100%", padding: 25, borderRadius: 20, backgroundColor: "#fff", shadowColor: "#000", shadowOffset: {width:0, height:3}, shadowOpacity: 0.1, shadowRadius: 10, elevation:5 },
  title: { fontSize: 26, fontWeight: "bold", color: "#e74c3c", marginBottom: 30, textAlign: "center" },
  inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 12, marginBottom: 15, backgroundColor: "#f9f9f9" },
  input: { flex: 1, height: 45 },
  button: { paddingVertical: 14, borderRadius: 10, marginBottom: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
