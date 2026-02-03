"use strict";
/**
 * Simple validation for service configuration
 * Replaces Zod schema with basic type checking
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
/**
 * Validate a service object
 */
function isValidService(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.name === 'string' &&
        obj.name.length > 0 &&
        (obj.repository === undefined || typeof obj.repository === 'string') &&
        (obj.local_path === undefined || typeof obj.local_path === 'string'));
}
/**
 * Validate the config object
 */
function validateConfig(obj) {
    // Basic structure check
    if (typeof obj !== 'object' || obj === null) {
        return null;
    }
    // Validate version
    const version = obj.version || '1.0.0';
    if (typeof version !== 'string') {
        return null;
    }
    // Validate services array
    const services = obj.services || [];
    if (!Array.isArray(services)) {
        return null;
    }
    // Validate each service
    for (const service of services) {
        if (!isValidService(service)) {
            return null;
        }
    }
    // Validate standards_repo if present
    const standards_repo = obj.standards_repo;
    if (standards_repo !== undefined && typeof standards_repo !== 'string') {
        return null;
    }
    return {
        version,
        services,
        standards_repo,
    };
}
//# sourceMappingURL=schema.js.map