import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Email ve şifre giriniz");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error: any) {
      Alert.alert("Hata", "Email veya şifre yanlış");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ökkeş Stok Uygulaması</Text>

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

        <TouchableOpacity onPress={handleLogin} style={{width:'100%'}}>
          <LinearGradient
            colors={['#f39c12', '#e74c3c']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>Hesap oluştur</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.linkText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f3f5",
    padding: 20,
  },
  card: {
    width: "100%",
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation:5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 45,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  linkText: {
    color: "#2980b9",
    fontSize: 14,
  },
});



