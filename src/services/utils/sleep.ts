export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function randomDelay(isTest:boolean): Promise<void> {
    let ms = 0;
    if(!isTest){
        ms = Math.floor(Math.random() * 180 + 15) * 1000;
    } else {
        ms = Math.floor(Math.random() * 15 + 10) * 1000;
    }
    console.log("🕒 SLEEPING --- Waiting ", ms / 1000, "seconds...");
    return new Promise(resolve => setTimeout(resolve, ms));
}
