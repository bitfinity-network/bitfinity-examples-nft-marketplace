import { Box, Button, Flex, Grid, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from "./NFT.module.css";


export default function NFTItem({ nft }) {
    return (
        <Box border="1px solid rgba(255, 255, 255, 0.1)" p={2} rounded="md">
            <Image alt={nft.description} rounded="md" src={`/assets/${nft.imagePath}`} />
            <Box pt={2}>
                <Text fontSize="12px" >Token ID #{nft.id}</Text>
                <Text fontWeight="bold">{nft.name}</Text>
            </Box>
            <Box pt={2}>
                <Box bg="rgba(255, 255, 255, 0.04)" rounded="md" minH="52px">
                    <Box p="2">
                        <Text color="rgba(255, 255, 255, 0.6)">Price</Text>
                        <Text>0.1 ETH</Text>
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export function NFTGrid({ data }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNFT, setSelectedNFT] = useState(data[0]);

    const selectNft = (nft) => {
        setSelectedNFT(nft);
        onOpen()
    }

    return (
        <>
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                {data.map((nft) => {
                    return (
                        <Box key={nft.id} cursor="pointer" onClick={() => selectNft(nft)}>
                            <NFTItem nft={nft} />
                        </Box>
                    )
                })}
            </Grid>
            <Modal isCentered isOpen={isOpen} size="3xl" onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent>
                    <ModalHeader>{selectedNFT.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack alignItems="center" gap={5}>
                            <Box
                                width={{ base: '100%' }}
                                zIndex="2"
                                marginLeft={{ base: '0', sm: '5%' }}
                                marginTop="5%">
                                <Image
                                    borderRadius="lg"
                                    src={
                                        "/assets/" + selectedNFT.imagePath
                                    }
                                    alt="some good alt text"
                                    objectFit="contain"
                                />
                            </Box>
                            <Box zIndex="1" width="100%" height="100%">
                                <Text
                                    as="p"
                                    marginTop="2"
                                    fontSize="lg">
                                    {selectedNFT.description}
                                </Text>
                                <Box pt={5}>
                                    <Button>Mint Ryno NFT</Button>
                                </Box>
                            </Box>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}
