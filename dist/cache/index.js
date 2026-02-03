"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStandardsCachePath = exports.getCacheBasePath = exports.CacheManager = void 0;
// Export cache module API
var manager_1 = require("./manager");
Object.defineProperty(exports, "CacheManager", { enumerable: true, get: function () { return manager_1.CacheManager; } });
var paths_1 = require("./paths");
Object.defineProperty(exports, "getCacheBasePath", { enumerable: true, get: function () { return paths_1.getCacheBasePath; } });
Object.defineProperty(exports, "getStandardsCachePath", { enumerable: true, get: function () { return paths_1.getStandardsCachePath; } });
//# sourceMappingURL=index.js.map