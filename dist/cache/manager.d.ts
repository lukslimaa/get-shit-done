/**
 * Manages cache directory operations for standards repositories
 */
export declare class CacheManager {
    private readonly basePath;
    constructor();
    /**
     * Ensures the cache directory exists, creating it if necessary
     */
    ensure(): Promise<void>;
    /**
     * Removes the cache directory and all its contents
     */
    clean(): Promise<void>;
    /**
     * Checks if the cache directory exists
     * @returns true if the directory exists, false otherwise
     */
    exists(): Promise<boolean>;
    /**
     * Gets the base path of the cache directory
     * @returns The cache directory path
     */
    get path(): string;
}
//# sourceMappingURL=manager.d.ts.map