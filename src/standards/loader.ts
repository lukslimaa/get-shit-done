/**
 * Standards repository loader
 * Handles cloning and caching of company standards repository
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { GitClient } from '../git/client';
import { getConfig } from '../config';

const CACHE_DIR = join(homedir(), '.gsd', 'cache');
const STANDARDS_CACHE_FILE = join(CACHE_DIR, 'standards-path.txt');

/**
 * Load standards repository (clone if needed, or use cached)
 * Returns path to standards directory or null if not configured
 */
export async function loadStandardsRepo(): Promise<string | null> {
  const config = await getConfig();

  if (!config || !config.standards_repo) {
    return null;
  }

  // Check if we have a cached path
  try {
    const cachedPath = await fs.readFile(STANDARDS_CACHE_FILE, 'utf-8');
    const exists = await fs
      .access(cachedPath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      return cachedPath.trim();
    }
  } catch {
    // Cache doesn't exist, continue to clone
  }

  // Clone the repository
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });

    const repoName = config.standards_repo.split('/').pop()?.replace('.git', '') || 'standards';
    const targetDir = join(CACHE_DIR, repoName);

    // Remove existing directory if present
    await fs.rm(targetDir, { recursive: true, force: true });

    const git = new GitClient();
    await git.clone(config.standards_repo, targetDir, {
      depth: 1,
      timeout: 30000,
    });

    // Cache the path
    await fs.writeFile(STANDARDS_CACHE_FILE, targetDir);

    return targetDir;
  } catch (error: any) {
    console.warn(`Failed to clone standards repository: ${error?.message || 'Unknown error'}`);
    return null;
  }
}

/**
 * Load standards from cache (reads cached path without cloning)
 * Returns path to standards directory or null if not cached
 */
export async function loadStandardsFromCache(): Promise<string | null> {
  try {
    const cachedPath = await fs.readFile(STANDARDS_CACHE_FILE, 'utf-8');
    const exists = await fs
      .access(cachedPath)
      .then(() => true)
      .catch(() => false);

    return exists ? cachedPath.trim() : null;
  } catch {
    return null;
  }
}

/**
 * Clear standards cache
 */
export async function clearStandardsCache(): Promise<void> {
  try {
    await fs.unlink(STANDARDS_CACHE_FILE);
  } catch {
    // Ignore if doesn't exist
  }
}
