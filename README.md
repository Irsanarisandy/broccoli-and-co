This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Includes [Cypress](https://www.cypress.io) to do component and e2e testing, which has been integrated with [Cucumber](https://cucumber.io) to implement BDD testing for e2e.

## Getting Started

Make sure that packages are installed by running `npm i`.

If want to use Cypress, make sure that project is running locally. Otherwise, e2e testing won't work (component testing will still work).

```bash
# run project locally
npm run dev

# build project
npm run build

# lint scripts (JS/JSX/TS/TSX)
npm run lint
# lint and fix scripts (JS/JSX/TS/TSX)
npm run lint-fix

# lint styles (CSS/SCSS)
npm run stylelint
# lint and fix styles (CSS/SCSS)
npm run stylelint-fix

# run cypress tests
npm run cypress
# run cypress tests (without browser, for e2e tests)
npm run cypress:headless
# run cypress tests (without browser, for component tests)
npm run cypress:headless:comp
```

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with the browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Local URLs

- [http://localhost:3000](http://localhost:3000) : browse the website
- [http://localhost:3000/api/invite](http://localhost:3000/api/invite) : GraphQL playground to test queries

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy the Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
