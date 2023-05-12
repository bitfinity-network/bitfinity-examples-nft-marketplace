//@ts-nocheck

import { Box, Grid, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import RynoNFT from "../../../utils/MyNFT.json"
import { contractAddress } from '@/utils/constants'
import { NFT } from '@/types'
import { NFTItem } from '../NavItem'
import { NFTModal } from '../NFTModal'


export function NFTGrid({ data }: { data: NFT[] }) {
    const toast = useToast()
    const { address } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNFT, setSelectedNFT] = useState(data[0]);
    const [mintingError, setMintingError] = useState("")

    const { isLoading, writeAsync: mintNFTAsync } = useContractWrite({
        address: contractAddress,
        abi: RynoNFT.abi,
        functionName: 'mintNFT',
        args: [selectedNFT.id, address, selectedNFT.metaPath]
    })

    const selectNft = (nft: NFT) => {
        setMintingError("")
        setSelectedNFT(nft);
        onOpen()
    }

    const mintNFT = async () => {
        if (address && mintNFTAsync) {
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
            <NFTModal selectedNFT={selectedNFT} isOpen={isOpen} onClose={onClose} mintingError={mintingError} isLoading={isLoading} mintNFT={mintNFT} />
        </>

    )
}
