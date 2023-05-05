import { Chain } from "wagmi";

export const BITFINITY_CHAIN = {
    id: 355113,
    name: "Bitfinity Network",
    network: "Bitfinity Network",
    nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        public: { http: ["https://testnet.bitfinity.network"] },
        default: { http: ["https://testnet.bitfinity.network"] },
    },
    //blockExplorerUrls: []
} as const satisfies Chain;