import { Button, FormControl, Label, Heading, HStack, Input, VStack } from 'native-base';

export const Profile = ({ navigation }) => {
  return (
    <VStack p="4">
      <Heading>Profile</Heading>

      <FormControl>
        <FormControl.Label>Name</FormControl.Label>
        <Input placeholder="Enter your name" />
      </FormControl>

      <FormControl>
        <FormControl.Label>Company Name</FormControl.Label>
        <Input placeholder="Enter your company name" />
      </FormControl>

      <FormControl>
        <FormControl.Label>Work Experience</FormControl.Label>
        <Input placeholder="Enter your work experience" />
      </FormControl>

      <FormControl>
        <FormControl.Label>Your Skills</FormControl.Label>
        <Input placeholder="Enter your skills" />
      </FormControl>

      <FormControl>
        <FormControl.Label>Certificate Upload</FormControl.Label>
        <HStack space={2}>
          <Button>Choose File</Button>
          <Input placeholder="No file chosen" isReadOnly />
        </HStack>
      </FormControl>

      <FormControl>
        <FormControl.Label>ID Upload</FormControl.Label>
        <HStack space={2}>
          <Button>Choose File</Button>
          <Input placeholder="No file chosen" isReadOnly />
        </HStack>
      </FormControl>

      <Button mt="4" onPress={() => navigation.goBack()}>Save Changes</Button>
    </VStack>
  );
};
