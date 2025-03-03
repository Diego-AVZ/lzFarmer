import {createAccounts} from "./services/createAccounts";
import { STARGATE } from "./constants/contracts";
import { ADDRESSES } from "./constants/accounts";
import { PROVIDERS } from "./constants/providers";
import { waitForFunding } from "./services/checkBalances";
import { stargateTransfer } from "./services/stargateTransfers";
import { SendParam, MessagingFee } from "./services/stargateTransfers";
import { ethers } from "./services/ethersService";


// CONFIGURATION
/*_________________________________________*/
const CREATE_ACCOUNTS = false;
const SIMULATE_HUMAN_TXS  = false;
const INITIAL_PROV =  PROVIDERS.sepolia
/*_________________________________________*/

const MAIN_ACCOUNT = ADDRESSES[0];

const PRIVATE_KEYS = process.env.PRIVATE_KEY || '';
let privKeys:string[] = [];

function formatPrivateKeys() {
    privKeys = PRIVATE_KEYS.split(',');
}

function prepareSendParam(): SendParam {
    const dstEid = 40231; 
    const to = ethers.zeroPadValue(MAIN_ACCOUNT, 32);
    const amountLD = 4000000000000000;
    const minAmountLD = 0; 
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

function prepareFeeParams(): MessagingFee { 
        const nativeFee = 126463433410413;
        const lzTokenFee = 0;
        return {
            nativeFee,
            lzTokenFee
        }
}


async function main() {
    formatPrivateKeys();
    await waitForFunding(MAIN_ACCOUNT, INITIAL_PROV);                                                      
    await stargateTransfer(INITIAL_PROV,privKeys[0], prepareSendParam(), prepareFeeParams(),MAIN_ACCOUNT, 4126463433410413);
}

main();