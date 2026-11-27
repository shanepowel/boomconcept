import { readFileSync } from 'node:fs'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-02-01' })
const seeds = readFileSync(new URL('../seed/seed.ndjson', import.meta.url), 'utf8')
  .trim().split('\n').map((line) => JSON.parse(line))
  .filter((doc) => doc.editorialLists)

const ids = seeds.flatMap(({ _id }) => [_id, `drafts.${_id}`])
const documents = await client.fetch('*[_id in $ids]{_id, _rev, editorialLists}', { ids }, { perspective: 'raw' })
const transaction = client.transaction()
let pending = 0

for (const { _id, _rev, editorialLists } of documents) {
  if (editorialLists) continue
  const seed = seeds.find((item) => item._id === _id.replace(/^drafts\./, ''))
  if (!seed) continue
  transaction.patch(_id, (patch) => patch.ifRevisionId(_rev).setIfMissing({ editorialLists: seed.editorialLists }))
  pending++
}

if (pending && process.argv.includes('--apply')) await transaction.commit()
console.log(`${pending} document(s) ${process.argv.includes('--apply') ? 'updated' : 'eligible for update'}.`)
