/**
 * Git client for repository operations
 */
export interface CloneOptions {
    depth?: number;
    timeout?: number;
}
export declare class GitClient {
    /**
     * Clone a repository to a target directory
     */
    clone(repoUrl: string, targetDir: string, options?: CloneOptions): Promise<void>;
}
//# sourceMappingURL=client.d.ts.map