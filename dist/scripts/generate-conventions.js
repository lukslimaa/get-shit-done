#!/usr/bin/env node
"use strict";
/**
 * CLI script for generating conventions from standards repository
 * Usage: generate-conventions [project-path]
 *
 * Outputs conventions content to stdout if standards are configured and available.
 * Exits with code 1 if standards are not available (no standards_repo in config, or clone failed).
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mapper_1 = require("../quality/mapper");
async function main() {
    // Get project path from argument or use current directory
    const projectPath = process.argv[2] || process.cwd();
    try {
        const conventions = await (0, mapper_1.generateConventions)(projectPath);
        if (conventions) {
            // Output conventions content to stdout
            console.log(conventions);
            process.exit(0);
        }
        else {
            // Standards not available
            process.exit(1);
        }
    }
    catch (error) {
        // Any error means standards not available
        process.exit(1);
    }
}
main().catch(() => {
    process.exit(1);
});
//# sourceMappingURL=generate-conventions.js.map