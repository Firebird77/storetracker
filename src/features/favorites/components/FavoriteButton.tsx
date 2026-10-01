import { Ionicons } from '@expo/vector-icons';
import { memo, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import type { Store } from '../../../api/types';
import { colors } from '../../../theme';
import { useFavoritesStore, useIsFavorite } from '../favoritesStore';

interface FavoriteButtonProps {
  store: Store;
}

export const FavoriteButton = memo(function FavoriteButton({ store }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(store.id);
  const toggle = useFavoritesStore((s) => s.toggle);
  const onPress = useCallback(() => toggle(store), [toggle, store]);

  return (
    <Pressable
      onPress={onPress}
      role="button"
      aria-label={isFavorite ? `Retirer ${store.name} des favoris` : `Ajouter ${store.name} aux favoris`}
      aria-selected={isFavorite}
      hitSlop={8}
      style={styles.button}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={isFavorite ? colors.favorite : colors.textMuted}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
