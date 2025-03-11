import { PROVIDERS } from "../constants/providers";
import { checkEtherBalance } from "./checkBalances";
import { ethers } from "./ethersService";
import fs from 'fs';
import path from 'path';
import { checkAaveBalances, checkTokenBalance, withdrawFromAave, withdrawWETH } from "./onchainActions";
import { ONCHAIN_ADDRESSES, STARGATE } from "../constants/contracts";
import { sendETH2 } from "./transferEther";
import { calculateMaxValue, getNativeFee, mainStargateTransfer, prepareFeeParams, prepareSendParam } from "./stargateTransfers";
import { sleep } from "./utils/sleep";

const filePath = path.join(__dirname, '../constants/wallets.json');
const wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));
let chain = 0;

export async function collectAll(cluster:number, destChain:number) {
    try {
        for(const prov of PROVIDERS){
            const provider = new ethers.JsonRpcProvider(prov);
            for(let account = 0; account < wallets.clusters[cluster].addresses.length; account++){

                const privKey = wallets.clusters[cluster].privateKeys[account];
                const wallet = new ethers.Wallet(privKey, provider);
                const balances = await checkAllBalances(
                    wallet.address,
                    prov,
                    chain
                );
                if(account != 0){
                    if(balances.aToken > 50000000000000n && balances.ether > 8000000000000n){
                        await withdrawFromAave(
                            prov,
                            privKey,
                            chain
                        );
                        await sleep(5000);
                    }
                    if(balances.wEther > 50000000000000n && balances.ether > 8000000000000n){
                       console.log("WITHSRAW ETH"); 
                       await withdrawWETH(
                            prov,
                            privKey,
                            chain,
                            balances.wEther
                        );
                        await sleep(5000);
                    }
                    if(balances.ether > 50000000000000n){
                       await sendETH2(
                            privKey,
                            wallets.clusters[cluster].addresses[0],
                            balances.ether - 15000000000000n,
                            prov
                        );
                        await sleep(5000);
                    }
                } else {
                    if(balances.aToken > 50000000000000n && balances.ether > 8000000000000n){
                        await withdrawFromAave(
                            prov,
                            privKey,
                            chain
                        );
                        await sleep(5000);
                    }
                    if(balances.wEther > 50000000000000n && balances.ether > 8000000000000n){
                        await withdrawWETH(
                            prov,
                            privKey,
                            chain,
                            balances.wEther
                        );
                        await sleep(5000);
                    }
                }
            }
            chain++;
        }
        collectAllInChain(cluster, destChain);
    } catch (error) {
        console.error("ERROR collect ", error)
    }
}

let chainX = 0;

async function collectAllInChain(cluster:number, destChain:number) {
    try {
        for(const prov of PROVIDERS){
            const provider = new ethers.JsonRpcProvider(prov);
            const privKey = wallets.clusters[cluster].privateKeys[0];
            const wallet = new ethers.Wallet(privKey, provider);
            if(chainX != destChain){
                const balance = await checkEtherBalance(
                    wallet.address,
                    prov,
                    chainX,
                    false
                );
                if(balance.balance > 500000000000000n){
                    const nativeFee = await getNativeFee(
                        prov,
                        privKey,
                        STARGATE[chainX].address,
                        wallet.address,
                        prepareSendParam(1000n,destChain,wallet.address),
                    );
                    const economyFee = BigInt(Math.round(Number(nativeFee) * 0.5));
                    const estimateValue = BigInt((Number(balance.balance) * 40/100).toFixed(0));
                    const valueData = await calculateMaxValue(
                        prov,
                        privKey,
                        STARGATE[chainX].address,
                        prepareSendParam(estimateValue,destChain,wallet.address),
                        prepareFeeParams(nativeFee),
                        wallet.address,
                        1n
                    );
                    await mainStargateTransfer(
                        chainX,
                        privKey,
                        prepareSendParam(valueData.amountLD-100000n, destChain,wallet.address),
                        prepareFeeParams(economyFee),
                        wallet.address,
                        valueData.maxValue - 100000n
                    );
                }
            }
            chainX++;
        }
    } catch (error) {
        console.error(error);
    }
}

async function checkAllBalances(
    address:string,
    prov:string,
    chain:number
): Promise <
    {
        ether:bigint, 
        wEther:bigint, 
        aToken:bigint
    }
> {
    try {
        const ethBalance = (await checkEtherBalance(
            address,
            prov,
            chain,
            false
        )).balance;

        const wEthBalance = await checkTokenBalance(
            ONCHAIN_ADDRESSES[chain].tokens[0].address,
            address,
            prov
        );
        const aTokenBalance = await checkAaveBalances(
            address,
            chain,
            prov
        );

        return {
            ether: ethBalance,
            wEther: wEthBalance,
            aToken: aTokenBalance
        };
    } catch (error) {
        
    }

}

if (require.main === module) {
    const args = process.argv.slice(2);
    let clusterId = args.length > 1 ? parseInt(args[0], 10) : 0;
    let destChain = args.length > 1 ? parseInt(args[1], 10) : 3;
    if (isNaN(clusterId) || clusterId < 0) {
        console.error("num > 0");
        process.exit(1);
    }
    collectAll(clusterId, destChain);
}