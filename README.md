# Geo Sense Plus 2 Admin Dashboard (geo-sense-plus2-admin)

Admin dashboard sandbox for Geo Sense Plus 2 

build by Quasar 2.0 beta, vue3, and typescript.

## Main Dependencies and documentation
+ [Quasar v2.0.0-beta.11](https://next.quasar.dev/)
+ [Material Icon](https://fonts.google.com/icons?selected=Material+Icons&icon.query=public)

## Dev and build

Install the dependencies
```bash
yarn
```

Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

Lint the files
```bash
yarn run lint
```

Build the app for production
```bash
quasar build
```

Customize the configuration
See [Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

## CI
This app is deployed on firebase: 
https://geo-sense-plus2-admin-sandbox.firebaseapp.com

Merging to master branch triggers automatically deployment by 
Actions -> Deploy to Firebase Hosting on merge.

Reference to `.github/workflows/firebase-hosting-merge.yml`

PR targeting to master branch triggers automatically preview deployment by 
Actions -> Deploy to Firebase hosting on PR.

Reference to `.github/workflows/firebase-hosting-pull-request.yml` and 
[PR #1](`https://github.com/RedwoodTEQ/geo-sense-plus2-admin/pull/1`)
