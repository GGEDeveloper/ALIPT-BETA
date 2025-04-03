# Project Checkpoints

This file documents the major checkpoints/versions of the ALIPT-BETA project.

## Checkpoints

### v1.0-auth-checkout (Current)
- **Date**: April 3, 2025
- **Git Tag**: `v1.0-auth-checkout`
- **Description**: Authentication system implementation with checkout restrictions
- **Features**:
  - Authentication context with login/logout functionality
  - Product cards with price visibility restricted to logged-in users
  - "Buy Now" button for immediate checkout
  - Cart page with login requirement
  - Stock status display improvements

## How to Use Checkpoints

To revert to a specific checkpoint:

```bash
# View checkpoint details
git show [TAG_NAME]

# Checkout to a specific checkpoint (creates a detached HEAD)
git checkout [TAG_NAME]

# Create a new branch from a checkpoint
git checkout -b [NEW_BRANCH_NAME] [TAG_NAME]

# Reset current branch to a checkpoint (caution: removes all changes after the checkpoint)
git reset --hard [TAG_NAME]
```

## Creating New Checkpoints

To create a new checkpoint:

```bash
# Commit your changes
git add .
git commit -m "Meaningful commit message"

# Create a tag (checkpoint)
git tag -a v1.x-description -m "Detailed description of this checkpoint"

# Push the tag to remote
git push origin v1.x-description
```

Then update this CHECKPOINT.md file with the new checkpoint details. 