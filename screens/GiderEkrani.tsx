// screens/GiderEkrani.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Keyboard,
} from 'react-native';

// Tipleri tanımla
interface Expense {
  id: string;
  description: string;
  amount: number;
}

interface GiderEkraniProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>; // Gider ekleme fonksiyonu
}

const GiderEkrani: React.FC<GiderEkraniProps> = ({ setExpenses }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Gideri kaydetme fonksiyonu
  const handleAddExpense = () => {
    const amountNumber = parseFloat(amount.replace(',', '.')); // Virgülü noktaya çevir

    // Form kontrolleri
    if (!description || description.trim() === '') {
      Alert.alert('Hata', 'Lütfen bir gider açıklaması girin.');
      return;
    }
    if (isNaN(amountNumber) || amountNumber <= 0) {
      Alert.alert('Hata', 'Lütfen geçerli bir tutar girin.');
      return;
    }

    // Yeni Gider (Expense) objesi oluştur
    const newExpense: Expense = {
      id: Math.random().toString(36).substring(7), // Benzersiz ID
      description: description,
      amount: amountNumber,
    };

    // Ana App.tsx'deki 'expenses' state'ini güncelle
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    // Formu temizle ve klavyeyi kapat
    setDescription('');
    setAmount('');
    Keyboard.dismiss();

    Alert.alert('Başarılı', 'Gider kaydı eklendi.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Gider Ekle</Text>
        
        <Text style={styles.label}>Gider Açıklaması</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: Elektrik Faturası, Personel Maaşı"
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.label}>Gider Tutarı (TL)</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 1500"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric" // Sayısal klavye
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Gideri Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 8 },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d9534f', // Kırmızı (gider)
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GiderEkrani;