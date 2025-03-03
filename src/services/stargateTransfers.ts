import { ethers } from "./ethersService";
import { STARGATE } from "../constants/contracts";
import { STARGATE_ABI } from "../constants/contracts";

export interface SendParam {
    dstEid:number,
    to: string,
    amountLD: number,
    minAmountLD: number,
    extraOptions: string,
    composeMsg: string,
    oftCmd: string
};

export interface MessagingFee {
    nativeFee: number;
    lzTokenFee: number;
}

export async function stargateTransfer(
        prov:string, 
        privateKey:string, 
        sendParam:SendParam, 
        fee:MessagingFee, 
        toAddress:string,
        _value:number
    ) {
    try {
        const provider = new ethers.JsonRpcProvider(prov);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(STARGATE[1].address, STARGATE_ABI, wallet);
        /*const gasEstimate = await contract.send.estimateGas(
            sendParam,
            fee,
            toAddress,
            { value: _value }
        );
        const gasLimit = Math.ceil(Number(gasEstimate) * 1.1);
        const feeData = await provider.getFeeData();
        console.log("!!!!!!!!!  GasLimit ", gasLimit);
        const gasPrice = feeData.gasPrice;
        console.log("GasPrice ", gasPrice);*/
        console.log("Transaction proccesing...");
        const tx = await contract.send(
            sendParam, 
            fee, 
            toAddress, 
            { 
                value: _value,
                gasLimit: 414336 , 
                gasPrice: 1856641231
            }
        );
        await tx.wait();
        console.log("Transaction confirmed:", tx.hash);
    } catch(error){
        console.error(error);
    }
}