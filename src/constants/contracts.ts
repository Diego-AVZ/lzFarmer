const STARGATE = [
    {
        chain : "Linea",
        address : "0x81F6138153d473E8c5EcebD3DC8Cd4903506B075",
        eId : 30183
    },
    {
        chain : "Arbitrum",
        address : "0xA45B5130f36CDcA45667738e2a258AB09f4A5f7F",
        eId : 30110
    },
    {
        chain : "Base",
        address : "0xdc181Bd607330aeeBEF6ea62e03e5e1Fb4B6F7C7",
        eId : 30184
    },
    {
        chain : "Optimism",
        address : "0xe8CDF27AcD73a434D661C84887215F7598e7d0d3",
        eId : 30111
    }
];

/*{
  chain : "",
  protocol : "",
  address : "", 
}*/
const ONCHAIN_ADDRESSES = [
    // LINEA
    {
        protocols : [
            {
                chain : "linea",
                protocol : "aave",
                address : "0xc47b8C00b0f69a36fa203Ffeac0334874574a8Ac", 
            },
            {
              chain : "linea",
              protocol : "kyberswap",
              address : "0x6131B5fae19EA4f9D964eAc0408E4408b66337b5", 
            }
        ],
        tokens : [
            {
                token : "WETH",
                address : "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f"
            },
            {
              token : "LYNX",
              address : "0x1a51b19CE03dbE0Cb44C1528E34a7EDD7771E9Af"
            }
        ]
    },
    // ARBITRUM
    {
      protocols : [
        {
            chain : "arbitrum",
            protocol : "aave",
            address : "0x794a61358D6845594F94dc1DB02A252b5b4814aD", 
        },
        {
          chain : "arbitrum",
          protocol : "balancer",
          address : "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", 
        },
        {
          chain : "arbitrum",
          protocol : "uniswap position manager",
          address : "0xC36442b4a4522E871399CD717aBDD847Ab11FE88", 
        },
        {
            chain : "arbitrum",
            protocol : "uniswap swap router",
            address : "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", 
        }    
      ],
      tokens : [
        {
            token : "WETH",
            address : "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
        },
        {
          token : "USDT",
          address : "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
        },
        {
          token : "USDC",
          address : "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
        },
        {
          token : "WBTC",
          address : "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"
        },
        {
          token : "LINK",
          address : "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4"
        },
        {
          token : "UNI",
          address : "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0"
        },
        {
          token : "ARB",
          address : "0x912CE59144191C1204E64559FE8253a0e49E6548"
        },
        {
          token : "ZRO",
          address : "0x6985884C4392D348587B19cb9eAAf157F13271cd"
        }
    ]
    },
    // BASE
    {
      protocols : [
        {
            chain : "base",
            protocol : "aave",
            address : "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5", 
        },
        {
          chain : "base",
          protocol : "lifi",
          address : "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", 
        },
        {
          chain : "base",
          protocol : "random",
          address : "0x5C9bdC801a600c006c388FC032dCb27355154cC9", 
        },
        {
          chain : "base",
          protocol : "uniswap position manager",
          address : "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1", 
        },
        {
            chain : "base",
            protocol : "uniswap swap router",
            address : "0x2626664c2603336E57B271c5C0b26F421741e481", 
        }
          
      ],
      tokens : [
          {
              token : "WETH",
              address : "0x4200000000000000000000000000000000000006"
          },
          {
            token : "USDC",
            address : "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
          },
          {
            token : "DAI",
            address : "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"
          },
          {
            token : "weETH",
            address : "0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A"
          },
          {
            token : "AAVE",
            address : "0x63706e401c06ac8513145b7687A14804d17f814b"
          },
          {
            token : "ZRO",
            address : "0x6985884C4392D348587B19cb9eAAf157F13271cd"
          }
      ]
    },
    // OPTIMISM
    {
        protocols : [
            {
                chain : "optimism",
                protocol : "uniswap position manager",
                address : "0xC36442b4a4522E871399CD717aBDD847Ab11FE88", 
            },
            {
                chain : "optimism",
                protocol : "uniswap swap router",
                address : "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", 
            },
            {
                chain : "optimism",
                protocol : "uniswap universal router",
                address : "0x851116d9223fabed8e56c0e6b8ad0c31d98b3507", 
            },
            {
                chain : "optimism",
                protocol : "aave",
                address : "0x794a61358D6845594F94dc1DB02A252b5b4814aD", 
            }
        ],
        tokens : [
            {
                token : "WETH",
                address : "0x4200000000000000000000000000000000000006"
            },
            {
                token : "USDT",
                address : "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
            },
            {
                token : "OP",
                address : "0x4200000000000000000000000000000000000042"
            },
            {
              token : "ZRO",
              address : "0x6985884C4392D348587B19cb9eAAf157F13271cd"
            },
            {
              token : "VELO",
              address : "0x3c8B650257cFb5f272f799F5e2b4e65093a11a05"
            },
            {
              token : "DAI",
              address : "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
            },
            {
              token : "LINK",
              address : "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6"
            }
        ]
    }
];


