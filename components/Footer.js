import { Box, HStack } from 'native-base';
import FooterMenuItem from './FooterMenuItem';

const Footer = () => {
  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
      <HStack bg="white" alignItems="center" safeAreaBottom shadow={6}>
        <FooterMenuItem />
      </HStack>
    </Box>
  );
};

export default Footer;
