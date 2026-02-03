/**
 * Error thrown when a git operation times out
 */
export declare class GitTimeoutError extends Error {
    constructor(message?: string);
}
/**
 * Error thrown when authentication fails for a git operation
 */
export declare class GitAuthError extends Error {
    constructor(message?: string);
}
/**
 * Error thrown when the repository is not found
 */
export declare class GitRepoNotFoundError extends Error {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map