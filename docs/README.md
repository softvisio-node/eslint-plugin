# Introduction

Custom `eslint` rules.

## Install

```sh
npm install @softvisio/eslint-plugin
```

## Usage

`eslint.config.js`:

```javascript
import eslintSoftvisio from "@softvisio/eslint-plugin";

export default [

    // ...your eslint config

    // @softvisio:recommended
    eslintSoftvisio.configs.recommended,
];
```
