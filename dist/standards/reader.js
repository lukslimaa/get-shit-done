"use strict";
/**
 * Standards repository reader
 * Discovers and reads relevant standard files based on technologies
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverStandardFiles = discoverStandardFiles;
exports.getRelevantStandards = getRelevantStandards;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Recursively discover all .md files in standards repository
 */
async function discoverMarkdownFiles(dirPath, basePath) {
    const files = [];
    try {
        const entries = await fs_1.promises.readdir(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = (0, path_1.join)(dirPath, entry.name);
            if (entry.isDirectory() && entry.name !== '.git' && entry.name !== 'node_modules') {
                // Recursively search subdirectories
                const subFiles = await discoverMarkdownFiles(fullPath, basePath);
                files.push(...subFiles);
            }
            else if (entry.isFile() && entry.name.endsWith('.md')) {
                // Skip top-level docs (README, CHANGELOG, etc.)
                if (fullPath === (0, path_1.join)(basePath, entry.name)) {
                    continue;
                }
                const content = await fs_1.promises.readFile(fullPath, 'utf-8');
                const relativePath = fullPath.replace(basePath + '/', '');
                const parts = relativePath.split('/');
                // Category is the immediate parent directory
                const category = parts.length > 1 ? parts[0] : 'general';
                // Technology is filename without extension
                const technology = (0, path_1.basename)(entry.name, '.md');
                files.push({
                    path: fullPath,
                    category,
                    technology,
                    content,
                });
            }
        }
    }
    catch (error) {
        console.warn(`Could not read directory ${dirPath}: ${error?.message || 'Unknown error'}`);
    }
    return files;
}
/**
 * Discover all .md files in standards repository
 */
async function discoverStandardFiles(standardsPath) {
    return discoverMarkdownFiles(standardsPath, standardsPath);
}
/**
 * Get relevant standard files based on detected technologies
 */
async function getRelevantStandards(standardsPath, technologies) {
    const allStandards = await discoverStandardFiles(standardsPath);
    const normalizedTechs = technologies.map((t) => t.toLowerCase().trim());
    return allStandards.filter((standard) => {
        const stdTech = standard.technology.toLowerCase();
        const stdCategory = standard.category.toLowerCase();
        // Match if technology or category name appears in detected technologies
        return (normalizedTechs.some((tech) => stdTech.includes(tech) ||
            tech.includes(stdTech) ||
            stdCategory.includes(tech) ||
            tech.includes(stdCategory)) ||
            // Always include architecture and general standards
            stdCategory === 'architecture' ||
            stdCategory === 'general');
    });
}
//# sourceMappingURL=reader.js.map