import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { StateView } from '../../../components/StateView';
import { colors } from '../../../theme';
import { StoreFlatList } from '../../stores/components/StoreFlatList';
import { useFavoritesStore } from '../favoritesStore';

export function FavoritesScreen() {
  const navigation = useNavigation();
  const favorites = useFavoritesStore((s) => s.favorites);

  const onPressStore = useCallback(
    (storeId: string) => navigation.navigate('StoreDetail', { storeId }),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StoreFlatList
        stores={favorites}
        onPressStore={onPressStore}
        ListEmptyComponent={<StateView variant="empty" message="Aucun favori pour le moment" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
