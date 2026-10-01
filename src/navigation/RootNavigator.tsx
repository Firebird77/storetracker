import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FavoritesScreen } from '../features/favorites/screens/FavoritesScreen';
import { StoreDetailScreen } from '../features/stores/screens/StoreDetailScreen';
import { StoreListScreen } from '../features/stores/screens/StoreListScreen';
import { colors } from '../theme';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Stores"
        component={StoreListScreen}
        options={{
          title: 'Magasins',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{ title: 'Magasin', headerBackTitle: 'Retour' }}
      />
    </Stack.Navigator>
  );
}
