# Typescript boilerplate :fire:

[Create React App v2](https://github.com/facebook/create-react-app) with modifications.

## Mentionable features

- Typescript
- Redux, reselect & redux-observable
- Sentry
- Jest together with [@testing-library](https://testing-library.com/docs/react-testing-library/intro)
- Cypress
- Prettier & eslint based on Airbnb config (with some modifications)
- Lazy load router routes
- CSS modules with Sass
- react-helmet
- Service worker
- Absolute paths
- Portals
- Lodash
- reselect
- classnames

## Usage

Recommended node version is defined in `.nvmrc`.

- `yarn install` - Install packages
- `yarn start` - Start development server on port 8080
- `yarn build` - Build project to the build folder
- `yarn serve` - Serve the build folder on port 9090
- `yarn analyze` - Analyzes build JavaScript bundles using the source maps
- `yarn jest:run` - Run application with [Jest](https://jestjs.io/)
- `yarn jest:watchAll` - Watch files for changes and rerun all tests when something changes with [Jest](https://jestjs.io/)
- `yarn cypress:open` - Open [Cypress](https://www.cypress.io/) test runner
- `yarn cypress:run` - Run [Cypress](https://www.cypress.io/) tests to completion
- `yarn cypress:start` - Start development server together with `cypress:open`
- `yarn cypress:ci` - Continuous integration together with `cypress:run`
- `yarn prettier:report` - Report any [prettier](https://prettier.io/) issues
- `yarn prettier:fix` - Fix any [prettier](https://prettier.io/) issues. Prettier is added to eslint, so we recommend to run `yarn eslint:fix`
- `yarn eslint:report` - Report any [eslint](https://eslint.org/) issues
- `yarn eslint:fix` - Fix any [eslint](https://eslint.org/) issues

## Component lifecycle

You should look at a component as its own lifecycle. Everything about it should be wrapped in the same folder, where the folder name is the components name, and then return itself. This is the structure and files that could/should be included:

```
.
├── components
│   └── ...
│       ├── Example
│       │   ├── Example.module.scss   # Styling
│       │   ├── Example.test.tsx      # Testing
│       │   ├── Example.tsx           # Component
│       │   └── index.ts              # Exports component
│       │   ...
│       └── index.ts                  # Exports every component within the folder
└── ...
```

## React

Since React 16.8 we have a new way of writing components and you should adapt to this. So skip class components and use [hooks](https://reactjs.org/docs/hooks-intro.html) instead.

Use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to make sure the application has a good **Auditing Performance**.

## Redux

Using [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) with a small modification, just skip to prepend your constants with `my-app`.

## Service worker

The [service worker](https://create-react-app.dev/docs/making-a-progressive-web-app/) is transformed into a component.

Why? Because we want to be able to inject a "New content is available" modal where it's possible to force reload the page.

Without this modal the user has to force reload the page themself or close all tabs with the current page.

## Styling

The application should be created with a Mobile First architecture. This is very important, so make sure to respect it.

Styling folder is based on [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) architecture. Colors, font sizes, spacings etc. are defined in `_variables.scss`, so make sure to use these. This will make the application scalable and consistent.

Specific component styling should *not* be created within the styling folder. Instead it should be a `.scss` file that's a sibling to the component, look at **Component lifecycle** above for better understanding.

A grid system is defined in `_grid.scss` and works very well with `_gutters.scss`. The grid and gutter system uses [BEM](https://en.bem.info/methodology/css/) methodology.

Make sure to use the mixin within `_respond-to.scss` when you're styling for various breakpoints. Breakpoints are then defined in `_variables.scss`. Follow this and the application will be consistent.

All *reusable* font styling should be appended in the `$font-styles` map within `_variables.scss`. This way elements can share styling without having to rewrite it every time and it's easy to make global changes. Read description of usage in `_variables.scss` above the definition of `$font-styles`. So is it okay to add `background-color: #123456;` to an element within this `$font-styles` map? **No**. It should only contain [fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals).

## Environment variables

You must create [custom environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally exposing a private key on the machine that could have the same name.

## Browser support

Supported browsers are defined in `.browserslistrc` together with IE11 polyfills in `./src/index.tsx`.

## Read more

You can learn more in the [Create React App documentation](https://create-react-app.dev/). 
