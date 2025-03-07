import { ethers, Wallet } from "ethers";
import { IS_TEST } from "../CONFIG";
import { depositAndWithdrawFromAave, depositAndWithdrawWETH, tokenApprovalRandom } from "./onchainActions";
import { sendETH } from "./transferEther";
import { randomDelay } from "./utils/sleep";

const ONCHAIN_ACTIONS = 4;

export function txsHumanizer(
    prov:string, 
    privateKey:string,
    chain:number,
    rounds:number
) {
    for(let i = 0; i < rounds; i++){
        randomDelay(IS_TEST);
        const actionId = Math.floor(Math.random() * ONCHAIN_ACTIONS);
        if(actionId == 0){
            tokenApprovalRandom(
                prov,
                privateKey,
                chain
            );
        } else if(actionId == 1){
            depositAndWithdrawWETH(
                prov,
                privateKey,
                chain
            );
        } else if(actionId == 2){
            sendETH( // self txs
                privateKey,
                new ethers.Wallet(privateKey, new ethers.JsonRpcProvider(prov)).address,
                30000000000100n,
                prov
            );
        } else if(actionId == 3){
            const randomAccount = Wallet.createRandom();
            sendETH( // txs to a random address
                privateKey,
                randomAccount.address,
                BigInt(Math.floor(Math.random() * 1000000)),
                prov
            );
        } else if(actionId == 4) {
            depositAndWithdrawFromAave(
                prov,
                privateKey,
                chain
            );

        }
    }
    randomDelay(IS_TEST);
}