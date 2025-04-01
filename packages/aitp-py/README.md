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
./scripts/publish.sh
uv lock
git add uv.lock
git commit -m "chore: update uv.lock file for release"
git push --tags
```
