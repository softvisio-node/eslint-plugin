# INSTALL

You don't need to install and use this package directly, use `@softvisio/cli`.

## NPM GLOBAL INSTALL

```
npm i --location=global @softvisio/eslint-plugin
```

## NPM ADD

```
npm add --save-dev @softvisio/eslint-plugin babel-eslint eslint eslint-plugin-babel eslint-plugin-vue
```

# USE

Use the following `.eslintrc.yaml`:

```
root: true

extends:
  - 'plugin:@softvisio/recommended'
```
