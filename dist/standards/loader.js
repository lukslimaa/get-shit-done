"use strict";
/**
 * Standards repository loader
 * Handles cloning and caching of company standards repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStandardsRepo = loadStandardsRepo;
exports.loadStandardsFromCache = loadStandardsFromCache;
exports.clearStandardsCache = clearStandardsCache;
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const client_1 = require("../git/client");
const config_1 = require("../config");
const CACHE_DIR = (0, path_1.join)((0, os_1.homedir)(), '.gsd', 'cache');
const STANDARDS_CACHE_FILE = (0, path_1.join)(CACHE_DIR, 'standards-path.txt');
/**
 * Load standards repository (clone if needed, or use cached)
 * Returns path to standards directory or null if not configured
 */
async function loadStandardsRepo() {
    const config = await (0, config_1.getConfig)();
    if (!config || !config.standards_repo) {
        return null;
    }
    // Check if we have a cached path
    try {
        const cachedPath = await fs_1.promises.readFile(STANDARDS_CACHE_FILE, 'utf-8');
        const exists = await fs_1.promises
            .access(cachedPath)
            .then(() => true)
            .catch(() => false);
        if (exists) {
            return cachedPath.trim();
        }
    }
    catch {
        // Cache doesn't exist, continue to clone
    }
    // Clone the repository
    try {
        await fs_1.promises.mkdir(CACHE_DIR, { recursive: true });
        const repoName = config.standards_repo.split('/').pop()?.replace('.git', '') || 'standards';
        const targetDir = (0, path_1.join)(CACHE_DIR, repoName);
        // Remove existing directory if present
        await fs_1.promises.rm(targetDir, { recursive: true, force: true });
        const git = new client_1.GitClient();
        await git.clone(config.standards_repo, targetDir, {
            depth: 1,
            timeout: 30000,
        });
        // Cache the path
        await fs_1.promises.writeFile(STANDARDS_CACHE_FILE, targetDir);
        return targetDir;
    }
    catch (error) {
        console.warn(`Failed to clone standards repository: ${error?.message || 'Unknown error'}`);
        return null;
    }
}
/**
 * Load standards from cache (reads cached path without cloning)
 * Returns path to standards directory or null if not cached
 */
async function loadStandardsFromCache() {
    try {
        const cachedPath = await fs_1.promises.readFile(STANDARDS_CACHE_FILE, 'utf-8');
        const exists = await fs_1.promises
            .access(cachedPath)
            .then(() => true)
            .catch(() => false);
        return exists ? cachedPath.trim() : null;
    }
    catch {
        return null;
    }
}
/**
 * Clear standards cache
 */
async function clearStandardsCache() {
    try {
        await fs_1.promises.unlink(STANDARDS_CACHE_FILE);
    }
    catch {
        // Ignore if doesn't exist
    }
}
//# sourceMappingURL=loader.js.map