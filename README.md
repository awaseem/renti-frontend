# Renti-Frontend

## Setup

To setup just run the following commands, ensure that a renti-backend instance is running somewhere within your machine (the front-end need data to access via endpoints from the backend!). Please ensure that you have Node.js and NPM installed. Node version should be at least 4.2.2 and NPM version should be at least 2.0.0.

```
npm install

npm run watch
```

## Create Android APK

To generate APK files simply run the following command `npm run android`, this will create a new APK within the following folder: `rentiAndroidBase/android/build/outputs/apk/android-debug.apk`

## Rules to contributing

- Use an eslint plugin for your text editor! It's there to help you fix simple mistakes and follow the syntax guidelines setup by the project
- Use promises (no ajax! its not 2004 :p) for all requests to the server. This shouldn't be hard as all http methods (GET, POST, PUT, DELETE) are abstracted for you to use promises within util/request
- Use const keyword for immutable values and let keyword for mutable values, NO VARS ALLOWED WITHIN SOURCE CODE!
- Add all custom css within the styles folder
- Every react component you create has a parent named after its folder (for example: Signin.js === components/Signin)
- Only parent components are allowed to have state, meaning that you can only set states within parents. If you wish to add state to children, use props!
- Have fun and be creative, don't be sacred to mess around with things!
