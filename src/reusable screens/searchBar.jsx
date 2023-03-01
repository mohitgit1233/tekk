import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs..."
        onChangeText={onSearch}
        value={searchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 18,
  },
});

export default SearchBar;
