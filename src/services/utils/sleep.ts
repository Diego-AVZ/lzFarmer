export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function randomDelay(): Promise<void> {
    const ms = Math.floor(Math.random() * 180 + 5) * 1000;
    console.log("🕒 HUMANIZING TXS --- Waiting ", ms / 1000, "seconds...");
    return new Promise(resolve => setTimeout(resolve, ms));
}
