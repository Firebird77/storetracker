import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';

import { SearchBar } from '../../../components/SearchBar';
import { StateView } from '../../../components/StateView';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { colors } from '../../../theme';
import { StoreFlatList } from '../components/StoreFlatList';
import { useStoresInfinite } from '../hooks/useStores';

export function StoreListScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const {
    stores,
    error,
    isPending,
    isError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useStoresInfinite(debouncedSearch);

  const onPressStore = useCallback(
    (storeId: string) => navigation.navigate('StoreDetail', { storeId }),
    [navigation],
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) void fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, isFetchNextPageError, fetchNextPage]);

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator style={styles.footer} aria-label="Chargement de la suite" />;
    }
    if (isFetchNextPageError) {
      return (
        <View style={styles.footer}>
          <Button title="Erreur de chargement, réessayer" onPress={() => void fetchNextPage()} />
        </View>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (isPending) return <StateView variant="loading" />;
    if (isError && stores.length === 0) {
      return <StateView variant="error" message={error.message} onRetry={() => void refetch()} />;
    }
    return (
      <StoreFlatList
        testID="store-list"
        stores={stores}
        onPressStore={onPressStore}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<StateView variant="empty" message="Aucun magasin trouvé" />}
        ListFooterComponent={renderFooter()}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  footer: { padding: 16 },
});
