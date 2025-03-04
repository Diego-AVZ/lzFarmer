import {createAccounts} from "./services/createAccounts";
import { PROVIDERS } from "./constants/providers";
import { STARGATE } from "./constants/contracts";
import { checkEtherBalance, waitForFunding } from "./services/checkBalances";
import { stargateTransfer, calculateMaxValue } from "./services/stargateTransfers";
import { SendParam, MessagingFee } from "./services/stargateTransfers";
import { ethers } from "./services/ethersService";
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, './constants/wallets.json');
const wallets = JSON.parse(fs.readFileSync(filePath, 'utf8'));



// CONFIGURATION
/*_________________________________________*/
const CREATE_ACCOUNTS = false;
const SIMULATE_HUMAN_TXS  = false;
const INITIAL_CHAIN = 1;
const DEST_CHAIN =  0;
/*_________________________________________*/

let account = 3;
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
    //let accountBalance = (await checkEtherBalance(MAIN_ACCOUNT.address, networkData.prov)).balance;
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

async function main() {
    try {
        const networkData = searchNetwork(INITIAL_CHAIN);
        //formatPrivateKeys();
        await waitForFunding(MAIN_ACCOUNT.address, networkData.prov);
        const valueData = await calculateMaxValue(
            networkData.prov,
            MAIN_ACCOUNT.privKey,
            networkData.stargateAddress,
            prepareSendParam(BigInt(1000),DEST_CHAIN),
            prepareFeeParams(1000n),
            MAIN_ACCOUNT.address,
            1n
        )
        
        await mainStargateTransfer(
            INITIAL_CHAIN,
            MAIN_ACCOUNT.privKey,
            prepareSendParam(valueData.amountLD,DEST_CHAIN),
            prepareFeeParams(valueData.requiredFee),
            MAIN_ACCOUNT.address,
            valueData.maxValue
        );
    } catch(error) {
        console.error("ERROR ", error);
    }
}

main();

/* 
[40161,"0x000000000000000000000000d714BA2530D1438ac4d1639184c4cF6d92573F91",30000000000000000,0,"0x","0x","0x"]
npm run start
*/