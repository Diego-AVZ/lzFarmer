import { ethers } from "./ethersService";
import { STARGATE } from "../constants/contracts";
import { STARGATE_ABI } from "../constants/contracts";
import { checkEtherBalance } from "./checkBalances";

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
) {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(stargateAddress, STARGATE_ABI, wallet);
        
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
        const gasPrice = feeData.gasPrice * 2n; 

        console.log("🚀 Transaction processing...");
        const tx = await contract.send(
            sendParam, 
            fee, 
            toAddress, 
            { 
                value: _value,
                gasLimit: gasLimit, 
                gasPrice: gasPrice
            }
        );
        await tx.wait();
        console.log("✅ Transaction confirmed:", tx.hash);
    } catch(error) {
        console.error("Stargate Transfer Error:");
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
                { value: 10000 }
            );
        } catch (estimateError) {
            console.warn("egasEstimation failed");
            gasEstimate = 450000n;
        }
        const gasLimit = BigInt(Math.ceil(Number(gasEstimate) * 1.2));
        
        const feeData = await provider.getFeeData();
        const gasPrice = feeData.gasPrice * 2n; 
        const gasCostInWei = gasPrice * gasLimit;
        
        const to = ethers.zeroPadValue(toAddress, 32);
        const estimatedAmountLD = balance - gasCostInWei;
        const nativeFee = await contract.quoteSend(
            [sendParam.dstEid, to, estimatedAmountLD, sendParam.minAmountLD, "0x", "0x", "0x"],
            false
        );
        const buffer = 1n * 10n**15n;
        const amountToSend = balance - nativeFee[0] - gasCostInWei - buffer;
        const maxValue = amountToSend + nativeFee[0];
        /*
        console.log("GAS COST ", gasCostInWei);
        console.log("BALANCE ", balance);
        console.log("NATIVE COST ", nativeFee[0]);
        console.log("VALUE TO SEND ", maxValue);
        console.log("AMOUNT TO SEND ", amountToSend);
        */
        return {
            maxValue: maxValue,
            amountLD: amountToSend,
            requiredFee : nativeFee[0]
        };
    } catch(error) {
        console.error("Calculate Max Value Error:", error);
        throw error;
    }
}
