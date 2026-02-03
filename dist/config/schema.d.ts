/**
 * Simple validation for service configuration
 * Replaces Zod schema with basic type checking
 */
export interface Service {
    name: string;
    repository?: string;
    local_path?: string;
}
export interface Config {
    version: string;
    services: Service[];
    standards_repo?: string;
}
/**
 * Validate the config object
 */
export declare function validateConfig(obj: any): Config | null;
//# sourceMappingURL=schema.d.ts.map