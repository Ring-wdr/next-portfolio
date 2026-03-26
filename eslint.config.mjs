import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".agents/**",
      ".claude/**",
      ".next/**",
      ".omx/**",
      "node_modules/**",
      "test-results/**",
      "tests-log/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
