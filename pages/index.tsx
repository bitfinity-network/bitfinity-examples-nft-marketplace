import Head from "next/head"
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
} from "@chakra-ui/react"
import { NFTGrid } from "@/components/ui"
import NFT_COLLECTION from "../public/assets/all.json"

export default function CallToActionWithAnnotation() {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Box pb={10}>
                <Container maxW={"3xl"}>
                    <Stack
                        as={Box}
                        textAlign={"center"}
                        spacing={{ base: 8, md: 14 }}
                        py={{ base: 20 }}
                    >
                        <Heading
                            fontWeight={600}
                            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                            lineHeight={"110%"}
                        >
                            Welcome to <br />
                            <Text as={"span"} color={"green.400"}>
                                Ryno NFT Marketplace
                            </Text>
                        </Heading>
                        <Text color={"gray.500"}>
                            This project is to illustrate how to deploy a dapp
                            on the evmc and uses Bitfinity Testnet Network
                        </Text>
                        <Stack
                            direction={"column"}
                            spacing={3}
                            align={"center"}
                            alignSelf={"center"}
                            position={"relative"}
                        >
                            <Button
                                colorScheme={"green"}
                                bg={"green.400"}
                                rounded={"full"}
                                px={6}
                                _hover={{
                                    bg: "green.500",
                                }}
                            >
                                Get Started
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
                <Box mx={[2, 8, 24]}>
                    <NFTGrid data={NFT_COLLECTION} />
                </Box>
            </Box>
        </>
    )
}
