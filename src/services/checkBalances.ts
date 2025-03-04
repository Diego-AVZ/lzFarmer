import { ethers } from "./ethersService";


export async function checkEtherBalance (address:string, prov:string) :Promise<{ isAboveThreshold: boolean; balance: bigint }> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei);
        return {
            isAboveThreshold: Number(balanceWei) > 4200000000000000,
            balance: balanceWei
        };
    } catch (error) {
        console.error("Error ", error);
    }
}

export async function waitForFunding(account:string, chain:string) {
    const func = await checkEtherBalance(account, chain);
    while (!(func.isAboveThreshold)) {
        console.log(`🔍 ${account} Ether Balance: ${func.balance} ETH`);
        await new Promise(resolve => setTimeout(resolve, 5500)); 
    }
}
