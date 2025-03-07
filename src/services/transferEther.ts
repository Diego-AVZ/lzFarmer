import { ethers } from "./ethersService";

export async function sendETH(privateKey: string, toAddress: string, amountEther: bigint, providerUrl: string) {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const tx = {
        to: toAddress,
        value: amountEther - 30000000000000n
    };
    const txResponse = await wallet.sendTransaction(tx);
    await txResponse.wait(); 
    console.log("ETH trasnfer ==> txs Hash: ", txResponse.hash);

}