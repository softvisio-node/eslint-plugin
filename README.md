<!-- !!! DO NOT EDIT, THIS FILE IS GENERATED AUTOMATICALLY !!!  -->

> :information_source: Please, see the full project documentation here: [https://softvisio-node.github.io/eslint-plugin/](https://softvisio-node.github.io/eslint-plugin/).

# Introduction

Custom `eslint` rules.

## Install

```shell
npm i @softvisio/eslint-plugin
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
