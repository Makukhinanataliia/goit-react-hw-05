module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a React component with CSS module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.jsx",
        templateFile: "plop-templates/component.jsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.module.css",
        templateFile: "plop-templates/styles.module.css.hbs",
      },
    ],
  });

  // Генератор для сторінок (pages)
  plop.setGenerator("page", {
    description: "Create a React page with CSS module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Page name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{pascalCase name}}.jsx",
        templateFile: "plop-templates/page.jsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{pascalCase name}}.module.css",
        templateFile: "plop-templates/styles.module.css.hbs",
      },
    ],
  });
};
