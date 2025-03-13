# LZFarmer

LZFarmer is a modular and scalable TypeScript project designed to interact with LayerZero, aiming to be eligible for the potential ZRO airdrop.

## Architecture

```ml
|-- src
|   |-- constants
|   |   |-- contracts.ts
|   |   |-- providers.ts
|   |   |-- wallets.json
|   |-- services
|   |   |-- utils
|   |   |   |-- sleep.ts
|   |   |-- checkBalances.ts
|   |   |-- collectAllInEther.ts
|   |   |-- createAccounts.ts
|   |   |-- createClusters.ts
|   |   |-- ethersService.ts
|   |   |-- logger.ts
|   |   |-- onchainActions.ts
|   |   |-- replaceTxs.ts
|   |   |-- stargateTransfers.ts
|   |   |-- transferEth.ts
|   |   |-- txsHumanizer.ts
|   |-- CONFIG.ts
|   |-- main.ts
```

# COMMANDS

## Create Accounts

npm run createAccounts -- X Y

- X: Number of accounts to create
- Y: Cluster ID where the accounts will be created (0 for the first cluster, 1 for the second, etc.)

## Create Clusters
npm run createClusters -- Z
# Z: Number of clusters to create (each cluster will contain a random number of accounts, between 3 and 8)

# Collect Funds
npm run collect -- I J
# I: Cluster ID (0 for the first, 1 for the second, etc.)
# J: Destination chain ID where the funds will be sent

# Start Execution
npm run start
# Executes the defined route
