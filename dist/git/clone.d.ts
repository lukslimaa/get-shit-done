/**
 * Clones a standards repository to the cache directory
 *
 * @param repoUrl - The URL of the git repository to clone (SSH or HTTPS)
 * @returns The path where the repository was cloned
 * @throws {GitTimeoutError} If the clone operation times out
 * @throws {GitAuthError} If authentication fails
 * @throws {GitRepoNotFoundError} If the repository doesn't exist
 */
export declare function cloneStandardsRepo(repoUrl: string): Promise<string>;
//# sourceMappingURL=clone.d.ts.map