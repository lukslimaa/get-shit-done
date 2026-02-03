"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitRepoNotFoundError = exports.GitAuthError = exports.GitTimeoutError = void 0;
/**
 * Error thrown when a git operation times out
 */
class GitTimeoutError extends Error {
    constructor(message = 'Git operation timed out after 30 seconds') {
        super(message);
        this.name = 'GitTimeoutError';
    }
}
exports.GitTimeoutError = GitTimeoutError;
/**
 * Error thrown when authentication fails for a git operation
 */
class GitAuthError extends Error {
    constructor(message = 'Git authentication failed') {
        super(message);
        this.name = 'GitAuthError';
    }
}
exports.GitAuthError = GitAuthError;
/**
 * Error thrown when the repository is not found
 */
class GitRepoNotFoundError extends Error {
    constructor(message = 'Git repository not found') {
        super(message);
        this.name = 'GitRepoNotFoundError';
    }
}
exports.GitRepoNotFoundError = GitRepoNotFoundError;
//# sourceMappingURL=errors.js.map