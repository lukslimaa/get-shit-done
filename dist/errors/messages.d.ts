/**
 * Centralized error message templates with actionable guidance
 */
export declare const ERROR_MESSAGES: {
    CONFIG_NOT_FOUND: (path: string) => string;
    CONFIG_INVALID_JSON: (path: string, error: string) => string;
    CONFIG_PERMISSION_DENIED: (path: string) => string;
    CONFIG_VALIDATION_FAILED: (path: string, errors: string[]) => string;
    STANDARDS_REPO_TIMEOUT: (url: string) => string;
    STANDARDS_REPO_AUTH_FAILED: (url: string) => string;
    STANDARDS_FILE_INVALID: (file: string, error: string) => string;
    STANDARDS_FILE_NOT_FOUND: (file: string) => string;
    SERVICE_NO_MATCHES: (serviceName: string) => string;
    SERVICE_AMBIGUOUS_MATCH: (serviceName: string, matches: string[]) => string;
    GIT_OPERATION_FAILED: (operation: string, error: string) => string;
    GIT_REPO_NOT_FOUND: (path: string) => string;
    CACHE_WRITE_FAILED: (path: string) => string;
    UNEXPECTED_ERROR: (context: string, error: string) => string;
    FEATURE_UNAVAILABLE: (feature: string, reason: string) => string;
};
//# sourceMappingURL=messages.d.ts.map