#!/usr/bin/env bash
# Gera data/repos.json com os repositórios públicos (sem forks) via GitHub CLI.
# Uso: ./scripts/update-repos.sh [usuario]
set -euo pipefail

OWNER="${1:-AdrianoBarbosa}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/data/repos.json"
TMP="$(mktemp)"

gh repo list "$OWNER" \
  --visibility public \
  --source \
  --no-archived \
  --limit 200 \
  --json name,description,primaryLanguage,languages,stargazerCount,forkCount,pushedAt,updatedAt,url,homepageUrl,repositoryTopics \
  --jq '{
    owner: "'"$OWNER"'",
    generatedAt: (now | todate),
    repos: [
      .[]
      | select(.name != "'"$OWNER"'" and (.name | ascii_downcase) != ("'"$OWNER"'" | ascii_downcase) + ".github.io")
      | {
          name,
          description,
          url,
          homepage: (.homepageUrl // ""),
          language: (.primaryLanguage.name // null),
          languages: [.languages[]?.node.name],
          stars: .stargazerCount,
          forks: .forkCount,
          topics: [.repositoryTopics[]?.name],
          pushedAt
        }
    ] | sort_by(.pushedAt) | reverse
  }' > "$TMP"

if command -v jq >/dev/null; then jq . "$TMP" > "$OUT"; rm -f "$TMP"; else mv "$TMP" "$OUT"; fi
echo "repos.json atualizado: $(grep -o '"url"' "$OUT" | wc -l) repositórios"
