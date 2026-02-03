"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCompanyConfig = loadCompanyConfig;
exports.getConfig = getConfig;
exports.clearConfigCache = clearConfigCache;
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const schema_1 = require("./schema");
const formatter_1 = require("../errors/formatter");
// Module-level cache for singleton pattern
let cachedConfig;
/**
 * Loads the company configuration file from ~/.gsd/company.json
 * Returns valid config or null, never throws.
 *
 * @returns Promise<Config | null> - Parsed config or null if invalid/missing
 */
async function loadCompanyConfig() {
    const configPath = (0, path_1.join)((0, os_1.homedir)(), '.gsd', 'company.json');
    try {
        // Attempt to read the config file
        const configContent = await fs_1.promises.readFile(configPath, 'utf-8');
        // Parse JSON content
        let rawConfig;
        try {
            rawConfig = JSON.parse(configContent);
        }
        catch (parseError) {
            parseError.path = configPath;
            console.warn((0, formatter_1.formatConfigError)(parseError));
            return null;
        }
        // Validate config structure
        const validatedConfig = (0, schema_1.validateConfig)(rawConfig);
        if (!validatedConfig) {
            // Log validation failure
            const error = new Error('Invalid configuration structure');
            error.path = configPath;
            console.warn((0, formatter_1.formatConfigError)(error));
            return null;
        }
        return validatedConfig;
    }
    catch (error) {
        // Add path to error for better formatting
        error.path = configPath;
        if (error.code !== 'ENOENT') {
            // Only log errors other than "file not found"
            console.warn((0, formatter_1.formatConfigError)(error));
        }
        return null;
    }
}
/**
 * Gets the company configuration with caching.
 * Loads once and reuses the result for subsequent calls.
 *
 * @returns Promise<Config | null> - Cached config or null if invalid/missing
 */
async function getConfig() {
    // If we haven't attempted to load yet
    if (cachedConfig === undefined) {
        cachedConfig = await loadCompanyConfig();
    }
    return cachedConfig;
}
/**
 * Clears the cached configuration, forcing a reload on next getConfig() call.
 * Useful for testing or when config file is modified.
 */
function clearConfigCache() {
    cachedConfig = undefined;
}
//# sourceMappingURL=loader.js.map