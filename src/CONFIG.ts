const CREATE_ACCOUNTS = false;
const HUMANIZE_TXS = true;

const MAX_NUMBER_OF_HUMAN_TXS = 3;
const MIN_TIME_SLEEPING = 1; // IN MINUTES
const MAX_TIME_SLEEPING = 4; // IN MINUTES

const INITIAL_CLUSTER = 0;

const NUMBER_CLUSTERS_TO_FARM = 2;

const IS_TEST = false;

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
        chainFrom : 3,
        chainTo : 1,
        sendAll : true
    },
    {
        chainFrom : 1,
        chainTo : 2,
        sendAll : true
    },
    {
        chainFrom : 2,
        chainTo : 3,
        sendAll : true
    }
];


export {
    CREATE_ACCOUNTS,
    FARM_ROUTE,
    INITIAL_CLUSTER,
    NUMBER_CLUSTERS_TO_FARM,
    IS_TEST,
    MAX_NUMBER_OF_HUMAN_TXS,
    MIN_TIME_SLEEPING,
    MAX_TIME_SLEEPING,
    HUMANIZE_TXS
}

/* 
 ROUTE EXAMPLE => 
    BASE - Linea - UNI - ARB - OPT - BASE
*/