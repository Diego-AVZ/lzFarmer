import { ethers } from "./ethersService";

export async function cancelTxs(privateKey: string, toAddress: string, amountEther: bigint, providerUrl: string) {
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    const gasPrice = (await provider.getFeeData()).gasPrice;
    const tx = {
        to: toAddress,
        value: amountEther,
        gasPrice : gasPrice * 2n
    };
    const txResponse = await wallet.sendTransaction(tx);
    await txResponse.wait(); 
    console.log("ETH trasnfer ==> txs Hash: ", txResponse.hash);

}