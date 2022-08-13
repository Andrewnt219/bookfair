Prod application is hosted at [https://prj666-bookfair.vercel.app/](https://prj666-bookfair.vercel.app/)

Dev application is hosted at [https://dev-prj666-bookfair.vercel.app](https://dev-prj666-bookfair.vercel.app)

## Development

1. Clone the repo

```bash
git clone https://github.com/Andrewnt219/bookfair.git
```

1. Checkout to dev branch

```bash
git checkout dev
```

1. Install pnpm (if you haven't)

```bash
npm i -g pnpm
```

1. Download file and rename to `.env.local` and move it into the root of your project. [Get it here](https://seneca.sharepoint.com/:u:/r/sites/Spring2022-PRJ666NBB-Team05/Shared%20Documents/Team%2005/.env.local?csf=1&web=1&e=TWPxt4)

1. Download file and rename to `.env` and move it into /functions. [Get it here](https://seneca.sharepoint.com/:u:/s/Spring2022-PRJ666NBB-Team05/ERW4v9zEq-JLmOZa-Ii31KUBp3sT6hZw8Oive5jh7utGUA?e=MMK5CJ)

1. Install dependencies

```
pnpm install --frozen-lockfile
```

1. Run the project.

```bash
pnpm dev:next
```

6. Website is lived at `http://localhost:3000`.

## Contribution

On your local machine

1. Create an issue for what you are working/fixing
2. Create a new branch for the issue. Convention: `<YourName>/<IssueNumber>-<ShortBranchDescription>`

```bash
git fetch origin
git checkout origin/dev
git switch -c "Andrew/19-CreateProfile
```

3. Update your local machine code

```
git pull origin dev --rebase
```

4. Work on the issue, commit as you go

```bash
git commit -m "fix dog"
git commit -m "add cat"
```

5. Check if your branch has any conflicts

```
git pull origin dev --rebase
```

6. Fix conflicts if any

7. Push to remote repo

```
git push origin <your-branch-name> --set-upstream
```

8. Code review

## Pull Request (Code Review)

1. Create Pull Request

2. Make sure all checks are passed (Linters and TypeScript)

3. If any changes are required by reviewers, go back to your local machine. Go back to step 4 of the Contribution guide. If you recently solve conflicts, instead of `git push`, use `git push --force` **with caution as this will overwrite your previous work**

4. Repeat step 3 until your Pull Request is approved.
