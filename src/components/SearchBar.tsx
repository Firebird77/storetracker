import { memo } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { colors } from '../theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = memo(function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Rechercher un magasin"
      placeholderTextColor={colors.textMuted}
      aria-label="Rechercher un magasin"
      role="searchbox"
      autoCorrect={false}
      clearButtonMode="while-editing"
    />
  );
});

const styles = StyleSheet.create({
  input: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
});
