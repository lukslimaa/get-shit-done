import { ServiceMatch } from './types';
/**
 * Find a service by name using simple string matching
 * @param serviceName - The service name to match
 * @param minConfidence - Minimum confidence score (0-1), defaults to 0.85 (unused but kept for API compatibility)
 * @returns ServiceMatch if found, null otherwise
 */
export declare function findServiceWithConfidence(serviceName: string, minConfidence?: number): Promise<ServiceMatch | null>;
/**
 * Clear the cached config
 * Useful when configuration is reloaded
 */
export declare function clearMatcherCache(): void;
//# sourceMappingURL=matcher.d.ts.map