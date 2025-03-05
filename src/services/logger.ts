import { STARGATE } from "../constants/contracts"

export function loggerTransfer(fromChainN: number, toChainN: number) {
    const fromChain = STARGATE[fromChainN].chain;
    const toChain = STARGATE[toChainN].chain;

    const reset = "\x1b[0m";
    const blue = "\x1b[34m";  
    const green = "\x1b[32m"; 

    console.log();
    console.log(`Transfer from 🏹  ${blue}${fromChain}${reset}`);
    console.log(`Transfer to 🎯  ${green}${toChain}${reset}`);
    console.log();
}

export function loggerCheckBalance(fromChainN: number, address: string, balance: string, isBalanceSufficient: boolean) {
    const fromChain = STARGATE[fromChainN].chain;

    const reset = "\x1b[0m";
    const red = "\x1b[31m"; 
    const green = "\x1b[32m";
    const blue = "\x1b[34m";  
    const yellow = "\x1b[33m";

    const formattedBalance = Number(balance).toFixed(3);

    console.log();
    if (isBalanceSufficient) {
        console.log(`🔍 ${blue}${address}${reset} Ether Balance: ${green}${formattedBalance}${reset} ETH on chain: ${yellow}${fromChain}${reset}`);
    } else {
        console.log(`🔍 ${blue}${address}${reset} Ether Balance: ${red}${formattedBalance} (Insufficient)${reset} ETH on chain: ${yellow}${fromChain}${reset}`);
    }
    console.log();
}