export {
    STARGATE_ABI,
    STARGATE,
    ERC20_ABI,
    ONCHAIN_ADDRESSES,
    WETH_ABI,
    AAVE_ABI,
    UNISWAP_ABI
}

const UNISWAP_ABI = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "address", "name": "tokenIn", "type": "address" },
          { "internalType": "address", "name": "tokenOut", "type": "address" },
          { "internalType": "uint24", "name": "fee", "type": "uint24" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
          { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" },
          { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }
        ],
        "internalType": "struct ExactInputSingleParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactInputSingle",
    "outputs": [
      { "internalType": "uint256", "name": "amountOut", "type": "uint256" }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]
;

const ERC20_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "balance",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
  ];

const WETH_ABI = [
    {
      "constant": false,
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "wad",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
const AAVE_ABI = [
{
    "inputs": [
    {
        "internalType": "address",
        "name": "asset",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "onBehalfOf",
        "type": "address"
    },
    {
        "internalType": "uint16",
        "name": "referralCode",
        "type": "uint16"
    }
    ],
    "name": "supply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
    {
        "internalType": "address",
        "name": "asset",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    },
    {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }
    ],
    "name": "withdraw",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "asset",
          "type": "address"
        }
      ],
      "name": "getReserveData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "data",
              "type": "uint256"
            }
          ],
          "internalType": "struct DataTypes.ReserveConfigurationMap",
          "name": "configuration",
          "type": "tuple"
        },
        {
          "internalType": "uint128",
          "name": "liquidityIndex",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "currentLiquidityRate",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "variableBorrowIndex",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "currentVariableBorrowRate",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "currentStableBorrowRate",
          "type": "uint128"
        },
        {
          "internalType": "uint40",
          "name": "lastUpdateTimestamp",
          "type": "uint40"
        },
        {
          "internalType": "uint16",
          "name": "id",
          "type": "uint16"
        },
        {
          "internalType": "address",
          "name": "aTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "stableDebtTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "variableDebtTokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "interestRateStrategyAddress",
          "type": "address"
        },
        {
          "internalType": "uint128",
          "name": "accruedToTreasury",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "unbacked",
          "type": "uint128"
        },
        {
          "internalType": "uint128",
          "name": "isolationModeTotalDebt",
          "type": "uint128"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }  
];
  

