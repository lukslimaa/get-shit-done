"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const promises_1 = require("fs/promises");
const paths_1 = require("./paths");
/**
 * Manages cache directory operations for standards repositories
 */
class CacheManager {
    constructor() {
        this.basePath = (0, paths_1.getStandardsCachePath)();
    }
    /**
     * Ensures the cache directory exists, creating it if necessary
     */
    async ensure() {
        await (0, promises_1.mkdir)(this.basePath, { recursive: true });
    }
    /**
     * Removes the cache directory and all its contents
     */
    async clean() {
        await (0, promises_1.rm)(this.basePath, { recursive: true, force: true, maxRetries: 3 });
    }
    /**
     * Checks if the cache directory exists
     * @returns true if the directory exists, false otherwise
     */
    async exists() {
        try {
            await (0, promises_1.stat)(this.basePath);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Gets the base path of the cache directory
     * @returns The cache directory path
     */
    get path() {
        return this.basePath;
    }
}
exports.CacheManager = CacheManager;
//# sourceMappingURL=manager.js.map