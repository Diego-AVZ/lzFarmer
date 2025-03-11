import { MAX_TIME_SLEEPING, MIN_TIME_SLEEPING } from "../../CONFIG";

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function randomDelay(isTest:boolean): Promise<void> {
    let ms = 0;
    if(!isTest){
        ms = Math.floor(Math.random() * MAX_TIME_SLEEPING*60 + MIN_TIME_SLEEPING) * 1000;
    } else {
        ms = Math.floor(Math.random() * 15 + 10) * 1000;
    }
    console.log("🕒 SLEEPING --- Waiting ", ms / 1000, "seconds...");
    return new Promise(resolve => setTimeout(resolve, ms));
}