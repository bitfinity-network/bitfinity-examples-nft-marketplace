import { Box, Button, Grid, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import RynoNFT from "../../../utils/MyNFT.json"
import { contractAddress } from '@/utils/constants'
import { NFT } from '@/types'
import { NFTItem } from '../NavItem'


export function NFTGrid({ data }: { data: NFT[] }) {
    const toast = useToast()
    const { address } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNFT, setSelectedNFT] = useState(data[0]);
    const [mintingError, setMintingError] = useState("")

    const { isLoading, isSuccess, writeAsync: mintNFTAsync } = useContractWrite({
        address: contractAddress,
        abi: RynoNFT.abi,
        functionName: 'mintNFT',
        args: [selectedNFT.id, address, selectedNFT.metaPath],
    })
    const selectNft = (nft: NFT) => {
        setSelectedNFT(nft);
        onOpen()
    }

    const mintNFT = async () => {
        if (address) {
            try {
                const result = await mintNFTAsync()
                toast({
                    title: 'NFT minted successfully',
                    description: `You have successfully minted ${selectedNFT.name}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                onClose()

            } catch (error) {
                console.log(error)
                toast({
                    title: 'Error Minted NFT',
                    description: `There seems to be an error`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                setMintingError(JSON.stringify(error))
            }
        } else {

        }

    }

    return (
        <>
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']} gap={6}>
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
                                {mintingError && <Text color="rgba(255, 255, 255, 0.6)" fontSize="11px">{mintingError}</Text>}
                                <Box pt={5}>
                                    <Button isLoading={isLoading} loadingText='Minting NFT' onClick={() => mintNFT()}>Mint Ryno NFT</Button>
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
