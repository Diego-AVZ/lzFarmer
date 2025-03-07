import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../constants/test.json');

const pks: string[] = [];
const addresses: string[] = [];

function createEthereumAccount(cluster:number): void {
    try {
    const wallet = ethers.Wallet.createRandom();
    pks.push(wallet.privateKey);
    addresses.push(wallet.address);
    const rawData = fs.readFileSync(filePath, 'utf8');
    let json = rawData ? JSON.parse(rawData) : { clusters : [{addresses : [], privateKeys : []}]};
    json.clusters[cluster].addresses.push(wallet.address);
    json.clusters[cluster].privateKeys.push(wallet.privateKey);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    } catch(error){
        console.error(error);
    }
}

export function createAccounts(cluster:number, accounts: number): void {
    for(let i = 1; i <= accounts; i++) {
        createEthereumAccount(cluster);
    }
    //logCodeWallets();
}

export function createCluser(): void {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let json = rawData ? JSON.parse(rawData) : { clusters : [] };
    json.clusters.push({addresses: [], privateKeys: []})
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
}

export function createClusters(clusters:number) : void {
    for(let i = 0; i < clusters; i++){
        createCluser();
        const rawData = fs.readFileSync(filePath, 'utf8');
        let json = rawData ? JSON.parse(rawData)  : { clusters : [] };
        createAccounts(json.clusters.length - 1, Math.floor(Math.random() * 6 + 3));
    }
}

function logCodeWallets() {
    console.log("Paste this in your .env file : ");
    console.log();
    console.log("PRIVATE_KEY = " + pks);
    console.log();
    console.log("Paste this in your constants file : ");
    console.log();
    console.log("export const ADDRESSES:string[] = [");
    for(let i = 0; i < pks.length; i++){
        if(i < pks.length - 1){
            console.log("   '" + addresses[i] + "',");
        } else {
            console.log("   '" + addresses[i] + "'");
            console.log("]");
        }
    }
}

if (require.main === module) {
    const args = process.argv.slice(2); 
    const numAccounts = args.length > 0 ? parseInt(args[0], 10) : 3; 
    let clusterId = args.length > 1 ? parseInt(args[1], 10) : 0; 
    if (isNaN(numAccounts) || numAccounts <= 0) {
        console.error("num > 0");
        process.exit(1);
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    let json = rawData ? JSON.parse(rawData)  : { clusters : [] };
    if(clusterId > json.clusters.length - 1){
        createCluser();
        clusterId = json.clusters.length - 1;
    }
    createAccounts(clusterId, numAccounts);
}