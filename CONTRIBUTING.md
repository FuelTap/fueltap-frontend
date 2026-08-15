# Welcome, FuelTap Contributor

[Setting Up the Development Environment](#setting-up-the-development-environment)

[Installing Dependencies](#installing-dependencies)

[Pull Requests](#pull-requests)

## Setting Up the Development Environment

1. Fork the repository.
2. In your terminal, run the `git clone` command with the forked repository's URL, e.g.

   ```bash
   git clone https://github.com/{USERNAME}/fueltap.git
   ```

   This creates a local repository on your machine.

3. To keep your fork up to date with the development branch of the company's repository, run the following command.

   ```bash
   git config remote.upstream.fetch "+refs/heads/development:refs/remotes/upstream/development"
   ```

   Now, when you run `git fetch upstream`, Git will only fetch `upstream/development`.

4. If you decide to pull in the updates, then use the following command.

   ```bash
   git pull upstream development
   ```

5. Run `git remote -v` to verify. You should see this.

   ```bash
   origin    https://github.com/{USERNAME}/fueltap.git (fetch)
   origin    https://github.com/{USERNAME}/fueltap.git (push)
   upstream  https://github.com/fueltap/fueltap-frontend.git (fetch)
   upstream  https://github.com/fueltap/fueltap-frontend.git (push)
   ```

   _N/B_: If the origin does not show the forked repository's URL, use the command below to add it and then run `git remote -v` again to verify.

   ```bash
   git remote add origin https://github.com/{USERNAME}/fueltap.git
   ```

## Prerequisites

- Install pnpm: [https://pnpm.io/installation](https://pnpm.io/installation)

6. Run `pnpm install` from the root of your project to install already set up dependencies. Cheers! You're all set. Well done. 🎉

### Run scripts per workspace

- Run frontend dev server

  ```bash
  pnpm run dev
  ```

## Pull Requests

For a consistent pattern that is easy to understand, use the following convention for both **commit messages and PR titles**: `<type>: <description>`. The description after the `:` must be **50 characters or fewer**.

### Types

- **feat** — new feature
- **fix** — bug fix
- **docs** — documentation changes
- **refactor** — code restructuring without changing behaviour
- **test** — adding or updating tests
- **chore** — maintenance tasks (dependencies, configs)
- **perf** — performance improvements
- **style** — formatting, missing semicolons, etc.

### Good examples

```bash
feat: add conversation and read receipt endpoints
refactor: use Express global type augmentation
perf: convert login page to server component
fix: remove searchbar on mobile
style: fix typos
```

### Bad examples — do NOT do these

```bash
Added database                            # no type, no scope, vague
User authentication and authorization     # no type, no scope
Update README.md                          # no type, no scope, too generic
Fixes to errors/warnings before deployment # no type, no scope, vague
feat: add logout functionality            # missing scope — should be feat(frontend): ...
chore: add resend dependency              # missing scope — should be chore(root): ...
docs: Add CONTRIBUTING.md                 # missing scope — should be docs(root): ...
fix: resolve latest build failure         # missing scope, "latest" is vague
feat: file upload/storage                 # missing scope, slash in description
chore: add root .env and update .gitignore # missing scope, mixes two changes
feat(backend): add auth, rate-limit, and error-handling middleware # description exceeds 50 chars
```

### PR size

In the main description section, provide a clear and concise description of what the PR does. How would you know if your PR is too large? A simple indicator is if you have to add an "and" to the title. What comes after the "and" should definitely be in a separate PR.
