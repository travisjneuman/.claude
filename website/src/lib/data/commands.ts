import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Command {
  slug: string;
  name: string;
  description: string;
}

export function getCommands(): Command[] {
  const commandsDir = path.resolve(process.cwd(), '..', 'commands');

  if (!fs.existsSync(commandsDir)) {
    return [];
  }

  const files = fs.readdirSync(commandsDir).filter((f) => f.endsWith('.md'));
  const commands: Command[] = [];

  for (const file of files) {
    const slug = file.replace('.md', '');
    const raw = fs.readFileSync(path.join(commandsDir, file), 'utf-8');
    const { data, content } = matter(raw);

    const firstLine = content.trim().split('\n')[0] || '';
    const description =
      data.description ||
      firstLine.replace(/^#+\s*/, '').replace(/\*+/g, '').trim() ||
      slug;

    commands.push({
      slug,
      name: data.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
    });
  }

  return commands.sort((a, b) => a.name.localeCompare(b.name));
}
