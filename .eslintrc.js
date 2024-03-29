module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  parser: "babel-eslint",
  plugins: ["react"],
  rules: {
    "accessor-pairs": "error",
    "array-bracket-spacing": "error",
    "array-callback-return": "error",
    "arrow-spacing": [
      "error",
      {
        after: true,
        before: true,
      },
    ],
    "block-scoped-var": "error",
    "block-spacing": ["error", "never"],
    "callback-return": "error",
    "capitalized-comments": "error",
    complexity: "error",
    "computed-property-spacing": ["error", "never"],
    "consistent-this": "error",
    curly: "error",
    "dot-location": "error",
    "dot-notation": "error",
    "eol-last": "error",
    eqeqeq: "error",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": "error",
    "generator-star-spacing": "error",
    "global-require": "error",
    "guard-for-in": "error",
    "handle-callback-err": "error",
    "id-blacklist": "error",
    "id-match": "error",
    indent: "off",
    "init-declarations": "error",
    "jsx-quotes": "error",
    "key-spacing": "error",
    "keyword-spacing": [
      "error",
      {
        after: true,
        before: true,
      },
    ],
    "line-comment-position": "error",
    "linebreak-style": ["error", "unix"],
    "lines-around-directive": "error",
    "max-depth": "error",
    "max-lines": "off",
    "max-nested-callbacks": "error",
    "max-params": "error",
    "max-statements": ["error", 20],
    "max-statements-per-line": "error",
    "new-cap": "error",
    "new-parens": "error",
    "newline-after-var": ["error", "always"],
    "newline-before-return": "error",
    "newline-per-chained-call": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-await-in-loop": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-catch-shadow": "error",
    "no-compare-neg-zero": "error",
    "no-confusing-arrow": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-duplicate-imports": "error",
    "no-empty-function": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-inline-comments": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-mixed-operators": "error",
    "no-mixed-requires": "error",
    "no-multi-assign": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-multiple-empty-lines": "error",
    "no-native-reassign": "error",
    "no-negated-condition": "error",
    "no-negated-in-lhs": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-require": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-path-concat": "error",
    "no-plusplus": "error",
    "no-process-env": "error",
    "no-process-exit": "error",
    "no-proto": "error",
    "no-prototype-builtins": "error",
    "no-restricted-globals": "error",
    "no-restricted-imports": "error",
    "no-restricted-modules": "error",
    "no-restricted-properties": "error",
    "no-restricted-syntax": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-spaced-func": "error",
    "no-sync": "error",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "no-warning-comments": "error",
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "nonblock-statement-body-position": "error",
    "object-shorthand": "error",
    "one-var": "off",
    "one-var-declaration-per-line": "error",
    "operator-assignment": "error",
    "padded-blocks": "off",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": "error",
    "prefer-numeric-literals": "error",
    "prefer-promise-reject-errors": "error",
    "prefer-reflect": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    radix: "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "require-await": "error",
    "rest-spread-spacing": "error",
    "semi-spacing": "error",
    "sort-vars": "error",
    "space-before-blocks": "error",
    "space-unary-ops": "error",
    "spaced-comment": "error",
    strict: "error",
    "symbol-description": "error",
    "template-curly-spacing": "error",
    "template-tag-spacing": "error",
    "unicode-bom": ["error", "never"],
    "valid-jsdoc": "error",
    "vars-on-top": "error",
    "wrap-iife": "error",
    "wrap-regex": "error",
    "yield-star-spacing": ["error", "before"],
    yoda: "error",
  },
};
