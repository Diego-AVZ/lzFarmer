require('util').inspect.defaultOptions.depth = null;
require('dotenv').config();

require('ts-node').register();
require('./src/main');
