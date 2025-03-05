import { ethers } from "./ethersService";
import { loggerCheckBalance } from "./logger";


export async function checkEtherBalance (address:string, prov:string, chain:number) :Promise<{ isAboveThreshold: boolean; balance: bigint }> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei); 
        loggerCheckBalance(
            chain,
            address,
            balanceEther,
            balanceWei > 15000000000000000n
        );       
        return {
            isAboveThreshold: balanceWei > 15000000000000000n,
            balance: balanceWei
        };
    } catch (error) {
        console.error("Error ", error);
    }
}

export async function waitForFunding(account:string, prov:string, chain:number) {
    while (!((await checkEtherBalance(account, prov, chain)).isAboveThreshold)) {
        await new Promise(resolve => setTimeout(resolve, 40500));
    }
}
