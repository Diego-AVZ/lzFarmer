import { IS_TEST } from "../CONFIG";
import { depositAndWithdrawWETH, tokenApprovalRandom } from "./ochainActions";
import { randomDelay } from "./utils/sleep";

const ONCHAIN_ACTIONS = 2;

export function txsHumanizer(
    prov:string, 
    privateKey:string,
    chain:number
) {
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
    }
}