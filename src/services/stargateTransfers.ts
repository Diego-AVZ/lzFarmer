import { ethers } from "./ethersService";
import { STARGATE, STARGATE_ABI } from "../constants/contracts";
import { PROVIDERS } from "../constants/providers";

export interface SendParam {
    dstEid:number,
    to: string,
    amountLD: bigint,
    minAmountLD: bigint,
    extraOptions: string,
    composeMsg: string,
    oftCmd: string
};

export interface MessagingFee {
    nativeFee: bigint;
    lzTokenFee: number;
}

export async function stargateTransfer(
    prov: string, 
    privateKey: string,
    stargateAddress: string,
    sendParam: SendParam, 
    fee: MessagingFee, 
    toAddress: string,
    _value: bigint
): Promise <boolean> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(stargateAddress, STARGATE_ABI, wallet);
        const economyFee = fee.nativeFee + 1n / 2n;
        let gasEstimate;
        try {
            gasEstimate = await contract.send.estimateGas(
                sendParam,
                fee,
                toAddress,
                { value: _value }
            );
        } catch (estimateError) {
            console.warn("estimateGas fails");
            gasEstimate = 450000; 
        }
        const gasLimit = Math.ceil(Number(gasEstimate) * 1.2);
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice; 
        console.log("🚀 Transaction processing...");
        const tx = await contract.send(
            sendParam, 
            [economyFee,0], 
            toAddress, 
            { 
                value: _value,
                gasLimit: gasLimit, 
                gasPrice: gasPrice * 115n/100n
            }
        );
        await tx.wait();
        console.log("✅ Transaction confirmed:", tx.hash);
        return true;
    } catch(error) {
        console.error("Stargate Transfer Error ", error);
        return false;

    }
}

export function searchNetwork(network:number): {stargateAddress:string; prov:string, destId:number}{
    const stargateAddress = STARGATE[network].address;
    const prov = PROVIDERS[network];
    const destId = STARGATE[network].eId;
    return {
        stargateAddress,
        prov,
        destId
    }
}

export async function mainStargateTransfer(
    network:number,
    privateKey: string,
    sendParam: SendParam, 
    fee: MessagingFee, 
    toAddress: string,
    _value: bigint
): Promise <boolean> {
    const networkData = searchNetwork(network);
    const success = await stargateTransfer(
        networkData.prov,
        privateKey,
        networkData.stargateAddress,
        sendParam, 
        fee,
        toAddress, 
        _value
    );
    return success;
}

export function prepareSendParam(
    amountLD: bigint,
    destChain: number,
    address:string
): SendParam {
    const dstEid = searchNetwork(destChain).destId;
    const to = ethers.zeroPadValue(address, 32);
    const minAmountLD = amountLD - (amountLD * BigInt(10) / BigInt(100)); 
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

export function prepareFeeParams(nativeFee:bigint): MessagingFee { 
        const lzTokenFee = 0;
        return {
            nativeFee,
            lzTokenFee
        }
}

export async function calculateMaxValue(
    prov: string, 
    privateKey: string, 
    stargateAddress: string,
    sendParam: SendParam, 
    fee: MessagingFee, 
    toAddress: string,
    balanceUsage:bigint
): Promise<{maxValue: bigint; amountLD: bigint; requiredFee:bigint}> {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(stargateAddress, STARGATE_ABI, wallet);
        const balance = (await provider.getBalance(wallet.address)) / balanceUsage;
        let gasEstimate:bigint;
        try {
            gasEstimate = await contract.send.estimateGas(
                sendParam,
                fee,
                toAddress,
                { value: sendParam.amountLD + fee.nativeFee }
            );
        } catch (estimateError) {
            console.warn("gasEstimation failed");
            gasEstimate = 450000n;
        }
        const gasLimit = BigInt(Math.ceil(Number(gasEstimate) * 1.2));
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice * 115n/100n; 
        const gasCostInWei = gasPrice * gasLimit;
        
        const to = ethers.zeroPadValue(toAddress, 32);
        const estimatedAmountLD = balance - gasCostInWei;
        const nativeFee = await contract.quoteSend(
            [sendParam.dstEid, to, estimatedAmountLD, sendParam.minAmountLD, "0x", "0x", "0x"],
            false
        );
        const buffer = 1n * 10n**13n;
        const amountToSend = balance - nativeFee[0] - gasCostInWei - buffer;
        const maxValue = amountToSend + nativeFee[0];
        /*
        console.log("GAS COST ", gasCostInWei);
        console.log("BALANCE ", balance);
        console.log("VALUE TO SEND ", maxValue);
        console.log("AMOUNT TO SEND ", amountToSend);
        */
        return {
            maxValue: maxValue,
            amountLD: amountToSend,
            requiredFee: nativeFee[0]
        };
    } catch(error) {
        console.error("Calculate Max Value Error ", error);
        throw error;
    }
}

export async function getNativeFee(
    prov:string,
    privateKey:string,
    stargateAddress:string,
    toAddress: string,
    sendParam: SendParam
): Promise <bigint>{
    try{
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(stargateAddress, STARGATE_ABI, wallet);
        const to = ethers.zeroPadValue(toAddress, 32);
        const data = await contract.quoteSend(
            [sendParam.dstEid, to, 1000000000000000n, 0, "0x", "0x", "0x"],
            false
        );
        return data[0];
    } catch(error){
        console.error("getnativeFee ERROR: ", error);
    }
}