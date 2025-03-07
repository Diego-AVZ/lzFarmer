import { createClusters } from "./createAccounts";

if (require.main === module) {
    const args = process.argv.slice(2); 
    const clusters = args.length > 0 ? parseInt(args[0], 10) : 1; 
    if (isNaN(clusters) || clusters <= 0) {
        console.error("num > 0");
        process.exit(1);
    }
    createClusters(clusters);
}