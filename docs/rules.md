# Rules

## @softvisio/camel-case

Restrict variables names to `camelCase`.

```javascript
"@softvisio/camel-case": [ "error", options ]
```

-   `options` {Object}:

    -   `ignoreDestructuring?` {boolean} Ignore names in destructuring. **Default:** `false`.

    -   `ignoreImports?` {boolean} Ignore imported names. **Default:** `false`.

    -   `ignoreGlobals?` {boolean} Ignore global names. **Default:** `false`.

    -   `allowConsecutiveCapitalLetters?` {boolean} Allow two consecutive capital letters. **Default:** `false`.

        ```javascript
        // incorrect
        var SSLCertificate;

        // correct
        var SslCertificate;
        ```

    -   `properties?` <`"always"` | `"never"`> Check object properties.

    -   `allow?` {string\[]} List of allowed names.

    -   `allowedPrefixes?` {string\[]} List of allowed prefixes.

        ```javascript
        // incorrect
        var API_test;

        // correct
        // eslint @softvisio/cames-case: [ "error", { `allowedPrefixes: [ "API_" ] } ]
        var API_test;
        ```

## @softvisio/html-quotes

Properly quote HTML attributes and brings attributes values to the consistent state.

If attribute value starts with `{` it tries to parse it as 'JSON5' and sort properties. This is usefull for `ExtJS` `JSON` attributes.

This rule disables `@vue/html-quotes`.

```javascript
"@softvisio/html-quotes": [ "error", qoteType ]
```

-   `qoteType` <`"auto"` | `"single"` | `"double"`> Sets desired attribute quote type. "auto" selects quote type automatically to avoid or minimize number of escaped characters. **Default:** `"auto"`.
