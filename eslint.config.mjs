import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    ignores: ["src/__test__/"],
    rules: {
      "arrow-body-style": "off",
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "linebreak-style": ["error","unix"],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/prop-types": "off",
    },
    settings: { react: { version: 'detect' } },
  }
];
