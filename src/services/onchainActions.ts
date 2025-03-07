import { AAVE_ABI, ERC20_ABI, ONCHAIN_ADDRESSES, WETH_ABI } from "../constants/contracts";
import { ethers } from "./ethersService";
import { randomDelay } from "./utils/sleep";
import { checkEtherBalance } from "./checkBalances";
import { IS_TEST } from "../CONFIG";

// 0
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
        await tx.wait();
    } catch (error) {
        console.error("Error Approving Token ", error);
    }
} 

// 1
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

// 4
export async function depositAndWithdrawFromAave(prov:string, privateKey:string, chain:number) {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        let aaveAddress:string;
        const index = searchProtocol("aave", chain);
        if (index !== undefined) {
            aaveAddress = ONCHAIN_ADDRESSES[chain].protocols[index].address;
            const aave = new ethers.Contract(aaveAddress, AAVE_ABI, wallet);
            const amount = await depositWETH(prov, privateKey, chain);
            const wEth = ONCHAIN_ADDRESSES[chain].tokens[0].address;
            randomDelay(true);
            await tokenApproval(prov, privateKey, chain, wEth, amount, aaveAddress);
            const txs = await aave.supply(
                wEth,
                amount,
                wallet.address,
                0
            );
            await txs.wait();
            randomDelay(IS_TEST);
            //const aToken = await aave.getReserveData(wEth);
            //await tokenApproval(prov, privateKey, chain, aToken, amount, aaveAddress);
            const txs2 = await aave.withdraw(
                wEth,
                amount,
                wallet.address
            );
            await txs2.wait();
            randomDelay(true);
            await withdrawWETH(
                prov,
                privateKey,
                chain,
                amount
            );
        }
    } catch (error) {
        console.error("Aave ERROR: ", error);
    }
}

async function tokenApproval(prov:string, privateKey:string, chain:number, token:string, amount:bigint, spender:string) {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const token = ONCHAIN_ADDRESSES[chain].tokens[0].address;
        const erc20 = new ethers.Contract(token, ERC20_ABI, wallet);
        const tx = await erc20.approve(
                spender,
                amount
            );
        await tx.wait();
    } catch (error) {
        console.error("Error Approving Token ", error);
    }
}

async function depositWETH(prov:string, privateKey:string, chain:number): Promise <bigint>{
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
        return amount;
    } catch (error) {
        console.error("Error wEth Actiom ", error);
    }
}

async function withdrawWETH(prov:string, privateKey:string, chain:number, amount:bigint){
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const wEthAddress = ONCHAIN_ADDRESSES[chain].tokens[0].address;
        const wEth = new ethers.Contract(
            wEthAddress,
            WETH_ABI, 
            wallet
        );
        const currentNonce = await provider.getTransactionCount(wallet.address);
        const tx2 = await wEth.withdraw(
            amount,
            {
                nonce : currentNonce
            }
        );
        await tx2.wait();
    } catch (error) {
        console.error("Error wEth Actiom ", error);
    }
}

function searchProtocol(protocol:string, chain:number): number | undefined {
    const data = ONCHAIN_ADDRESSES[chain].protocols;
    for(let i = 0; i < data.length; i++){
        if(
            data[i].protocol === protocol
        ){
            return i;
        } else {
            return undefined;
        }
    }
}