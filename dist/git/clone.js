"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneStandardsRepo = cloneStandardsRepo;
const client_1 = require("./client");
const errors_1 = require("./errors");
const manager_1 = require("../cache/manager");
/**
 * Clones a standards repository to the cache directory
 *
 * @param repoUrl - The URL of the git repository to clone (SSH or HTTPS)
 * @returns The path where the repository was cloned
 * @throws {GitTimeoutError} If the clone operation times out
 * @throws {GitAuthError} If authentication fails
 * @throws {GitRepoNotFoundError} If the repository doesn't exist
 */
async function cloneStandardsRepo(repoUrl) {
    const git = (0, client_1.createGitClient)();
    const cacheManager = new manager_1.CacheManager();
    // Ensure cache directory exists
    await cacheManager.ensure();
    const cachePath = cacheManager.path;
    // Clean existing cache if it exists and recreate
    if (await cacheManager.exists()) {
        await cacheManager.clean();
        await cacheManager.ensure();
    }
    try {
        // Clone with depth 1 for faster clone of large repos
        await git.clone(repoUrl, cachePath, ['--depth', '1']);
        return cachePath;
    }
    catch (error) {
        // Handle specific git errors with clear messages
        if (error && typeof error === 'object' && 'plugin' in error) {
            const gitError = error;
            if (gitError.plugin === 'timeout') {
                throw new errors_1.GitTimeoutError(`Clone operation timed out for ${repoUrl}`);
            }
        }
        // Check error message for specific issues
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('Repository not found') ||
            errorMessage.includes('repository does not exist') ||
            errorMessage.includes('Could not read from remote repository')) {
            throw new errors_1.GitRepoNotFoundError(`Repository not found: ${repoUrl}`);
        }
        if (errorMessage.includes('Authentication failed') ||
            errorMessage.includes('Permission denied') ||
            errorMessage.includes('Could not authenticate')) {
            throw new errors_1.GitAuthError(`Authentication failed for ${repoUrl}. Please check your credentials or SSH keys.`);
        }
        // Re-throw with improved message for other errors
        throw new Error(`Failed to clone repository ${repoUrl}: ${errorMessage}`);
    }
}
//# sourceMappingURL=clone.js.map