import { checkEtherBalance, waitForFunding } from "./services/checkBalances";
import { 
    calculateMaxValue, 
    getNativeFee, 
    searchNetwork, 
    prepareSendParam, 
    prepareFeeParams, 
    mainStargateTransfer 
} from "./services/stargateTransfers";
import fs from 'fs';
import path from 'path';
import { loggerTransfer } from "./services/logger";
import {
    FARM_ROUTE,
    INITIAL_CLUSTER,
    IS_TEST,
    MAX_NUMBER_OF_HUMAN_TXS,
    NUMBER_CLUSTERS_TO_FARM
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

let numberAccountsToFarm = 0;
 
function setAccount(j:number, z:number) {
    MAIN_ACCOUNT.address = wallets.clusters[z].addresses[j];
    MAIN_ACCOUNT.privKey = wallets.clusters[z].privateKeys[j];
    numberAccountsToFarm = wallets.clusters[z].addresses.length;
}

function setChains(i:number) {
    chainFrom = FARM_ROUTE[i].chainFrom;
    chainTo = FARM_ROUTE[i].chainTo;
}

async function main() {
    console.log(`🟢 Starting process PID: ${process.pid}`);

    try {
        for(let z = INITIAL_CLUSTER; z < INITIAL_CLUSTER + NUMBER_CLUSTERS_TO_FARM; z++){
            let lastProv:string;
            setAccount(0,z);
            for(let j = 0; j < numberAccountsToFarm;){
                setAccount(j,z);
                for(let i = 0; i < FARM_ROUTE.length;){
                    setChains(i);
                    const networkData = searchNetwork(chainFrom);
                    lastProv = searchNetwork(chainTo).prov;
                    await waitForFunding(MAIN_ACCOUNT.address, networkData.prov, chainFrom);
                    await txsHumanizer(
                        networkData.prov,
                        MAIN_ACCOUNT.privKey, 
                        chainFrom, 
                        Math.floor(Math.random() * (MAX_NUMBER_OF_HUMAN_TXS + 1))
                    );
                    await randomDelay(true);
                    const nativeFee = await getNativeFee(
                        networkData.prov,
                        MAIN_ACCOUNT.privKey,
                        networkData.stargateAddress,
                        MAIN_ACCOUNT.address,
                        prepareSendParam(1000n,chainTo,MAIN_ACCOUNT.address),
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
                        prepareSendParam(estimateValue,chainTo,MAIN_ACCOUNT.address),
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
                            prepareSendParam(valueData.amountLD, chainTo, MAIN_ACCOUNT.address),
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
                    };
                }
                j++
                if(j < numberAccountsToFarm){
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
            await randomDelay(IS_TEST);
            await sendETH(
                MAIN_ACCOUNT.privKey,
                wallets.clusters[z].addresses[0],
                balance.balance,
                lastProv
            );
        }
    } catch(error) {
        console.error("ERROR ", error);
    }
}

main();



/* 
[40161,"0x000000000000000000000000d714BA2530D1438ac4d1639184c4cF6d92573F91",30000000000000000,0,"0x","0x","0x"]


commands

`npm run createAccounts -- X Y` -> X == Number of accounts to create, Y == ID of the cluster where you want to create the accounts (0 for first cluster, 1 for second ... ).
---
`npm run createClusters -- Z` -> Z == Number of clusters to create (Each cluster will contain a random number of accounts, from 3 to 8).
---
`npm run start` -> Executes the route.
---

Get-Process node 
Get-Process node | Stop-Process -Force

*/

process.on("SIGINT", async () => {
    console.log("🚨 Terminating process in a controlled manner...");
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("🚨 Terminating process due to SIGTERM (terminal closure)...");
    process.exit(0);
});

process.on("uncaughtException", (error) => {
    console.error("❌ Uncaught exception: ", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled rejection: ", reason);
    process.exit(1);
});
