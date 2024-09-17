# Introduction

Custom `eslint` rules.

## Install

```shell
npm i @softvisio/eslint-plugin
```

## Usage

```javascript
import eslintSoftvisio from "@softvisio/eslint-plugin";

export default [
    // ...your eslint config

    // @softvisio:recommended
    eslintSoftvisio.configs.recommended,
];
```
