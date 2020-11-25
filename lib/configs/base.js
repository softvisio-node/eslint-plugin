const config = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
    },

    "plugins": ["@softvisio"],

    "rules": {
        "@softvisio/html-quotes": ["warn", "auto"],
    },
};

module.exports = config;
