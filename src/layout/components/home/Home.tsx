import { Button, Flex, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

export default function SplitScreen() {
  const main = require('./Main.png');
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1
              }}
            >
              Bringing
            </Text>
            <br />{' '}
            <Text color={'#5EC1E6'} as={'span'}>
              HealthCare
            </Text>{' '}
            <br />
            <Text color={'#004AAD'} as={'span'}>
              into the digital age
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Our project operates within the healthcare domain, with a focus on improving access to
            essential medications for patients in Tunisia while ensuring security, efficiency, and
            transparency in the distribution process.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              Get started
            </Button>
            <Button rounded={'full'}>Our community</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <img src={main} alt='Main' className='imageMain' />
      </Flex>
    </Stack>
  );
}
