import { ERC20_ABI, ONCHAIN_ADDRESSES, WETH_ABI } from "../constants/contracts";
import { ethers } from "./ethersService";
import { BigNumberish } from "ethers";
import { randomDelay } from "./utils/sleep";
import { checkEtherBalance } from "./checkBalances";

export async function tokenApprovalRandom(prov:string, privateKey:string, chain:number) {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const token = ONCHAIN_ADDRESSES[chain].tokens[
            Math.floor(Math.random() * ONCHAIN_ADDRESSES[chain].tokens.length)
        ].address
        const erc20 = new ethers.Contract(token, ERC20_ABI, wallet);
        const tx = await erc20.approve(
            ONCHAIN_ADDRESSES[chain].protocols[
                Math.floor(
                    Math.random() * (
                        ONCHAIN_ADDRESSES[chain].protocols.length - 1
                    ))].address,
                Math.floor(Math.random() * 100)
            );
        await tx;
    } catch (error) {
        console.error("Error Approving Token ", error);
    }
} 

export async function depositAndWithdrawWETH(prov:string, privateKey:string, chain:number){
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const wEthAddress = ONCHAIN_ADDRESSES[chain].tokens[0].address;
        const wEth = new ethers.Contract(
            wEthAddress,
            WETH_ABI, 
            wallet
        );
        const checkBalance = await checkEtherBalance(
            wallet.address,
            prov,
            chain,
            false
        );
        const amount = (checkBalance.balance / 10n) * BigInt(Math.floor(Math.random() * 5 + 1));
        const currentNonce = await provider.getTransactionCount(wallet.address);
        const tx = await wEth.deposit(
            {
                value : amount,
                nonce : currentNonce
            }
        );
        await tx.wait();
        randomDelay(true);
        const tx2 = await wEth.withdraw(
            amount,
            {
                nonce : currentNonce + 1
            }
        );
        await tx2.wait();
    } catch (error) {
        console.error("Error wEth Actiom ", error);
    }
}