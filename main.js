require('util').inspect.defaultOptions.depth = null;
require('dotenv').config();

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: "CommonJS"
  }
});
require('./src/main');