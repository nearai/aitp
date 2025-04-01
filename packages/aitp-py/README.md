## AITP Python Package

This package is used to interact with the AITP API.

### Installation

```bash
pip install aitp
```

### Releasing

```bash
git checkout main
git pull
git checkout -b release-aitp-py-vx.x.x
# cz bump --files-only --increment patch
./scripts/publish.sh
uv lock
git add uv.lock CHANGELOG.md pyproject.toml README.md
version=$(grep '^version =' pyproject.toml | cut -d '"' -f2)
git commit -m "chore(release): bump version to $version"
git tag "v$version"
git push --tags
```
