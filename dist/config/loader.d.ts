import { Config } from './types';
/**
 * Loads the company configuration file from ~/.gsd/company.json
 * Returns valid config or null, never throws.
 *
 * @returns Promise<Config | null> - Parsed config or null if invalid/missing
 */
export declare function loadCompanyConfig(): Promise<Config | null>;
/**
 * Gets the company configuration with caching.
 * Loads once and reuses the result for subsequent calls.
 *
 * @returns Promise<Config | null> - Cached config or null if invalid/missing
 */
export declare function getConfig(): Promise<Config | null>;
/**
 * Clears the cached configuration, forcing a reload on next getConfig() call.
 * Useful for testing or when config file is modified.
 */
export declare function clearConfigCache(): void;
//# sourceMappingURL=loader.d.ts.map