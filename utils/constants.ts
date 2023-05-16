import { Chain } from "wagmi"

export const BITFINITY_CHAIN = {
    id: 355113,
    name: "Bitfinity Network",
    network: "Bitfinity Network",
    nativeCurrency: {
        name: "BitFinity",
        symbol: "BFT",
        decimals: 18,
    },
    rpcUrls: {
        public: { http: ["https://testnet.bitfinity.network"] },
        default: { http: ["https://testnet.bitfinity.network"] },
    },
    //blockExplorerUrls: []
} as const satisfies Chain

// export const contractAddress = '0xdC81a83f93f82240118d350d2CE9ad483CeB3C74'
export const contractAddress = "0x14419361611f6c8eAf83957747427d76c18F59cd"
