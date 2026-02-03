"use strict";
/**
 * Quality mapper for generating conventions
 * Extracts technologies from STACK.md and builds CONVENTIONS.md from standards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTechnologiesFromStack = extractTechnologiesFromStack;
exports.generateConventions = generateConventions;
const fs_1 = require("fs");
const path_1 = require("path");
const loader_1 = require("../standards/loader");
const builder_1 = require("../standards/builder");
/**
 * Extracts technologies from STACK.md content
 *
 * @param stackContent - Content of STACK.md file
 * @returns Array of detected technologies
 */
function extractTechnologiesFromStack(stackContent) {
    const technologies = [];
    const lines = stackContent.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        // Look for technology mentions in bullet points:
        // - Java 17
        // - **Spring Boot** 2.7.18
        // - Apache Camel 4.11.0 - Integration framework
        if (trimmed.startsWith('-')) {
            // Extract just the technology name (before version or dash)
            let tech = trimmed.substring(1).trim();
            // Remove bold markers
            tech = tech.replace(/\*\*/g, '');
            // Stop at: version numbers, dashes, colons, parentheses
            const stopMatch = tech.match(/^([^-:\d(]+)/);
            if (stopMatch) {
                const techName = stopMatch[1].trim();
                if (techName.length > 2) {
                    // Skip very short matches
                    technologies.push(techName);
                }
            }
        }
    }
    return technologies;
}
/**
 * Generates CONVENTIONS.md content from standards repository
 *
 * @param projectPath - Path to the project being analyzed
 * @returns The generated conventions content, or null if no standards available
 */
async function generateConventions(projectPath) {
    // Load the cached standards path
    const standardsPath = await (0, loader_1.loadStandardsFromCache)();
    if (!standardsPath) {
        return null;
    }
    // Try to read STACK.md to detect technologies
    let technologies = [];
    try {
        const stackPath = (0, path_1.join)(projectPath, '.planning', 'codebase', 'STACK.md');
        const stackContent = await fs_1.promises.readFile(stackPath, 'utf-8');
        technologies = extractTechnologiesFromStack(stackContent);
    }
    catch (error) {
        // If STACK.md doesn't exist, continue with empty technologies array
        // Standards builder will include general/architecture standards
        console.warn(`Could not read STACK.md: ${error?.message || 'Unknown error'}`);
    }
    // Build conventions from standards based on detected technologies
    const conventionsContent = await (0, builder_1.buildConventionsFromStandards)(standardsPath, technologies);
    return conventionsContent;
}
//# sourceMappingURL=mapper.js.map