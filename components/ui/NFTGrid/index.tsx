//@ts-nocheck

import { Box, Grid, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import RynoNFT from "../../../utils/MyNFT.json"
import { contractAddress } from '@/utils/constants'
import { NFT } from '@/types'
import { NFTItem } from '../NavItem'
import { NFTModal } from '../NFTModal'
import { randomUUID } from 'crypto'
import { useReadContractHook } from '@/hooks/useReadContract'


export function NFTGrid({ data }: { data: NFT[] }) {
    const [tokenId, setTokenId] = useState(0);
    const [success, setSuccess] = useState(false);
    const toast = useToast()
    const { address } = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNFT, setSelectedNFT] = useState(data[0]);
    const [mintingError, setMintingError] = useState("")
    const { isLoading, writeAsync: mintNFTAsync } = useContractWrite({
        address: contractAddress,
        abi: RynoNFT.abi,
        functionName: 'mintNFT',
        args: [address, selectedNFT.metaPath]
    })

    const { data: addressToTokenId } = useReadContractHook("tokenCounter", []);

    console.log("addressToTokenId", addressToTokenId)


    const selectNft = (nft: NFT) => {
        setMintingError("")
        setSuccess(false)
        setSelectedNFT(nft);
        onOpen()
    }

    const mintNFT = async () => {
        if (address && mintNFTAsync) {
            try {
                const result = await mintNFTAsync()
                const id = addressToTokenId?._hex || "0x00"
                setSuccess(true)
                setTokenId(parseInt(id) + 1);
                toast({
                    title: 'NFT minted successfully',
                    description: `You have successfully minted ${selectedNFT.name}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                // onClose()

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
            <NFTModal selectedNFT={selectedNFT} isOpen={isOpen} onClose={onClose} success={success} tokenId={tokenId} mintingError={mintingError} isLoading={isLoading} mintNFT={mintNFT} />
        </>

    )
}
