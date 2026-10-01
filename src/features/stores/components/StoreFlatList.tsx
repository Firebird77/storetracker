import { useCallback } from 'react';
import { FlatList, StyleSheet, type FlatListProps, type ListRenderItem } from 'react-native';

import type { Store } from '../../../api/types';
import { STORE_CARD_HEIGHT, StoreCard } from './StoreCard';

type StoreFlatListProps = Omit<FlatListProps<Store>, 'data' | 'renderItem' | 'keyExtractor'> & {
  stores: Store[];
  onPressStore: (id: string) => void;
};

const keyExtractor = (item: Store) => item.id;

const getItemLayout = (_: ArrayLike<Store> | null | undefined, index: number) => ({
  length: STORE_CARD_HEIGHT,
  offset: STORE_CARD_HEIGHT * index,
  index,
});

export function StoreFlatList({ stores, onPressStore, ...rest }: StoreFlatListProps) {
  const renderItem = useCallback<ListRenderItem<Store>>(
    ({ item }) => <StoreCard store={item} onPress={onPressStore} />,
    [onPressStore],
  );

  return (
    <FlatList
      data={stores}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
});
