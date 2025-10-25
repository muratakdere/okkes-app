import React, { useContext, useState } from "react"; // <-- useState import edildi
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../contexts/AuthContext";

// Ekranlar
import Login from "@/screens/Login";
import Register from "@/screens/Register";
import ForgotPassword from "@/screens/ForgotPassword";
import Dashboard from "@/screens/Dashboard";
import Stok from "@/screens/Stok";
import GelirGider from "@/screens/GelirGider";
import SatisEkrani from '@/screens/SatisEkrani';
import GiderEkrani from '@/screens/GiderEkrani';
import Profile from "@/screens/Profil";

// --- VERİ TİPLERİ ---
// Tüm ekranların kullanacağı ortak tipleri burada (veya ayrı bir 'types.ts' dosyasında) tanımlamak iyi bir pratiktir.
export interface Product {
  id: string; 
  name: string;
  price: number; 
  cost: number;
  quantity: number;
  unit: string;
  // Belki stok için 'quantity' (adet) de gereklidir?
  // quantity: number; 
}
export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  salePrice: number;
}
export interface Expense {
  id: string;
  description: string;
  amount: number;
}
// --- Bitiş Veri Tipleri ---


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * @function MainTabs
 * @description Ana (Alt Tab) navigasyonunu ve ilgili tüm ekranların
 * state yönetimini (veri tutma) işini yapar.
 */
function MainTabs() {

  // --- MERKEZİ STATE YÖNETİMİ ---
  // Gelir, Gider ve Stok için gerekli tüm verileri, bu ekranların
  // ortak atası olan MainTabs fonksiyonunda tutuyoruz.
  const [products, setProducts] = useState<Product[]>([
    // Başlangıç için örnek veriler (veya boş dizi [] kullanın)
    { id: '1', name: 'Lahmacun', price: 12, cost: 5, quantity: 50, unit: 'adet' },
    { id: '2', name: 'Kebap', price: 45, cost: 20, quantity: 30, unit: 'adet' },
    { id: '3', name: 'Ayran', price: 5, cost: 2, quantity: 100, unit: 'şişe' },
  ]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // --- Bitiş State Yönetimi ---

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      {/* Dashboard (Bu ekranın state'lere ihtiyacı olmadığını varsayıyorum) */}
      <Tab.Screen name="Dashboard" component={Dashboard} />

      {/* Stok Ekranı */}
      <Tab.Screen name="Stok">
        {() => (
          <Stok 
            products={products} 
            setProducts={setProducts} 
          />
        )}
      </Tab.Screen>

      {/* Rapor Ekranı (GelirGider) */}
      <Tab.Screen name="GelirGider">
         {() => (
          <GelirGider 
            products={products}
            setProducts={setProducts} // Excel'den yükleme için
            sales={sales}
            expenses={expenses}
          />
        )}
      </Tab.Screen>

      {/* Gelir Ekleme Ekranı (SatisEkrani) */}
      <Tab.Screen name="Satış Yap">
        {() => (
          <SatisEkrani
            products={products} // Hangi ürünlerin satılacağını listelemek için
            setSales={setSales}   // Yeni satışı kaydetmek için
          />
        )}
      </Tab.Screen>
      
      {/* Gider Ekleme Ekranı (GiderEkrani) */}
      <Tab.Screen name="Gider Ekle">
        {() => (
          <GiderEkrani
            setExpenses={setExpenses} // Yeni gideri kaydetmek için
          />
        )}
      </Tab.Screen>

      {/* Profil (Bu ekranın state'lere ihtiyacı olmadığını varsayıyorum) */}
      <Tab.Screen name="Profil" component={Profile} />

    </Tab.Navigator>
  );
}

/**
 * @function AppNavigator
 * @description Ana Yönlendirici. Kullanıcı giriş yapmış mı kontrol eder,
 * yapmışsa MainTabs'ı (uygulamanın kendisini), yapmamışsa Login/Register ekranlarını gösterir.
 * Burayı değiştirmenize gerek yok.
 */
export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Kullanıcı giriş yapmışsa: Ana uygulama (MainTabs)
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        // Kullanıcı giriş yapmamışsa: Giriş ekranları
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}