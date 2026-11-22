import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

test('server key-value import resolves to a tracked local module', async () => {
  const entry = new URL('../supabase-functions-server/index.tsx', import.meta.url);
  const source = await readFile(entry, 'utf8');
  const match = source.match(/import\s+\*\s+as\s+kv\s+from\s+['"]([^'"]+)['"]/);
  assert.ok(match, 'server must import its key-value module');
  assert.ok(match[1].startsWith('./'), 'key-value module must be a relative import');
  await access(new URL(match[1], entry));
});
