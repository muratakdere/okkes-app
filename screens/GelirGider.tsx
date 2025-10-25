// screens/GelirGider.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView, 
} from 'react-native';

// Grafik kütüphanesi
import { BarChart } from 'react-native-chart-kit';

// Dosya sistemi kütüphaneleri
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

// --- TypeScript Tipleri ---
// Tipleri App.tsx'den import edebilir veya burada tekrar tanımlayabilirsiniz.
// Temizlik açısından import etmek daha iyidir, ancak basitlik için kopyalıyorum.
interface Product {
  id: string; 
  name: string;
  price: number; 
  cost: number;  
  quantity: number;
  unit: string;
}

interface Sale {
  id: string;
  productId: string;
  quantity: number;
  salePrice: number;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
}

interface ExcelRow {
  UrunAdi: string;
  SatisFiyati: number;
}

// Bu bileşenin App.tsx'den alacağı Props (özellikler)
interface ProductManagementScreenProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sales: Sale[];
  expenses: Expense[];
}

// Ekran genişliğini al (Grafik için)
const screenWidth = Dimensions.get('window').width;

// --- Bileşen (Component) ---
const ProductManagementScreen: React.FC<ProductManagementScreenProps> = ({ 
  products, 
  setProducts,
  sales = [],      // HATA ÇÖZÜMÜ 1: Prop gelmezse diye varsayılan boş dizi ata
  expenses = []    // HATA ÇÖZÜMÜ 1: Prop gelmezse diye varsayılan boş dizi ata
}) => {
  
  const [editingCost, setEditingCost] = useState<{ id: string; cost: string } | null>(null);

  /**
   * @memo calculationResults
   * @description 'products', 'sales' veya 'expenses' değiştiğinde
   * Gelir, Gider ve Kâr'ı yeniden hesaplar.
   */
  const { toplamGelir, toplamGider, netKar } = useMemo(() => {
    
    // HATA ÇÖZÜMÜ 2: 'sales' ve 'expenses' artık '[]' (boş dizi) olarak garanti altında.
    // .reduce() fonksiyonu artık 'undefined' üzerinde çağrılmayacak.
    
    const gelir = sales.reduce((sum, sale) => {
      return sum + (sale.salePrice * sale.quantity);
    }, 0);

    const toplamMaliyet = sales.reduce((sum, sale) => {
      const product = products.find(p => p.id === sale.productId);
      const cost = product ? product.cost : 0;
      return sum + (cost * sale.quantity);
    }, 0);

    const digerGiderler = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const gider = toplamMaliyet + digerGiderler;
    const kar = gelir - gider;

    return { 
      toplamGelir: gelir, 
      toplamGider: gider, 
      netKar: kar 
    };

  }, [products, sales, expenses]);


  // Grafik verisi (Hesaplanan sonuçlara göre)
  const chartData = {
    labels: ['Gelir', 'Gider', 'Net Kâr'],
    datasets: [
      {
        data: [toplamGelir, toplamGider, netKar],
        colors: [
          (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Yeşil (Gelir)
          (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Kırmızı (Gider)
          (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Mavi (Kâr)
        ]
      },
    ],
  };

  /**
   * @function handleExcelImport
   * @description Excel'den Fiyat Listesi Yükleme.
   * Tüm TypeScript hataları (type, uri, Encoding) düzeltildi.
   */
  const handleExcelImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        copyToCacheDirectory: true,
      });

      // DÜZELTME (Yeni Expo API):
      if (!result.canceled && result.assets && result.assets.length > 0) {
        
        // DÜZELTME (Yeni Expo API):
        const fileUri = result.assets[0].uri;

        // DÜZELTME (Yeni Expo API + String Kullanımı):
        const base64Data = await FileSystem.readAsStringAsync(fileUri, {
          encoding: 'base64', // Enum ('Encoding' veya 'EncodingType') yerine string kullanmak en garantisidir.
        });

        const workbook = XLSX.read(base64Data, { type: 'base64' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);
        
        updateProductsFromExcel(jsonData);

        Alert.alert('Başarılı', 'Fiyat listesi başarıyla güncellendi.');
      }
    } catch (error) {
      console.error("Excel okuma hatası:", error);
      Alert.alert('Hata', 'Dosya okunurken bir hata oluştu.');
    }
  };

  /**
   * @function updateProductsFromExcel
   * @description Excel'den gelen veriye göre 'products' state'ini günceller
   */
  const updateProductsFromExcel = (excelData: ExcelRow[]) => {
    setProducts(currentProducts => {
      const productMap = new Map<string, Product>();
      currentProducts.forEach(p => productMap.set(p.name.toLowerCase(), p));

      excelData.forEach(row => {
        if (!row.UrunAdi || typeof row.SatisFiyati !== 'number') return; 
        
        const productNameLower = row.UrunAdi.toLowerCase();
        const existingProduct = productMap.get(productNameLower);

        if (existingProduct) {
          existingProduct.price = row.SatisFiyati;
          productMap.set(productNameLower, existingProduct);
        } else {
        // Ürün yok -> Yeni bir ürün objesi oluştur ve Map'e ekle
        const newProduct: Product = {
          id: Math.random().toString(36).substring(7), 
          name: row.UrunAdi,
          price: row.SatisFiyati,
          cost: 0, // Maliyet 0 olarak başlar
          quantity: 0, // <-- BU SATIRI EKLEYİN (varsayılan miktar)
          unit: 'adet',  // <-- BU SATIRI EKLEYİN (varsayılan birim)
        };
          productMap.set(productNameLower, newProduct);
        }
      });
      return Array.from(productMap.values());
    });
  };

  /**
   * @function handleCostChange
   * @description Maliyet TextInput'u değişimini yönetir
   */
  const handleCostChange = (productId: string, text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setEditingCost({ id: productId, cost: numericValue });
  };

  /**
   * @function handleCostSubmit
   * @description Maliyet girişi bitince state'i günceller
   */
  const handleCostSubmit = () => {
    if (!editingCost) return;
    const newCost = parseFloat(editingCost.cost) || 0; 
    setProducts(currentProducts =>
      currentProducts.map(p =>
        p.id === editingCost.id ? { ...p, cost: newCost } : p
      )
    );
    setEditingCost(null); 
  };

  /**
   * @function renderProductItem
   * @description Fiyat listesini (FlatList) render eder
   */
  const renderProductItem = ({ item }: { item: Product }) => {
    const isEditing = editingCost?.id === item.id;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Satış Fiyatı: {item.price.toFixed(2)} TL</Text>
        </View>
        <View style={styles.itemCostContainer}>
          <Text style={styles.costLabel}>Maliyet (TL):</Text>
          <TextInput
            style={[styles.costInput, isEditing && styles.costInputEditing]}
            placeholder="0.00"
            keyboardType="numeric"
            value={isEditing ? editingCost.cost : item.cost.toString()}
            onChangeText={(text) => handleCostChange(item.id, text)}
            onEndEditing={handleCostSubmit} 
            onFocus={() => setEditingCost({ id: item.id, cost: item.cost.toString() })} 
          />
        </View>
      </View>
    );
  };

  // --- Bileşenin Ana JSX Çıktısı ---
  return (
    // SafeAreaView burada gereksiz çünkü App.tsx'de zaten var,
    // ancak ekranı bağımsız yapmak için kalabilir.
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        
        {/* --- GRAFİK BÖLÜMÜ --- */}
        <Text style={styles.title}>Genel Bakış (Gelir-Gider-Kâr)</Text>
        <BarChart
          data={chartData}
          width={screenWidth - 32} // Ekran genişliğinden padding'i çıkar
          height={220}
          yAxisLabel="₺" // TL Simgesi
          yAxisSuffix=''
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={styles.chart}
          withCustomBarColorFromData={true}
          flatColor={true}
          fromZero={true}
          showValuesOnTopOfBars={true} // Çubukların üzerinde değerleri göster
        />

        {/* --- ÜRÜN YÖNETİM BÖLÜMÜ --- */}
        <Text style={styles.title}>Ürün ve Maliyet Yönetimi</Text>
        
        <TouchableOpacity style={styles.excelButton} onPress={handleExcelImport}>
          <Text style={styles.excelButtonText}>Fiyat Listesini Excel'den Güncelle (.xlsx)</Text>
        </TouchableOpacity>

        {/* Fiyat Listesi */}
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          scrollEnabled={false} // ÖNEMLİ: İç içe kaydırma çakışmasını önler
        />
      </View>
    </ScrollView>
  );
};

// Grafik Ayarları
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

// Stil Tanımları
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  excelButton: {
    backgroundColor: '#1D6F42',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  excelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  itemCostContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  costLabel: {
    fontSize: 12,
    color: '#888',
  },
  costInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    minWidth: 80,
    textAlign: 'right',
  },
  costInputEditing: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
});

export default ProductManagementScreen;