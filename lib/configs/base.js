const config = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
    },

    "plugins": ["@softvisio"],

    "rules": {
        "@softvisio/html-quotes": ["warn", "auto"],
        "@softvisio/camelcase": ["error", { "properties": "always" }],
        "vue/html-quotes": "off", // replaced with the @softvisio/html-quotes
    },
};

module.exports = config;
