const config = {
    "rules": {
        "html-quotes": ( await import( "#lib/rules/html-quotes" ) ).default,
        "camel-case": ( await import( "#lib/rules/camel-case" ) ).default,
        "import-require-node-prefix": ( await import( "./rules/import-require-node-prefix.cjs" ) ).default,
    },
    "configs": {
        "recommended": {
            "name": "@softvisio:recommended",

            "plugins": {
                get [ "@softvisio" ] () {
                    return config;
                },
            },

            "rules": {
                "@softvisio/html-quotes": [ "warn", "auto" ],
                "@softvisio/camel-case": [ "error", { "properties": "always" } ],
                "@softvisio/import-require-node-prefix": [ "error" ],
                "vue/html-quotes": "off", // replaced with the @softvisio/html-quotes
            },
        },
    },
};

export default config;
