#!/usr/bin/env node
"use strict";
/**
 * CLI script for loading (cloning) company standards repository
 * Usage: load-standards
 *
 * Clones the standards repository if standards_repo is configured in company.json.
 * Caches the path for future use.
 * Outputs the path to stdout if successful.
 * Exits with code 1 if standards_repo is not configured or clone fails.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../standards/loader");
async function main() {
    try {
        const standardsPath = await (0, loader_1.loadStandardsRepo)();
        if (standardsPath) {
            console.log(`Standards loaded: ${standardsPath}`);
            process.exit(0);
        }
        else {
            console.error('Standards repository not configured in ~/.gsd/company.json');
            process.exit(1);
        }
    }
    catch (error) {
        console.error(`Failed to load standards: ${error?.message || 'Unknown error'}`);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error(`Unexpected error: ${error?.message || 'Unknown error'}`);
    process.exit(1);
});
//# sourceMappingURL=load-standards.js.map