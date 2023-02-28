import React from 'react';
import { Text, Icon, Center, Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const FooterMenuItem = () => {
  const [selected, setSelected] = React.useState(1);
  return (
    <Pressable
      cursor="pointer"
      opacity={selected === 0 ? 1 : 0.5}
      py="3"
      flex={1}
      onPress={() => setSelected(0)}
    >
      <Center>
        <Icon
          mb="1"
          as={
            <MaterialCommunityIcons
              name={selected === 0 ? 'home' : 'home-outline'}
            />
          }
          color="black"
          size="sm"
        />
        <Text color="black" fontSize="12">
          Job Posts
        </Text>
      </Center>
    </Pressable>
  );
};

export default FooterMenuItem;
