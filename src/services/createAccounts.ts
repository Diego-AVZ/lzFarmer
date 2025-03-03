import { ethers } from "ethers";

const pks: string[] = [];
const addresses: string[] = [];

function createEthereumAccount(accountNumber: number): void {
    const wallet = ethers.Wallet.createRandom();
    pks.push(wallet.privateKey);
    addresses.push(wallet.address);
    console.log("ACCOUNT ", accountNumber, " : ");
    console.log("     · ADDRESS : ", wallet.address);
    console.log("     · PRIVATE_KEY : ", wallet.privateKey);
}

export function createAccounts(accounts: number): void {
    for(let i = 1; i <= accounts; i++) {
        createEthereumAccount(i);
    }
    logCodeWallets();
}

function logCodeWallets() {
    console.log("Paste this in your .env file : ");
    for(let i = 0; i < pks.length; i++){
        console.log("PRIVATE_KEY_" + i + " = " + pks[i]);
    }
    console.log("Paste this in your constants file : ");
    for(let i = 0; i < pks.length; i++){
        console.log("export const ADDRESS" + i + " = " + addresses[i]);
    }
}

if (require.main === module) {
    const args = process.argv.slice(2); 
    const numAccounts = args.length > 0 ? parseInt(args[0], 10) : 3; 
    if (isNaN(numAccounts) || numAccounts <= 0) {
        console.error("Por favor, pasa un número válido de cuentas (mayor que 0)");
        process.exit(1);
    }
    createAccounts(numAccounts);
}