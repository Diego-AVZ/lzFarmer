import {createAccounts} from "./services/createAccounts";
import { PROVIDERS } from "./constants/providers";
import { STARGATE } from "./constants/contracts";
import { waitForFunding } from "./services/checkBalances";
import { stargateTransfer, calculateMaxValue, getNativeFee } from "./services/stargateTransfers";
import { SendParam, MessagingFee } from "./services/stargateTransfers";
import { ethers } from "./services/ethersService";
import fs from 'fs';
import path from 'path';
import { loggerTransfer } from "./services/logger";

const filePath = path.join(__dirname, './constants/wallets.json');
const wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));



// CONFIGURATION
/*_________________________________________*/
const CREATE_ACCOUNTS = false;
const SIMULATE_HUMAN_TXS  = false;
let chainFrom = 1;
let chainTo =  2;
/*_________________________________________*/

let account = 1;
const MAIN_ACCOUNT = {
    address :  wallets.addresses[account],
    privKey : wallets.privateKeys[account]
}

const PRIVATE_KEYS = process.env.PRIVATE_KEY || '';
let privKeys:string[] = [];

function formatPrivateKeys() {
    privKeys = PRIVATE_KEYS.split(',');
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
) {
    const networkData = searchNetwork(network);
    await stargateTransfer(
        networkData.prov,
        privateKey,
        networkData.stargateAddress,
        sendParam, 
        fee,
        toAddress, 
        _value
    );
}

function changeChains() {
    let a = chainFrom;
    let b = chainTo;
    chainFrom = b;
    chainTo = a;
}

async function main() {
    while(true){
    try {
        const networkData = searchNetwork(chainFrom);
        await waitForFunding(MAIN_ACCOUNT.address, networkData.prov, chainFrom);
        const nativeFee = await getNativeFee(
            networkData.prov,
            MAIN_ACCOUNT.privKey,
            networkData.stargateAddress,
            MAIN_ACCOUNT.address,
            prepareSendParam(1000n,chainTo),
        );
        const valueData = await calculateMaxValue(
            networkData.prov,
            MAIN_ACCOUNT.privKey,
            networkData.stargateAddress,
            prepareSendParam(1000000000000000n,chainTo),
            prepareFeeParams(nativeFee),
            MAIN_ACCOUNT.address,
            1n
        )
        loggerTransfer(chainFrom,chainTo);
        await mainStargateTransfer(
            chainFrom,
            MAIN_ACCOUNT.privKey,
            prepareSendParam(valueData.amountLD,chainTo),
            prepareFeeParams(valueData.requiredFee),
            MAIN_ACCOUNT.address,
            valueData.maxValue
        );
        changeChains();
    } catch(error) {
        console.error("ERROR ", error);
    }
    await new Promise(resolve => setTimeout(resolve, 10000)); 
}
}

main();

/* 
[40161,"0x000000000000000000000000d714BA2530D1438ac4d1639184c4cF6d92573F91",30000000000000000,0,"0x","0x","0x"]
npm run start
136774035857932n
*/