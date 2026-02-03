/**
 * Standards-based conventions builder
 * Builds CONVENTIONS.md from official standards files
 */

import { StandardFile, getRelevantStandards } from './reader';

/**
 * Build CONVENTIONS.md content from standards files
 */
export async function buildConventionsFromStandards(
  standardsPath: string,
  technologies: string[]
): Promise<string> {
  const standards = await getRelevantStandards(standardsPath, technologies);

  if (standards.length === 0) {
    return '# Conventions\n\nNo relevant standards found for detected technologies.\n';
  }

  let content = '# Conventions\n\n';
  content += 'Development standards and guidelines from official company standards repository.\n\n';
  content += '## Table of Contents\n\n';

  // Group standards by category
  const byCategory = new Map<string, StandardFile[]>();
  for (const standard of standards) {
    const category = standard.category;
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
    }
    byCategory.get(category)!.push(standard);
  }

  // Build table of contents
  for (const [category, files] of byCategory) {
    content += `- **${category}**\n`;
    for (const file of files) {
      content += `  - [${file.technology}](#${slugify(category)}-${slugify(file.technology)})\n`;
    }
  }

  content += '\n---\n\n';

  // Add full standards content
  for (const [category, files] of byCategory) {
    content += `## ${category}\n\n`;

    for (const file of files) {
      content += `### ${file.technology}\n\n`;
      content += `<a id="${slugify(category)}-${slugify(file.technology)}"></a>\n\n`;
      content += `**Source:** \`${file.path.split('/').pop()}\`\n\n`;
      content += file.content;
      content += '\n\n---\n\n';
    }
  }

  return content;
}

/**
 * Convert text to URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
