import { render, screen, userEvent } from '@testing-library/react-native';
import { useState } from 'react';

import { SearchBar } from '../SearchBar';

const ControlledSearchBar = ({ onChange }: { onChange: (v: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChangeText={(v) => {
        setValue(v);
        onChange(v);
      }}
    />
  );
};

describe('SearchBar', () => {
  it('remonte la saisie de l’utilisateur', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    await render(<ControlledSearchBar onChange={onChange} />);

    await user.type(screen.getByRole('searchbox', { name: 'Rechercher un magasin' }), 'Lyon');

    expect(onChange).toHaveBeenLastCalledWith('Lyon');
    expect(screen.getByDisplayValue('Lyon')).toBeOnTheScreen();
  });
});
