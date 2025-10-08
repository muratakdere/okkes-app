
import 'react-native-reanimated';

import { AuthProvider } from "../contexts/AuthContext";
import AppNavigator from "../navigation/AppNavigator";


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
 

  return (
      <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
