#!/bin/bash
# Cargo Tracking App Release Script

# Check if version is provided
if [ -z "$1" ]; then
  echo "Usage: ./release.sh <version>"
  echo "Example: ./release.sh 0.1.5"
  exit 1
fi

VERSION=$1
DATE=$(date +%Y-%m-%d)

echo "Creating release version $VERSION..."

# Update package.json version
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
echo "✅ Updated package.json to version $VERSION"

# Create release archive
git add package.json
git commit -m "Bump version to $VERSION"
git tag -a v$VERSION -m "Release version $VERSION"
git archive --format=zip --output=cargo-tracking-app-v$VERSION.zip v$VERSION

echo "✅ Created release archive: cargo-tracking-app-v$VERSION.zip"

# Update CHANGELOG.md
echo "Please update the CHANGELOG.md file manually with the following template:"
echo ""
echo "## [$VERSION] - $DATE"
echo ""
echo "### Added"
echo "- "
echo ""
echo "### Changed"
echo "- "
echo ""
echo "### Fixed"
echo "- "
echo ""

# Open the editor for changelog
if command -v code &> /dev/null; then
    code CHANGELOG.md
elif command -v nano &> /dev/null; then
    nano CHANGELOG.md
elif command -v vim &> /dev/null; then
    vim CHANGELOG.md
else
    echo "Please edit CHANGELOG.md manually"
fi

# Prompt for confirmation
read -p "Have you updated the CHANGELOG.md file? (y/n) " confirm
if [ "$confirm" != "y" ]; then
  echo "Release process aborted. Please update CHANGELOG.md and try again."
  exit 1
fi

# Create release notes
echo "# Cargo Tracking App v$VERSION Release Notes" > RELEASE-v$VERSION.md
echo "" >> RELEASE-v$VERSION.md
echo "## Overview" >> RELEASE-v$VERSION.md
echo "Version $VERSION of the Cargo Tracking App introduces..." >> RELEASE-v$VERSION.md
echo "" >> RELEASE-v$VERSION.md

# Open the editor for release notes
if command -v code &> /dev/null; then
    code RELEASE-v$VERSION.md
elif command -v nano &> /dev/null; then
    nano RELEASE-v$VERSION.md
elif command -v vim &> /dev/null; then
    vim RELEASE-v$VERSION.md
else
    echo "Please edit RELEASE-v$VERSION.md manually"
fi

# Prompt for confirmation
read -p "Have you completed the release notes? (y/n) " confirm
if [ "$confirm" != "y" ]; then
  echo "Release process aborted. Please update the release notes and try again."
  exit 1
fi

# Commit changelog and release notes
git add CHANGELOG.md RELEASE-v$VERSION.md
git commit -m "Add release notes and update changelog for v$VERSION"

# Push changes
git push origin main
git push origin v$VERSION

echo "✅ Release v$VERSION completed successfully!"
echo "Don't forget to create a GitHub release with the contents of RELEASE-v$VERSION.md" 