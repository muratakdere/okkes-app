// screens/SatisEkrani.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform // <-- 1. ÇÖZÜM: Platform'u import et
} from 'react-native';

// App.tsx'den gelecek tipleri ve prop'ları tanımla
interface Product {
  id: string; 
  name: string;
  price: number; 
  cost: number;
  quantity: number; // Bu tiplerin AppNavigator ile eşleştiğinden emin olun
  unit: string;
}

interface Sale {
  id: string;
  productId: string;
  quantity: number;
  salePrice: number;
}

interface SatisEkraniProps {
  products: Product[]; // Satılacak ürünlerin listesi
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>; // Satış ekleme fonksiyonu
}

const SatisEkrani: React.FC<SatisEkraniProps> = ({ products, setSales }) => {

  // Bir ürüne tıklandığında bu fonksiyon çalışır
  const handleAddSale = (product: Product) => {
    
    // --- 2. ÇÖZÜM: Girilen adeti işleyen bir yardımcı fonksiyon oluştur ---
    const processQuantity = (text: string | null) => {
      // Eğer kullanıcı web'de 'iptal'e basarsa text 'null' gelir
      if (text === null) {
        return; 
      }
      
      const quantity = parseInt(text, 10); // Girilen metni sayıya çevir

      // Geçerli bir sayı girildiyse
      if (!isNaN(quantity) && quantity > 0) {
        // Yeni bir Satış (Sale) objesi oluştur
        const newSale: Sale = {
          id: Math.random().toString(36).substring(7), // Benzersiz ID
          productId: product.id,
          quantity: quantity,
          salePrice: product.price, // Satışı o anki ürün fiyatından yap
        };

        // Ana AppNavigator'daki 'sales' state'ini güncelle
        setSales((prevSales) => [newSale, ...prevSales]);

        Alert.alert('Başarılı', `${quantity} adet ${product.name} satışı eklendi.`);
      } else {
        Alert.alert('Hata', 'Lütfen geçerli bir adet girin.');
      }
    };

    // --- 3. ÇÖZÜM: Platforma göre hangi prompt'u kullanacağına karar ver ---
    if (Platform.OS === 'web') {
      // Platform WEB ise: Tarayıcının 'window.prompt'unu kullan
      const textInput = window.prompt(`Kaç adet ${product.name} satıldı?`, '1');
      processQuantity(textInput);
    } else {
      // Platform MOBIL (iOS/Android) ise: 'Alert.prompt'u kullan
      Alert.prompt(
        `${product.name} Satışı`,
        'Kaç adet satıldı?',
        (text) => processQuantity(text), // Girilen adeti işle
        'plain-text', // Sadece metin girişi
        '1', // Varsayılan değer
        'numeric' // Sayısal klavye
      );
    }
  };

  // Ürünleri listele
  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => handleAddSale(item)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price.toFixed(2)} TL</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Satış Ekle (Gelir)</Text>
        <Text style={styles.subtitle}>Gelir eklemek için bir ürüne tıklayın:</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

// --- STİLLER (Değişiklik yok) ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  list: { flex: 1 },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemName: { fontSize: 18, fontWeight: '500' },
  itemPrice: { fontSize: 16, color: '#007AFF' },
});

export default SatisEkrani;