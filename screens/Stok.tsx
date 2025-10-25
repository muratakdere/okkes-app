// screens/Stok.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView // SafeAreaView eklemek iyi bir pratiktir
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

// --- YENİ: TİPLER ---
// Bu tiplerin AppNavigator.tsx'deki ile AYNI olması gerekir.
// Tüm ekranların ihtiyaç duyduğu BİRLEŞTİRİLMİŞ Product tipi:
interface Product {
  id: string; 
  name: string;
  price: number;  // Satış ve Gelir/Gider için
  cost: number;   // Gelir/Gider için
  quantity: number; // Stok için
  unit: string;     // Stok için
}

// Bu bileşenin AppNavigator'dan alacağı prop'ları tanımlar
interface StokProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
// --- BİTİŞ: TİPLER ---


// --- YENİ: BİLEŞEN TANIMI ---
// 'export default function Stok()' yerine prop'ları alacak bu yapıyı kullanıyoruz:
const Stok: React.FC<StokProps> = ({ products, setProducts }) => {

  // --- KALDIRILDI ---
  // const initialStok = [...];
  // const [stok, setStok] = useState(initialStok);
  // Artık bu verilere gerek yok, çünkü prop'lardan geliyorlar.


  // renderItem fonksiyonu 'item' tipini Product olarak güncelledi
  const renderItem = ({ item }: { item: Product }) => (
    <LinearGradient colors={['#f5f6fa', '#dcdde1']} style={styles.card}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        {/* Stok verilerini 'products' prop'undan okuyoruz */}
        <Text style={styles.itemDetails}>Miktar: {item.quantity} {item.unit}</Text>
        <Text style={styles.itemDetails}>Birim Fiyat: {item.price}₺</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => Alert.alert('Düzenle', `Ürün: ${item.name}`)}>
          <MaterialIcons name="edit" size={24} color="#2980b9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 10 }}>
          <MaterialIcons name="delete" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Onay",
      "Bu ürünü silmek istiyor musunuz?",
      [
        { text: "İptal", style: "cancel" },
        // --- GÜNCELLEME: 'setStok' yerine 'setProducts' kullanıyoruz ---
        { text: "Sil", style: "destructive", onPress: () => setProducts(prev => prev.filter(item => item.id !== id)) }
      ]
    );
  };

  return (
    // SafeAreaView, ekranın çentik gibi alanlara taşmamasını sağlar
    <SafeAreaView style={styles.container}> 
      <Text style={styles.title}>Stok Listesi</Text>

      <FlatList
        // --- GÜNCELLEME: 'data={stok}' yerine 'data={products}' kullanıyoruz ---
        data={products} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert('Yeni Ürün', 'Burada yeni ürün eklemesi yapılacak.')}>
        <LinearGradient colors={['#f39c12', '#e67e22']} style={styles.addButtonGradient}>
          <MaterialIcons name="add" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Yeni Ürün Ekle</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Stil kodlarınızda değişiklik yok, sadece container'dan padding'i aldım
// ve SafeAreaView'e ekledim
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f3f5" }, // Padding buradan alındı
  safeArea: { flex: 1, backgroundColor: "#f0f3f5", padding: 20 }, // Padding buraya eklendi
  title: { fontSize: 26, fontWeight: "bold", color: "#e74c3c", marginBottom: 15, textAlign: "center" },
  card: { 
    padding: 15, 
    borderRadius: 15, 
    backgroundColor: "#fff", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  itemName: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  itemDetails: { fontSize: 14, color: "#7f8c8d" },
  actions: { flexDirection: "row" },
  addButton: { marginTop: 10, alignItems: "center" },
  addButtonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 14, borderRadius: 12 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});

export default Stok; // 'export default' sona eklendi