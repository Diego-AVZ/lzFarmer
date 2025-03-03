import { ethers } from "./ethersService";


export async function checkEtherBalance (address:string, prov:string) : Promise<boolean> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei);
        console.log(`${address} Ether Balance: ${balanceEther} ETH`);
        console.log(Number(balanceWei) > 4200000000000000);
        return Number(balanceWei) > 4200000000000000;
    } catch (error) {
        console.error("Error ", error);
    }
}

export async function waitForFunding(account:string, chain:string) {
    while (!(await checkEtherBalance(account, chain))) {
        await new Promise(resolve => setTimeout(resolve, 3500)); 
    }
}
