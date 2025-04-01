#!/usr/bin/env bash
set -e
echo "Which version increment would you like to use?"
echo "Options: major, minor, patch"
read -p "Enter your choice: " increment
case $increment in
    major|minor|patch)
        ;;
    *)
        echo "Invalid choice. Please use major, minor, or patch."
        exit 1
        ;;
esac
echo "Running: cz bump --files-only --increment $increment"
cz bump --files-only --increment $increment
