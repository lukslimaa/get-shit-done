/**
 * Error formatting utilities for consistent error messages
 */
/**
 * Format config-related errors with actionable guidance
 */
export declare function formatConfigError(error: any): string;
/**
 * Format git operation errors with helpful context
 */
export declare function formatGitError(error: any, url?: string): string;
/**
 * Format standards-related errors
 */
export declare function formatStandardsError(error: any, context: string): string;
/**
 * Format service matching errors
 */
export declare function formatServiceError(serviceName: string, matches?: string[]): string;
/**
 * Format feature unavailability warnings
 */
export declare function formatFeatureWarning(feature: string, reason: string): string;
//# sourceMappingURL=formatter.d.ts.map