const STARGATE_ABI = [{"inputs":[{"internalType":"string","name":"_lpTokenName","type":"string"},{"internalType":"string","name":"_lpTokenSymbol","type":"string"},{"internalType":"uint8","name":"_tokenDecimals","type":"uint8"},{"internalType":"uint8","name":"_sharedDecimals","type":"uint8"},{"internalType":"address","name":"_endpoint","type":"address"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InvalidLocalDecimals","type":"error"},{"inputs":[],"name":"Path_AlreadyHasCredit","type":"error"},{"inputs":[],"name":"Path_InsufficientCredit","type":"error"},{"inputs":[],"name":"Path_UnlimitedCredit","type":"error"},{"inputs":[{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"}],"name":"SlippageExceeded","type":"error"},{"inputs":[],"name":"Stargate_InsufficientFare","type":"error"},{"inputs":[],"name":"Stargate_InvalidAmount","type":"error"},{"inputs":[],"name":"Stargate_InvalidPath","type":"error"},{"inputs":[],"name":"Stargate_InvalidTokenDecimals","type":"error"},{"inputs":[],"name":"Stargate_LzTokenUnavailable","type":"error"},{"inputs":[],"name":"Stargate_OnlyTaxi","type":"error"},{"inputs":[],"name":"Stargate_OutflowFailed","type":"error"},{"inputs":[],"name":"Stargate_Paused","type":"error"},{"inputs":[],"name":"Stargate_RecoverTokenUnsupported","type":"error"},{"inputs":[],"name":"Stargate_ReentrantCall","type":"error"},{"inputs":[],"name":"Stargate_SlippageTooHigh","type":"error"},{"inputs":[],"name":"Stargate_Unauthorized","type":"error"},{"inputs":[],"name":"Stargate_UnreceivedTokenNotFound","type":"error"},{"inputs":[],"name":"Transfer_ApproveFailed","type":"error"},{"inputs":[],"name":"Transfer_TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"indexed":false,"internalType":"struct StargateBase.AddressConfig","name":"config","type":"tuple"}],"name":"AddressConfigSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"indexed":false,"internalType":"struct Credit[]","name":"credits","type":"tuple[]"}],"name":"CreditsReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"indexed":false,"internalType":"struct Credit[]","name":"credits","type":"tuple[]"}],"name":"CreditsSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLD","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"indexed":false,"internalType":"bool","name":"oft","type":"bool"}],"name":"OFTPathSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":true,"internalType":"address","name":"toAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"name":"OFTReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"dstEid","type":"uint32"},{"indexed":true,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"name":"OFTSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"paused","type":"bool"}],"name":"PauseSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PlannerFeeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLD","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint64","name":"amountSD","type":"uint64"}],"name":"TreasuryFeeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint64","name":"amountSD","type":"uint64"}],"name":"TreasuryFeeWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint8","name":"index","type":"uint8"},{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountLD","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"composeMsg","type":"bytes"}],"name":"UnreceivedTokenCached","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"_amountLD","type":"uint256"}],"name":"addTreasuryFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"approvalRequired","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"deficitOffset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amountLD","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"amountLD","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endpoint","outputs":[{"internalType":"contract ILayerZeroEndpointV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAddressConfig","outputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"internalType":"struct StargateBase.AddressConfig","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTransferGasLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"localEid","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oftVersion","outputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"},{"internalType":"uint64","name":"version","type":"uint64"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"eid","type":"uint32"}],"name":"paths","outputs":[{"internalType":"uint64","name":"credit","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"plannerFee","outputs":[{"internalType":"uint256","name":"available","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"}],"name":"quoteOFT","outputs":[{"components":[{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"uint256","name":"maxAmountLD","type":"uint256"}],"internalType":"struct OFTLimit","name":"limit","type":"tuple"},{"components":[{"internalType":"int256","name":"feeAmountLD","type":"int256"},{"internalType":"string","name":"description","type":"string"}],"internalType":"struct OFTFeeDetail[]","name":"oftFeeDetails","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"receipt","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"internalType":"bool","name":"_payInLzToken","type":"bool"}],"name":"quoteRedeemSend","outputs":[{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"internalType":"bool","name":"_payInLzToken","type":"bool"}],"name":"quoteSend","outputs":[{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"internalType":"struct Credit[]","name":"_credits","type":"tuple[]"}],"name":"receiveCredits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint8","name":"_seatNumber","type":"uint8"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"}],"name":"receiveTokenBus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"},{"internalType":"bytes","name":"_composeMsg","type":"bytes"}],"name":"receiveTokenTaxi","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"recoverToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountLD","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"amountLD","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"_fee","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"redeemSend","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"msgReceipt","type":"tuple"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"oftReceipt","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"redeemable","outputs":[{"internalType":"uint256","name":"amountLD","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint8","name":"_index","type":"uint8"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amountLD","type":"uint256"},{"internalType":"bytes","name":"_composeMsg","type":"bytes"}],"name":"retryReceiveToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"_fee","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"send","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"msgReceipt","type":"tuple"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"oftReceipt","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"},{"internalType":"uint64","name":"minAmount","type":"uint64"}],"internalType":"struct TargetCredit[]","name":"_credits","type":"tuple[]"}],"name":"sendCredits","outputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"uint64","name":"amount","type":"uint64"}],"internalType":"struct Credit[]","name":"","type":"tuple[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"to","type":"bytes32"},{"internalType":"uint256","name":"amountLD","type":"uint256"},{"internalType":"uint256","name":"minAmountLD","type":"uint256"},{"internalType":"bytes","name":"extraOptions","type":"bytes"},{"internalType":"bytes","name":"composeMsg","type":"bytes"},{"internalType":"bytes","name":"oftCmd","type":"bytes"}],"internalType":"struct SendParam","name":"_sendParam","type":"tuple"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"_fee","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"sendToken","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"msgReceipt","type":"tuple"},{"components":[{"internalType":"uint256","name":"amountSentLD","type":"uint256"},{"internalType":"uint256","name":"amountReceivedLD","type":"uint256"}],"internalType":"struct OFTReceipt","name":"oftReceipt","type":"tuple"},{"components":[{"internalType":"uint72","name":"ticketId","type":"uint72"},{"internalType":"bytes","name":"passengerBytes","type":"bytes"}],"internalType":"struct Ticket","name":"ticket","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"feeLib","type":"address"},{"internalType":"address","name":"planner","type":"address"},{"internalType":"address","name":"treasurer","type":"address"},{"internalType":"address","name":"tokenMessaging","type":"address"},{"internalType":"address","name":"creditMessaging","type":"address"},{"internalType":"address","name":"lzToken","type":"address"}],"internalType":"struct StargateBase.AddressConfig","name":"_config","type":"tuple"}],"name":"setAddressConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_deficitOffsetLD","type":"uint256"}],"name":"setDeficitOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"internalType":"bool","name":"_oft","type":"bool"}],"name":"setOFTPath","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_gasLimit","type":"uint256"}],"name":"setTransferGasLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sharedDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stargateType","outputs":[{"internalType":"enum StargateType","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"status","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tvl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint8","name":"index","type":"uint8"}],"name":"unreceivedTokens","outputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawPlannerFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint64","name":"_amountSD","type":"uint64"}],"name":"withdrawTreasuryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];