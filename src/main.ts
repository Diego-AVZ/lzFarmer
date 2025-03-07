import { PROVIDERS } from "./constants/providers";
import { STARGATE } from "./constants/contracts";
import { checkEtherBalance, waitForFunding } from "./services/checkBalances";
import { stargateTransfer, calculateMaxValue, getNativeFee } from "./services/stargateTransfers";
import { SendParam, MessagingFee } from "./services/stargateTransfers";
import { ethers } from "./services/ethersService";
import fs from 'fs';
import path from 'path';
import { loggerTransfer } from "./services/logger";
import {
    FARM_ROUTE,
    INITIAL_ACCOUNT,
    INITIAL_CLUSTER,
    IS_TEST,
    NUMBER_ACCOUNTS_TO_FARM,
    NUMBER_CLUSTERSS_TO_FARM
} from "./CONFIG";
import { sendETH } from "./services/transferEther";
import { randomDelay } from "./services/utils/sleep";
import { txsHumanizer } from "./services/txsHumanizer";

const filePath = path.join(__dirname, './constants/wallets.json');
const wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));


let chainFrom = 0;
let chainTo =  0;

const MAIN_ACCOUNT = {
    address : wallets.clusters[0].addresses[0],
    privKey : wallets.clusters[0].privateKeys[0]
}

const PRIVATE_KEYS = process.env.PRIVATE_KEY || '';
let privKeys:string[] = [];

function formatPrivateKeys() {
    privKeys = PRIVATE_KEYS.split(',');
}


function setAccount(j:number, z:number) {
    MAIN_ACCOUNT.address = wallets.clusters[z].addresses[j];
    MAIN_ACCOUNT.privKey = wallets.clusters[z].privateKeys[j];
}

function setChains(i:number) {
    chainFrom = FARM_ROUTE[i].chainFrom;
    chainTo = FARM_ROUTE[i].chainTo;
}

function prepareSendParam(
    amountLD: bigint,
    destChain: number
): SendParam {
    const dstEid = searchNetwork(destChain).destId;
    const to = ethers.zeroPadValue(MAIN_ACCOUNT.address, 32);
    const minAmountLD = amountLD - (amountLD * BigInt(10) / BigInt(100)); 
    const extraOptions = "0x"; 
    const composeMsg = "0x"; 
    const oftCmd = "0x"; 

    return {
        dstEid,
        to,
        amountLD,
        minAmountLD,
        extraOptions,
        composeMsg,
        oftCmd
    };
}

function prepareFeeParams(nativeFee:bigint): MessagingFee { 
        const lzTokenFee = 0;
        return {
            nativeFee,
            lzTokenFee
        }
}

function searchNetwork(network:number): {stargateAddress:string; prov:string, destId:number}{
    const stargateAddress = STARGATE[network].address;
    const prov = PROVIDERS[network];
    const destId = STARGATE[network].eId;
    return {
        stargateAddress,
        prov,
        destId
    }
}

async function mainStargateTransfer(
    network:number,
    privateKey: string,
    sendParam: SendParam, 
    fee: MessagingFee, 
    toAddress: string,
    _value: bigint
): Promise <boolean> {
    const networkData = searchNetwork(network);
    const success = await stargateTransfer(
        networkData.prov,
        privateKey,
        networkData.stargateAddress,
        sendParam, 
        fee,
        toAddress, 
        _value
    );
    return success;
}

async function main() {
    try {
        for(let z = INITIAL_CLUSTER; z < INITIAL_CLUSTER + NUMBER_CLUSTERSS_TO_FARM; z++){
            let lastProv:string;
            for(let j = INITIAL_ACCOUNT; j < INITIAL_ACCOUNT + NUMBER_ACCOUNTS_TO_FARM;){
                setAccount(j,z);
                for(let i = 0; i < FARM_ROUTE.length;){
                    setChains(i);
                    const networkData = searchNetwork(chainFrom);
                    lastProv = searchNetwork(chainTo).prov;
                    await waitForFunding(MAIN_ACCOUNT.address, networkData.prov, chainFrom);
                    randomDelay(IS_TEST);
                    const nativeFee = await getNativeFee(
                        networkData.prov,
                        MAIN_ACCOUNT.privKey,
                        networkData.stargateAddress,
                        MAIN_ACCOUNT.address,
                        prepareSendParam(1000n,chainTo),
                    );
                    const economyFee = BigInt(Math.round(Number(nativeFee) * 0.5));
                    const per = FARM_ROUTE[i].sendAll ? 1n : 2n;
                    const balance = await checkEtherBalance(
                        MAIN_ACCOUNT.address,
                        networkData.prov,
                        chainFrom,
                        false
                    );
                    const estimateValue = BigInt((Number(balance.balance) * 40/100).toFixed(0));
                    const valueData = await calculateMaxValue(
                        networkData.prov,
                        MAIN_ACCOUNT.privKey,
                        networkData.stargateAddress,
                        prepareSendParam(estimateValue,chainTo),
                        prepareFeeParams(nativeFee),
                        MAIN_ACCOUNT.address,
                        per
                    )
                    loggerTransfer(chainFrom,chainTo);
                    let success = false;
                    let retries = 0;
                    const maxRetries = 3;
                    while (!success && retries < maxRetries) {
                        success = await mainStargateTransfer(
                            chainFrom,
                            MAIN_ACCOUNT.privKey,
                            prepareSendParam(valueData.amountLD, chainTo),
                            prepareFeeParams(economyFee),
                            MAIN_ACCOUNT.address,
                            valueData.maxValue
                        );
                        if (!success) {
                            console.warn(`⚠️ Transfer failed. Retrying (${retries + 1}/${maxRetries}) chainFrom= ${chainFrom} → chainTo= ${chainTo}...`);
                            await new Promise(r => setTimeout(r, 5000));
                            retries++;
                        }
                    }
                    if (success) {
                        i++;
                    } else {
                        console.error(`❌ Max retries reached for chainFrom= ${chainFrom} → chainTo= ${chainTo}. Skipping...`);
                        i++;
                    }
                }
                j++
                if(j < INITIAL_ACCOUNT + NUMBER_ACCOUNTS_TO_FARM){
                    await waitForFunding(MAIN_ACCOUNT.address, lastProv, chainFrom);
                    const balance = await checkEtherBalance(
                        MAIN_ACCOUNT.address,
                        lastProv,
                        chainFrom,
                        false
                    );
                    await sendETH(
                        MAIN_ACCOUNT.privKey,
                        wallets.clusters[z].addresses[j],
                        balance.balance,
                        lastProv
                    );
                }
            }
            await waitForFunding(MAIN_ACCOUNT.address, lastProv, chainFrom);
            const balance = await checkEtherBalance(
                MAIN_ACCOUNT.address,
                lastProv,
                chainFrom,
                false
            );
            randomDelay(IS_TEST);
            await sendETH(
                MAIN_ACCOUNT.privKey,
                wallets.clusters[z].addresses[INITIAL_ACCOUNT],
                balance.balance,
                lastProv
            );
        }
    } catch(error) {
        console.error("ERROR ", error);
    }
}

//main();

txsHumanizer(
    "https://opt-mainnet.g.alchemy.com/v2/M-sZlZo1MNsl7Kps9FiRwNKk4NDkjNKT",
    "0xc5759d467010b9d12aa435e7b903facfd9fc2f5fd7faa75479b11a1d06737edd",
    6
);

/* 
[40161,"0x000000000000000000000000d714BA2530D1438ac4d1639184c4cF6d92573F91",30000000000000000,0,"0x","0x","0x"]
npm run start

*/