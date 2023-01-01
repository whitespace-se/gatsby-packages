const getMatchingInitial = require("./src/utils/getMatchingInitial");

const SiteIndexTemplate = require.resolve("./src/components/SiteIndexTemplate");

const defaultLocalizations = {
  en: {
    basePath: "/content",
    alphabet: Array.from("abcdefghijklmnopqrstuvwxyz"),
    restInitial: {
      path: "/other-pages",
      title: "Other pages",
      label: "#",
    },
  },
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SitePageContext {
      isIncludedInSiteIndex: Boolean
      isSiteIndexPage: Boolean
      siteIndexInitial: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreatePage = ({ page, actions }, { ...pluginOptions }) => {
  let { deletePage, createPage } = actions;
  let {
    getPageTitle = (page) => page.context.title,
    localizations = defaultLocalizations,
    includePage = () => true,
  } = pluginOptions;
  let language = page.context.language;
  if (!language || !localizations[language]) {
    return;
  }
  let title = getPageTitle(page);
  if (!title || !includePage({ page, ...pluginOptions })) {
    return;
  }
  let { alphabet } = localizations[language];
  let initial = getMatchingInitial(language, alphabet, title);

  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      isIncludedInSiteIndex: true,
      siteIndexInitial: initial,
    },
  });
};

exports.createPages = async ({ actions }, pluginOptions) => {
  const { createPage, createRedirect } = actions;
  let {
    disablePageCreation = false,
    template = SiteIndexTemplate,
    localizations = defaultLocalizations,

    getSiteIndexPath = ({ initial, restInitial, basePath }) => {
      if (initial) {
        return `/${basePath.replace(/^\//, "")}/${initial}`;
      }
      return `/${basePath.replace(/^\//, "")}/${restInitial.path.replace(
        /^\//,
        "",
      )}`;
    },

    getSiteIndexTitle = ({ language, initial, restInitial }) => {
      if (initial) {
        return initial.toLocaleUpperCase(language);
      }
      return restInitial.title;
    },

    getSiteIndexLabel = ({ language, initial, restInitial }) => {
      if (initial) {
        return initial.toLocaleUpperCase(language);
      }
      return restInitial.label;
    },
  } = pluginOptions;

  if (disablePageCreation) {
    return;
  }

  Object.entries(localizations).forEach(([language, options]) => {
    let { basePath, alphabet } = options;

    let initials = [...alphabet, ""].map((initial) => ({
      initial,
      label: getSiteIndexLabel({ ...options, language, initial }),
      title: getSiteIndexTitle({ ...options, language, initial }),

      path: getSiteIndexPath({ ...options, language, initial }),
    }));

    initials.forEach(({ initial, title, path }) => {
      createPage({
        path,
        component: template,
        context: {
          initial,
          initials,
          language,
          title,
          isSiteIndexPage: true,
        },
      });
    });

    let firstInitial = initials[0];
    if (firstInitial != null) {
      createRedirect({
        fromPath: basePath,
        toPath: getSiteIndexPath({
          ...options,
          language,
          initial: firstInitial.initial,
        }),
        isPermanent: true,
      });
    }
  });
};
