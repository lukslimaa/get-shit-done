"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServiceWithConfidence = findServiceWithConfidence;
exports.clearMatcherCache = clearMatcherCache;
const config_1 = require("../config");
// Config cache to avoid repeated loads
let cachedConfig = undefined;
/**
 * Normalize a service name by removing common suffixes and trimming
 * @param name - The service name to normalize
 * @returns Normalized service name
 */
function normalizeServiceName(name) {
    return name
        .replace(/\s+(Service|API|App|System|Platform|Server|Client)$/i, '')
        .trim()
        .toLowerCase();
}
/**
 * Find a service by name using simple string matching
 * @param serviceName - The service name to match
 * @param minConfidence - Minimum confidence score (0-1), defaults to 0.85 (unused but kept for API compatibility)
 * @returns ServiceMatch if found, null otherwise
 */
async function findServiceWithConfidence(serviceName, minConfidence = 0.85) {
    // Get configuration (with caching)
    if (cachedConfig === undefined) {
        cachedConfig = await (0, config_1.getConfig)();
    }
    const config = cachedConfig;
    if (!config || !config.services || config.services.length === 0) {
        return null;
    }
    // Normalize the input service name
    const normalizedInput = normalizeServiceName(serviceName);
    // Require at least 2 characters to avoid false positives
    if (normalizedInput.length < 2) {
        return null;
    }
    // Find service by checking if normalized names contain each other
    for (const service of config.services) {
        const normalizedServiceName = normalizeServiceName(service.name);
        // Check if either contains the other
        if (normalizedInput.includes(normalizedServiceName) ||
            normalizedServiceName.includes(normalizedInput)) {
            // Return the matched service with perfect confidence
            return {
                ...service,
                matchConfidence: 1.0,
            };
        }
    }
    return null;
}
/**
 * Clear the cached config
 * Useful when configuration is reloaded
 */
function clearMatcherCache() {
    cachedConfig = undefined;
}
//# sourceMappingURL=matcher.js.map