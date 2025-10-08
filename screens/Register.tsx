import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

export default function Register({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Email ve şifre giriniz");
      return;
    }
     if (password !== confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Başarılı", "Hesap oluşturuldu!");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Kayıt Ol</Text>

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

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#888" style={{marginRight:8}}/>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Şifre"
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#888" style={{marginRight:8}}/>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Şifre Tekrar"
            style={styles.input}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleRegister} style={{width:'100%'}}>
          <LinearGradient
            colors={['#f39c12', '#e74c3c']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
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
  linkText: { color: "#2980b9", fontSize: 14, textAlign:"center" },
});
