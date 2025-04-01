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
cz bump --files-only --increment patch
uv lock
git add uv.lock CHANGELOG.md pyproject.toml README.md
version=$(grep '^version =' pyproject.toml | cut -d '"' -f2)
git commit -m "chore(release): bump version to $version"
git push

# after merging the PR, create a tag and push it to run a release
git tag "v$version"
git push --tags
```
