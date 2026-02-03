/**
 * Standards repository reader
 * Discovers and reads relevant standard files based on technologies
 */
export interface StandardFile {
    path: string;
    category: string;
    technology: string;
    content: string;
}
/**
 * Discover all .md files in standards repository
 */
export declare function discoverStandardFiles(standardsPath: string): Promise<StandardFile[]>;
/**
 * Get relevant standard files based on detected technologies
 */
export declare function getRelevantStandards(standardsPath: string, technologies: string[]): Promise<StandardFile[]>;
//# sourceMappingURL=reader.d.ts.map