import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image,
    HStack,
    Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Image src="logo.png" h="24px" alt="logo" />
                    </Box>


                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            {isConnected ?
                                (
                                    <Button onClick={() => disconnect()}>
                                        <HStack>
                                            {ensAvatar ?? <Image src="metamask.svg" alt="ENS Avatar" />}

                                            <Text isTruncated w="100px">{ensName ? `${ensName} (${address})` : address}</Text>
                                        </HStack>
                                    </Button>
                                )
                                : (

                                    connectors.map((connector) => (
                                        <Button
                                            disabled={!connector.ready}
                                            key={connector.id}
                                            onClick={() => connect({ connector })}
                                        >
                                            {connector.name}
                                            {!connector.ready && ' (unsupported)'}
                                            {isLoading &&
                                                connector.id === pendingConnector?.id &&
                                                ' (connecting)'}
                                        </Button>
                                    ))



                                )


                            }
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}