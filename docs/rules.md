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

    -   `allowConsecutiveCapitalLetters?` <boolean\> Allow two consecutive capital letters. **Default:** `false`.

        ```javascript
        // incorrect
        var SSLCertificate;

        // correct
        var SslCertificate;
        ```

    -   `properties?` <"always" | "never"\> Check object properties.

    -   `allow?` <string[]\> List of allowed names.

    -   `allowedPrefixes?` <string[]\> List of allowed prefixes.

        ```javascript
        // incorrect
        var API_test;

        // correct
        // eslint @softvisio/cames-case: [ "error", { `allowedPrefixes: [ "API_" ] } ]
        var API_test;
        ```

## @softvisio/html-quotes

```javascript
"@softvisio/html-quotes": [ "error", options ]
```
