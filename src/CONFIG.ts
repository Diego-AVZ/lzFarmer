const CREATE_ACCOUNTS = false;

const MAX_NUMBER_OF_HUMAN_TXS = 3;

const INITIAL_CLUSTER = 0;

const NUMBER_CLUSTERS_TO_FARM = 1;

/*
* DOCUMENTATION
* 
* * SET Networks:
* * * LINEA        ----- 0
* * * ARBITRUM     ----- 1
* * * BASE         ----- 2
* * * OPTIMISM     ----- 3
* * SEND ALL == true -> for sending max value
* * SEND ALL == false -> for sending HALF max value (50%)
*/
const FARM_ROUTE = [
    {
        chainFrom : 2,
        chainTo : 3,
        sendAll : true
    }
];

const IS_TEST = true;

export {
    CREATE_ACCOUNTS,
    FARM_ROUTE,
    INITIAL_CLUSTER,
    NUMBER_CLUSTERS_TO_FARM,
    IS_TEST,
    MAX_NUMBER_OF_HUMAN_TXS
}

/* 
 ROUTE EXAMPLE => 
    BASE - Linea - UNI - ARB - OPT - BASE
*/