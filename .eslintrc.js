module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "accessor-pairs": 2,
        "array-callback-return": 2,
        "block-scoped-var": 2,
        "class-methods-use-this": 2,
        "curly": 2,
        "default-case": 2,
        "guard-for-in": 2,
        "no-alert": 2,
        "no-await-in-loop": 2,
        "no-constructor-return": 2,
        "no-eq-null": 2,
        "no-else-return": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-label": 2,
        "no-fallthrough": 2,
        "no-implicit-coercion": 2,
        "no-implicit-globals": 2,
        "no-invalid-this": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-multi-spaces": 2,
        "no-multi-str": 2,
        "no-new": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-octal": 2,
        "no-octal-escape": 2,
        "no-param-reassign": 2,
        "no-redeclare": 2,
        "no-return-assign": 2,
        "no-return-await": 2,
        "no-script-url": 2,
        "no-self-assign": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-throw-literal": 2,
        "no-template-curly-in-string": 2,
        "no-use-before-define": 2,
        "no-useless-catch": 2,
        "no-useless-concat": 2,
        "no-useless-escape": 2,
        "no-useless-return": 2,
        "require-atomic-updates": 2,
        "require-await": 2,
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};