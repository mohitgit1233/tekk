import { Input, Box, Icon } from 'native-base';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';

const SearchInput = ({ onChangeTextAction }) => {
  const onChangeAction = (text) =>
    useCallback(debounce(onChangeTextAction(text), 2000), []);

  return (
    <Box alignItems="center">
      <Input
        mx="3"
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            ml="2"
            color="red"
          />
        }
        onChangeText={(text) => onChangeAction(text)}
        placeholder="Search here..."
        w="100%"
      />
    </Box>
  );
};

export default SearchInput;
