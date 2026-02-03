/**
 * Standards repository loader
 * Handles cloning and caching of company standards repository
 */
/**
 * Load standards repository (clone if needed, or use cached)
 * Returns path to standards directory or null if not configured
 */
export declare function loadStandardsRepo(): Promise<string | null>;
/**
 * Load standards from cache (reads cached path without cloning)
 * Returns path to standards directory or null if not cached
 */
export declare function loadStandardsFromCache(): Promise<string | null>;
/**
 * Clear standards cache
 */
export declare function clearStandardsCache(): Promise<void>;
//# sourceMappingURL=loader.d.ts.map