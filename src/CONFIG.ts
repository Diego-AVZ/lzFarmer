const MODE = "farm";
const CREATE_ACCOUNTS = false;
const SIMULATE_HUMAN_TXS  = false;

const INITIAL_ACCOUNT = 10;
const NUMBER_ACCOUNTS_TO_FARM = 2;

const INITIAL_CLUSTER = 0;
const NUMBER_CLUSTERSS_TO_FARM = 2;

/*
* DOCUMENTATION
* 
* * SET Networks:
* * * SEPOLIA  --------- 0
* * * ARB-SEPOLIA  ----- 1
* * * OPT-SEPOLIA  ----- 2
* * * LINEA        ----- 3
* * * ARBITRUM     ----- 4
* * * BASE         ----- 5
* * * OPTIMISM     ----- 6
* * SEND ALL == true -> for sending max value
* * SEND ALL == false -> for sending HALF max value (50%)
*/
const FARM_ROUTE = [
    {
        chainFrom : 6,
        chainTo : 5,
        sendAll : true
    },
    {
        chainFrom : 5,
        chainTo : 6,
        sendAll : true
    }
];


export {
    MODE,
    CREATE_ACCOUNTS,
    SIMULATE_HUMAN_TXS,
    FARM_ROUTE,
    INITIAL_ACCOUNT,
    NUMBER_ACCOUNTS_TO_FARM,
    INITIAL_CLUSTER,
    NUMBER_CLUSTERSS_TO_FARM
}

/* 
 ROUTE EXAMPLE => 
    BASE - Linea - UNI - ARB - OPT - BASE
*/