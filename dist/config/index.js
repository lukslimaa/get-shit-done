"use strict";
/**
 * Main entry point for the config module.
 * Provides clean API for loading and accessing company configuration.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConfigCache = exports.getConfig = exports.loadCompanyConfig = void 0;
// Export loader functions
var loader_1 = require("./loader");
Object.defineProperty(exports, "loadCompanyConfig", { enumerable: true, get: function () { return loader_1.loadCompanyConfig; } });
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return loader_1.getConfig; } });
Object.defineProperty(exports, "clearConfigCache", { enumerable: true, get: function () { return loader_1.clearConfigCache; } });
//# sourceMappingURL=index.js.map