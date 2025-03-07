export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function randomDelay(isTest:boolean): Promise<void> {
    let ms = 0;
    if(!isTest){
        ms = Math.floor(Math.random() * 180 + 5) * 1000;
    } else {
        ms = Math.floor(Math.random() * 5 + 5) * 1000;
    }
    console.log("🕒 HUMANIZING TXS --- Waiting ", ms / 1000, "seconds...");
    return new Promise(resolve => setTimeout(resolve, ms));
}
