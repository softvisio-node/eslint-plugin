# Rules

## @softvisio/camel-case

Restrict variables names to `camelCase`.

```javascript
"@softvisio/camel-case": [ "error", options ]
```

-   `options` <Object\>:

    -   `ignoreDestructuring?` <boolean\> Ignore names in destructuring. **Default:** `false`.

    -   `ignoreImports?` <boolean\> Ignore imported names. **Default:** `false`.

    -   `ignoreGlobals?` <boolean\> Ignore global names. **Default:** `false`.

    -   `allowConsecutiveCapitalLetters?` <boolean\> Allow two consecutive capital letters. For example `var SSLCertificate`. **Default:** `false`.

    -   `properties?` <"always" | "never"\> Check object properties.

    -   `allow?` <string[]\> List of allowed names.

    -   `allowedPrefixes?` <string[]\> List of allowed prefixes. For example: `[ "API_" ]` allows names such as `var API_test`.

## @softvisio/html-quotes

```javascript
"@softvisio/html-quotes": [ "error", options ]
```
