/**
 * Quality mapper for generating conventions
 * Extracts technologies from STACK.md and builds CONVENTIONS.md from standards
 */
/**
 * Extracts technologies from STACK.md content
 *
 * @param stackContent - Content of STACK.md file
 * @returns Array of detected technologies
 */
export declare function extractTechnologiesFromStack(stackContent: string): string[];
/**
 * Generates CONVENTIONS.md content from standards repository
 *
 * @param projectPath - Path to the project being analyzed
 * @returns The generated conventions content, or null if no standards available
 */
export declare function generateConventions(projectPath: string): Promise<string | null>;
//# sourceMappingURL=mapper.d.ts.map