import { ethers, Wallet } from "ethers";
import { IS_TEST } from "../CONFIG";
import { depositAndWithdrawFromAave, depositAndWithdrawWETH, tokenApprovalRandom } from "./onchainActions";
import { sendETH, sendETH2 } from "./transferEther";
import { randomDelay } from "./utils/sleep";

const ONCHAIN_ACTIONS = 5;

export async function txsHumanizer(
    prov:string, 
    privateKey:string,
    chain:number,
    rounds:number
) {
    for(let i = 0; i < rounds; i++){
        await randomDelay(IS_TEST);
        let actionId = Math.floor(Math.random() * ONCHAIN_ACTIONS);
        if(actionId == 0){
            console.log("👨‍👩‍👧‍👦  HUMANIZING TXS --- executing ⚡ TOKEN APPROVAL");
            await tokenApprovalRandom(
                prov,
                privateKey,
                chain
            );
        } else if(actionId == 1){
            console.log("👨‍👩‍👧‍👦  HUMANIZING TXS --- executing ⚡ wETH actions");
            await depositAndWithdrawWETH(
                prov,
                privateKey,
                chain
            );
        } else if(actionId == 2){
            console.log("👨‍👩‍👧‍👦  HUMANIZING TXS --- executing ⚡ SELF ETH TXS");
            await sendETH( // self txs
                privateKey,
                new ethers.Wallet(privateKey, new ethers.JsonRpcProvider(prov)).address,
                30000000000100n,
                prov
            );
        } else if(actionId == 3){
            console.log("👨‍👩‍👧‍👦  HUMANIZING TXS --- executing ⚡ transfer to RANDOM ADDRESS");
            const randomAccount = Wallet.createRandom();
            await sendETH2( // txs to a random address
                privateKey,
                randomAccount.address,
                BigInt(Math.floor(Math.random() * 100000000000)),
                prov
            );
        } else if(actionId == 4) {
            console.log("👨‍👩‍👧‍👦  HUMANIZING TXS --- executing ⚡ AAVE ACTIONS");
            await depositAndWithdrawFromAave(
                prov,
                privateKey,
                chain
            );

        }
    }
    await randomDelay(IS_TEST);
}