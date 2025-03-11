import { ethers } from "./ethersService";
import fs from 'fs';
import path from 'path';
import { PROVIDERS } from "../constants/providers";

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

const filePath = path.join(__dirname, '../constants/wallets.json');
const wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));

if (require.main === module) {
    const args = process.argv.slice(2); 
    const clusterId = args.length > 0 ? parseInt(args[0], 10) : 0;
    const accountId = args.length > 0 ? parseInt(args[1], 10) : 0;
    const chain = args.length > 0 ? parseInt(args[2], 10) : 9999;
    const account = wallets.clusters[clusterId].addresses[accountId];
    const privKey = wallets.clusters[clusterId].privateKeys[accountId];
    const prov = PROVIDERS[chain];
    cancelTxs(
        privKey,
        account,
        0n,
        prov
    );
}