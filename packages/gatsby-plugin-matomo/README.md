# Gatsby Plugin for Matomo

Gatsby theme for Wordpress.

## Install

Npm `npm install gatsby-plugin-matomo`

Yarn `yarn add gatsby-plugin-matomo`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-plugin-matomo",
    options: {
      mtmContainerId: "YOUR_MATOMO_CONTAINER_ID",
      includeInDevelopment: false,
      mtmDefaultDataVariable: "YOUR_MATOMO_DEFAULT_FUNCTION",
      mtmPAQDefaultDataVariable: "YOUR_MATOMO_DEFAULT_FUNCTION",
      mtmDataVariableName: "YOUR_MTM_DATA_VARIABLE_NAME",
      mtmPAQDataVariableName: "YOUR_PAQ_DATA_VARIABLE_NAME",
      routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
      mtmHost: "YOUR_SELF_HOSTED_ORIGIN",
    },
  },
];
```

If you like to use data at runtime for your mtmDefaultDataVariable you can do
that by defining it as a function.

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-plugin-matomo",
    options: {
      // dataVariable to be set before MATOMO is loaded
      // should be a stringified object or object
      //
      // Defaults to null
      mtmDefaultDataVariable: function () {
        return {
          push: function () {},
        };
      },
    },
  },
];
```
