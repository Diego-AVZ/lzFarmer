import { ethers } from "./ethersService";
import { loggerCheckBalance } from "./logger";


export async function checkEtherBalance (address:string, prov:string, chain:number, showLog:boolean) :Promise<{ isAboveThreshold: boolean; balance: bigint }> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei); 
        if(showLog){
            loggerCheckBalance(
                chain,
                address,
                balanceEther,
                balanceWei > 1000000000000000
            );   
        }    
        return {
            isAboveThreshold: balanceWei > 1000000000000000,
            balance: balanceWei
        };
    } catch (error) {
        console.error("Error ", error);
    }
}

export async function waitForFunding(account:string, prov:string, chain:number) {
    while (!((await checkEtherBalance(account, prov, chain, true)).isAboveThreshold)) {
        await new Promise(resolve => setTimeout(resolve, 60000));
    }
}
