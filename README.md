<!-- !!! DO NOT EDIT, THIS FILE IS GENERATED AUTOMATICALLY !!!  -->

> ℹ️ Please, see the full project documentation here:<br><https://softvisio-node.github.io/eslint-plugin/>

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
