/**
 * Quality mapper for generating conventions
 * Extracts technologies from STACK.md and builds CONVENTIONS.md from standards
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { loadStandardsFromCache } from '../standards/loader';
import { buildConventionsFromStandards } from '../standards/builder';

/**
 * Extracts technologies from STACK.md content
 *
 * @param stackContent - Content of STACK.md file
 * @returns Array of detected technologies
 */
export function extractTechnologiesFromStack(stackContent: string): string[] {
  const technologies: string[] = [];
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
export async function generateConventions(projectPath: string): Promise<string | null> {
  // Load the cached standards path
  const standardsPath = await loadStandardsFromCache();

  if (!standardsPath) {
    return null;
  }

  // Try to read STACK.md to detect technologies
  let technologies: string[] = [];
  try {
    const stackPath = join(projectPath, '.planning', 'codebase', 'STACK.md');
    const stackContent = await fs.readFile(stackPath, 'utf-8');
    technologies = extractTechnologiesFromStack(stackContent);
  } catch (error: any) {
    // If STACK.md doesn't exist, continue with empty technologies array
    // Standards builder will include general/architecture standards
    console.warn(`Could not read STACK.md: ${error?.message || 'Unknown error'}`);
  }

  // Build conventions from standards based on detected technologies
  const conventionsContent = await buildConventionsFromStandards(standardsPath, technologies);

  return conventionsContent;
}
