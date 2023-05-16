import { contractAddress } from "@/utils/constants"
import { useContractRead } from "wagmi"
import RynoNFT from "../utils/MyNFT.json"

export const useReadContractHook = (functionName: string, args: any[]) => {
    const { data, ...rest } = useContractRead({
        address: contractAddress,
        abi: RynoNFT.abi,
        functionName,
        args,
        watch: true,
    })
    return { data, ...rest }
}
