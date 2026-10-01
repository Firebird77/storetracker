import { memo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Store } from '../../../api/types';
import { colors } from '../../../theme';
import { FavoriteButton } from '../../favorites/components/FavoriteButton';

export const STORE_CARD_HEIGHT = 72;

interface StoreCardProps {
  store: Store;
  onPress: (id: string) => void;
}

export const StoreCard = memo(function StoreCard({ store, onPress }: StoreCardProps) {
  const handlePress = useCallback(() => onPress(store.id), [onPress, store.id]);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={handlePress}
        role="button"
        aria-label={`${store.name}, ${store.city}`}
        accessibilityHint="Ouvre le détail du magasin"
        style={({ pressed }) => [styles.info, pressed && styles.pressed]}
      >
        <Text style={styles.name} numberOfLines={1}>
          {store.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {store.address}, {store.city}
        </Text>
      </Pressable>
      <FavoriteButton store={store} />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    height: STORE_CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  info: { flex: 1 },
  pressed: { opacity: 0.5 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  address: { color: colors.textMuted, marginTop: 2 },
});
