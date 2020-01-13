const config = {
    "env": {
        "node": true,
        "browser": true,
        "es2020": true,
    },

    "extends": ["eslint:recommended", "plugin:vue/recommended"],

    "plugins": ["@softvisio", "babel"],

    "globals": {
        "Ext": "readonly",
    },

    "parserOptions": {
        "parser": "babel-eslint", // https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq
        "sourceType": "module",
        "ecmaVersion": 2020,
        "ecmaFeatures": {
            "jsx": true,
        },
    },

    "rules": {
        "@softvisio/html-quotes": "warn",

        // eslint-plugin-vue, https://vuejs.github.io/eslint-plugin-vue/rules
        "vue/max-attributes-per-line": ["warn", { "singleline": 99999 }],
        "vue/html-indent": ["warn", 4],
        "vue/attribute-hyphenation": ["warn", "never"], // for ExtJS webcomponents
        "vue/html-self-closing": [
            "warn",
            {
                "html": {
                    "void": "always",
                    "normal": "always",
                    "component": "always",
                },
                "svg": "always",
                "math": "always",
            },
        ],
        "vue/html-closing-bracket-spacing": [
            "warn",
            {
                "startTag": "never",
                "endTag": "never",
                "selfClosingTag": "never", // set to "always" to make compatible with the prettier <br />
            },
        ],
        "vue/html-quotes": "off", // used softvisio/html-quotes

        // eslint:recommended
        "brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
        "indent": "error",
        "prefer-const": "error",
        "quote-props": ["error", "always"],
        "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "eqeqeq": ["error", "smart"],
        "yoda": ["error", "never", { "exceptRange": true }],
        "space-infix-ops": ["error", { "int32Hint": false }],
        "space-in-parens": ["error", "always", { "exceptions": ["empty"] }],
        "semi-spacing": ["error", { "before": false, "after": true }],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "curly": ["error", "multi-line"],
        "space-before-function-paren": ["error", "always"],
        "function-paren-newline": ["error", "never"],
        "no-unused-vars": "warn",
        "no-global-assign": "error",

        // TODO eslint
        // "array-bracket-newline": "error",
        // "array-bracket-spacing": "error",
        // "array-element-newline": "error",
        // "arrow-body-style": "error",
        // "arrow-parens": "error",
        // "arrow-spacing": "error",
        // "block-spacing": "error",
        // "capitalized-comments": "error",
        // "comma-dangle": "error",
        // "comma-style": "error",
        // "computed-property-spacing": "error",
        // "dot-location": "error",
        // "dot-notation": "error",
        // "eol-last": "error",
        // "func-call-spacing": "error",
        // "generator-star-spacing": "error",
        // "implicit-arrow-linebreak": "error",
        // "indent": "error",
        // "jsx-quotes": "error",
        // "key-spacing": "error",
        // "keyword-spacing": "error",
        // "linebreak-style": "error",
        // "lines-around-comment": "error",
        // "lines-between-class-members": "error",
        // // "multiline-comment-style": "off", // Do not convert comments
        // "new-parens": "error",
        // "newline-per-chained-call": "error",
        // "no-confusing-arrow": "error",
        // "no-console": "off",
        // "no-else-return": "error",
        // "no-extra-bind": "error",
        // "no-extra-boolean-cast": "error",
        // "no-extra-label": "error",
        // "no-extra-parens": "error",
        // "no-extra-semi": "error",
        // "no-floating-decimal": "error",
        // "no-implicit-coercion": "error",
        // "no-lonely-if": "error",
        // "no-multi-spaces": "error",
        // "no-multiple-empty-lines": "error",
        // "no-regex-spaces": "error",
        // "no-trailing-spaces": "error",
        // "no-undef-init": "error",
        // "no-unneeded-ternary": "error",
        // "no-unsafe-negation": "error",
        // "no-unused-labels": "error",
        // "no-useless-computed-key": "error",
        // "no-useless-rename": "error",
        // "no-useless-return": "error",
        // "no-var": "error",
        // "no-whitespace-before-property": "error",
        // "nonblock-statement-body-position": "error",
        // "object-curly-newline": "error",
        // "object-curly-spacing": "error",
        // "object-property-newline": "error",
        // "object-shorthand": "error",
        // "one-var": "error",
        // "one-var-declaration-per-line": "error",
        // "operator-assignment": "error",
        // "operator-linebreak": "error",
        // "padded-blocks": "error",
        // "padding-line-between-statements": "error",
        // "prefer-arrow-callback": "error",
        // "prefer-destructuring": "error",
        // "prefer-numeric-literals": "error",
        // "prefer-object-spread": "error",
        // "prefer-template": "error",
        // "rest-spread-spacing": "error",
        // "semi": "error",
        // "semi-style": "error",
        // "sort-imports": "error",
        // "sort-vars": "warn",
        // "space-before-blocks": "error",
        // "space-unary-ops": "error",
        // "spaced-comment": "error",
        // "strict": "error",
        // "switch-colon-spacing": "error",
        // "template-curly-spacing": "error",
        // "template-tag-spacing": "error",
        // "unicode-bom": "error",
        // "wrap-iife": "error",
        // "wrap-regex": "error",
        // "yield-star-spacing": "error",
    },
};

// eslint-plugin-prettier, https://github.com/prettier/eslint-plugin-prettier
// eslint-disable-next-line
if (false) {
    config.extends.push( "plugin:prettier/recommended", "prettier/vue" );

    // eslint-plugin-prettier, https://github.com/prettier/eslint-plugin-prettier
    config.riles["prettier/prettier"] = [
        "warn",
        {
            "endOfLine": "lf",
            "tabWidth": 4,
            "printWidth": 999999,
            "vueIndentScriptAndStyle": true,
            "singleQuote": true,
            "quoteProps": "consistent",
            "trailingComma": "es5",
        },
        {
            "usePrettierrc": true,
        },
    ];
}

module.exports = config;