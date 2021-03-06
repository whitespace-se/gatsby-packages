# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.0](https://github.com/whitespace-se/gatsby-packages/compare/v1.1.0-next.3...v1.1.0) (2022-05-09)


### Features

* Add SEO metadata ([81aa081](https://github.com/whitespace-se/gatsby-packages/commit/81aa081def66ff67b5bd2f7c2e5a93f6c5227bae))


### Bug Fixes

* **deps:** Use correct postcss version ([1929eef](https://github.com/whitespace-se/gatsby-packages/commit/1929eefc734fbf399cef5a3234486c33ed42d0b3))



## [1.1.0-next.3](https://github.com/whitespace-se/gatsby-packages/compare/v1.1.0-next.2...v1.1.0-next.3) (2022-04-07)


### Bug Fixes

* Use better name for plugin option ([a96abcd](https://github.com/whitespace-se/gatsby-packages/commit/a96abcd2dedcddee3f772e17fdd96d613f19704f))



## [1.1.0-next.2](https://github.com/whitespace-se/gatsby-packages/compare/v1.1.0-next.1...v1.1.0-next.2) (2022-04-07)


### Features

* Add title to site index pages ([9cb085c](https://github.com/whitespace-se/gatsby-packages/commit/9cb085cff432414b1e0c652abc0862ad8ce7eae9))


### Bug Fixes

* Incorrect margins on site index pages ([453d1a0](https://github.com/whitespace-se/gatsby-packages/commit/453d1a02ba9ddb020a4079b0909e797ab5d88e1c))



## [1.1.0-next.1](https://github.com/whitespace-se/gatsby-packages/compare/v1.1.0-next.0...v1.1.0-next.1) (2022-04-07)


### Bug Fixes

* Build error when there are no valid pages ([519dde0](https://github.com/whitespace-se/gatsby-packages/commit/519dde0c58c217dc1be4d6046eafdf8f458e287a))



## [1.1.0-next.0](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.2...v1.1.0-next.0) (2022-04-07)


### Features

* Add site index ([c0e54b4](https://github.com/whitespace-se/gatsby-packages/commit/c0e54b4962893f77b26bddc03d20e48814475dc0))
* Create `gatsby-plugin-site-index` package ([a85a16f](https://github.com/whitespace-se/gatsby-packages/commit/a85a16fa43496bfe3ae5e3bdf8ac2eec11582249))



### [1.0.2](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.2-rc.2...v1.0.2) (2022-03-31)


### Bug Fixes

* Deprecated import of Link component ([fb5c8bb](https://github.com/whitespace-se/gatsby-packages/commit/fb5c8bb054df23eebba22555dea91f43e6efa1fe))



### [1.0.2-rc.2](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.2-rc.1...v1.0.2-rc.2) (2022-03-18)


### Bug Fixes

* Disable disableLinkTracking ([1904e18](https://github.com/whitespace-se/gatsby-packages/commit/1904e189ad16905abe3abfe0f9b941e8a7cdad0b))
* Remove disableContentImpressionTracking ([7209d38](https://github.com/whitespace-se/gatsby-packages/commit/7209d38edf8b3f8797f32d727056132654d5fbfa))
* SSR error on cookie consent dialog ([68488fc](https://github.com/whitespace-se/gatsby-packages/commit/68488fc201c605de85a568e707cf46e4e6a6845a))


### Reverts

* Revert "Remove disableContentImpressionTracking" ([8dccc8e](https://github.com/whitespace-se/gatsby-packages/commit/8dccc8e1882c4f2ee4084c7097829964b52b1815))
* Revert "Disable disableLinkTracking" ([86811c4](https://github.com/whitespace-se/gatsby-packages/commit/86811c412ca2f5cb7451f8ce41fa0afa96ea7b24))
* Revert "Remove: mtmDDV, mtmDVN, mtmPAQDDV, mtmPAQDVN" ([d268abc](https://github.com/whitespace-se/gatsby-packages/commit/d268abcbecb6b231db5de9042e994c7dacb4631b))



### [1.0.2-rc.1](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.2-rc.0...v1.0.2-rc.1) (2022-03-10)


### Bug Fixes

* SSR error ([fea82a9](https://github.com/whitespace-se/gatsby-packages/commit/fea82a91e769718512ab3e11487cd5aba6f2eb60))



### [1.0.2-rc.0](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.1...v1.0.2-rc.0) (2022-03-09)


### Bug Fixes

* Track pageviews correctly and add option to require cookie consent ([e46164f](https://github.com/whitespace-se/gatsby-packages/commit/e46164faa26eeeece272a48bb1cda126c323a55f))



### [1.0.1](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.0...v1.0.1) (2022-03-01)


### Bug Fixes

* **gatsby-plugin-i18next:** Blank pages in SSR [#27](https://github.com/whitespace-se/gatsby-packages/issues/27) ([88cbdff](https://github.com/whitespace-se/gatsby-packages/commit/88cbdff1b52f9d6fbd58cea568f063165f4f801c))
* **gatsby-theme-wordpress-basic:** Error in `useMenu` ([8f45171](https://github.com/whitespace-se/gatsby-packages/commit/8f451716c26845f0c99d66c67febc6e89326ddab))



## [1.0.0](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.0-rc.1...v1.0.0) (2022-01-25)

**Note:** Version bump only for package root





## [1.0.0-rc.1](https://github.com/whitespace-se/gatsby-packages/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2022-01-24)

**Note:** Version bump only for package root





## 1.0.0-rc.0 (2022-01-24)


### ??? BREAKING CHANGES

* Add ability to override cards and teasers per content type
* improve site search
* **deps:** update all deps
* fetch search documents in batches
* gatsby-theme-wordpress-basic no longer uses the WORDPRESS_PAGES_PER_FETCH env var directly. Instead add 'wp.nodesPerFetch' to your plugin config.
* If you have shadowed gatsby-theme-wordpress-basic/src/hooks/pages.js you will have to examine the  or stuff might break.
* Inferred enum for content types is now based on the `name` field instead of `graphqlSingleName` to match the enum set by the wp-graphql WP plugin. This should make queries with custom post types work better in most situations, but if you already rely on a faulty enum you must update your queries or override the inferred enum through the plugin config.
* fix all lint errors
* implement archive pages
* image caption font size typo
* **deps:** update all packages
* Make useIsFullWidthPage context aware
* **gatsby-theme-wordpress-basic:** add site footer
* add site header

### Features

* add "skip to main content" link ([f16863d](https://github.com/whitespace-se/gatsby-packages/commit/f16863de7c9c8ad5340c802a355a0078ce6583cf))
* add `--page-grid-row-gap` value ([3d81428](https://github.com/whitespace-se/gatsby-packages/commit/3d814280dba97955ba9e1a3fba7198ee9064f64e))
* add `--site-layout-main-padding-top` ([8a3e71f](https://github.com/whitespace-se/gatsby-packages/commit/8a3e71f9661b1f3d0380cc570ce5c1235c868728))
* add `HTML` component ([c14e7ea](https://github.com/whitespace-se/gatsby-packages/commit/c14e7ea42a93d464fc9a71d04a45430950e638e1))
* add `PageContent` component ([e4eb2a0](https://github.com/whitespace-se/gatsby-packages/commit/e4eb2a0c802da94219e11cd53887e3f8d14adb56))
* add `paramTypes` prop to `StateSearchParamsProvider` component ([5b18006](https://github.com/whitespace-se/gatsby-packages/commit/5b180062586a439052757071d84255ea5291d6c6))
* add `transformParams` prop to MinisearchSearchBackendProvider ([8f98e23](https://github.com/whitespace-se/gatsby-packages/commit/8f98e235974f8429ea0a67dacce80bbbe4663fa9))
* add `useTaxonomies` hook ([81c3915](https://github.com/whitespace-se/gatsby-packages/commit/81c3915a2e98a86537b9b0b7c27f062f595ae1e2))
* add `wp.nodesPerFetch` plugin option ([daab65f](https://github.com/whitespace-se/gatsby-packages/commit/daab65f23a24af47ca77a8a937844b72f3d3b80f))
* Add ability to override cards and teasers per content type ([7ea8733](https://github.com/whitespace-se/gatsby-packages/commit/7ea873305ee2a7ee0a22d67823a6fe334a269e6b))
* add classname props to search form ([3192b43](https://github.com/whitespace-se/gatsby-packages/commit/3192b43250ac0198ef89e0510bacb1e3faffa971))
* add css vars for article preamble ([437c4b0](https://github.com/whitespace-se/gatsby-packages/commit/437c4b00b13d784ae694305239596681416695e9))
* add css vars for box nav links ([e682bea](https://github.com/whitespace-se/gatsby-packages/commit/e682bea717ef3b1657d43a362c05111ddc2c62f5))
* add export `truey` and `falsey` ([f7025dc](https://github.com/whitespace-se/gatsby-packages/commit/f7025dc95f3734bceba5bff522aeae8ac710e185))
* add gatsby plugin matomo ([cc38f38](https://github.com/whitespace-se/gatsby-packages/commit/cc38f38194bb2453073813e9e9ead3f6a897cbd7))
* add grid css props ([1db5658](https://github.com/whitespace-se/gatsby-packages/commit/1db56586fd3499d14858c75041a14b161f8b7323))
* add image max width from wp ([f2d57d5](https://github.com/whitespace-se/gatsby-packages/commit/f2d57d57224148d01ea48912e35596c3d9076ce3))
* add logo ([7c5e20d](https://github.com/whitespace-se/gatsby-packages/commit/7c5e20db92fa8fc1f51e878d13523fdf9eb90c65))
* add new css variables ([9a9eb81](https://github.com/whitespace-se/gatsby-packages/commit/9a9eb810e14a870baadcf87349e6bd485b917166))
* add publish date to search results ([e34ef53](https://github.com/whitespace-se/gatsby-packages/commit/e34ef53a187f7951d4481d48c65394a21144ead6))
* add site header ([e5c1804](https://github.com/whitespace-se/gatsby-packages/commit/e5c18048a3ab07dde842e0eedbb69345ae66d21c))
* add skeletton for header ([4375c70](https://github.com/whitespace-se/gatsby-packages/commit/4375c701edc1a029d7c8647c194a287656eebf13))
* add supplementing components, hooks and utils to search ([888cbba](https://github.com/whitespace-se/gatsby-packages/commit/888cbba2a9f87b604aefae38e4e6604308133032))
* allow fetch of all content types for minisearch ([ebaea68](https://github.com/whitespace-se/gatsby-packages/commit/ebaea68381bb04f20ee6735e3a5f8455885bc688))
* allow override of content type fields ([3ade832](https://github.com/whitespace-se/gatsby-packages/commit/3ade832f1d2efb8dfb3cf6c065b9a1d758543e3f))
* allow setting of `transformProps` via theme ([b7d55ee](https://github.com/whitespace-se/gatsby-packages/commit/b7d55eeb896ee6308b4fc1c2ee32dba7fb6b78f5))
* auto-generate search page ([b7d30d8](https://github.com/whitespace-se/gatsby-packages/commit/b7d30d80c2b7674b9db74ba9c7fd69741e535105))
* **gatsby-theme-wordpress-basic:** add site footer ([be05248](https://github.com/whitespace-se/gatsby-packages/commit/be0524855375e5eca88d93ca962e105937600208))
* hide header main menu on small screens ([c20b57b](https://github.com/whitespace-se/gatsby-packages/commit/c20b57b9348fc45cb74c7d70de7366c4932c4fd9))
* implement archive pages ([e5240c7](https://github.com/whitespace-se/gatsby-packages/commit/e5240c73aa75db91cccba76ef8dee6c39f2c9b5b))
* improve default navigation ([19f26ea](https://github.com/whitespace-se/gatsby-packages/commit/19f26ea1f9e6250bd49fd4d741691a64e3ba2c83))
* improve site search ([d677d0e](https://github.com/whitespace-se/gatsby-packages/commit/d677d0efbd3d30b1bec9203b416492de16411e42))
* move gatsby-cookie-consent and make some tweaks ([e9f481a](https://github.com/whitespace-se/gatsby-packages/commit/e9f481a4ec9490f2de5911df09644f3d675b0a46))
* Remove explicit `/graphql` from config ([f2fae61](https://github.com/whitespace-se/gatsby-packages/commit/f2fae611e37297cba5152733b13167e8ee77c76e))
* scroll to top on pagination click ([0f32d60](https://github.com/whitespace-se/gatsby-packages/commit/0f32d60c764a2e7831304c4506adbe94a434485a))
* update contact card example in minisearch ([874b8a9](https://github.com/whitespace-se/gatsby-packages/commit/874b8a9f6884497e092c2fdce0092ebb9339781f))
* update search example to work with latest changes ([8695c05](https://github.com/whitespace-se/gatsby-packages/commit/8695c05d405306ad2b95a75e2fb3bfb4c2549cd5))
* update style and display of contact information ([3a68aec](https://github.com/whitespace-se/gatsby-packages/commit/3a68aec19dadab487ff74f01e1ea5e8cd1fb7ba5))


### Bug Fixes

* `nodesPerFetch` didn???t work ([b33dc12](https://github.com/whitespace-se/gatsby-packages/commit/b33dc1227ec0f9f4921acca38f651543b6fec846))
* `useMiniSearch` did not handle fitlering on multi value fields ([9c41afd](https://github.com/whitespace-se/gatsby-packages/commit/9c41afd8f1624042444850b49fde7ed2a43c7fcf))
* `wp.url` plugin option was ignored ([243a4cb](https://github.com/whitespace-se/gatsby-packages/commit/243a4cbb4403a43b6cfb2f0240335bdda58453fc))
* accept `uri` in search document source ([9730daf](https://github.com/whitespace-se/gatsby-packages/commit/9730daf81bc70811c589694181cc1f8e5d1733c4))
* adapt styling to new method of adding variables ([53fc38d](https://github.com/whitespace-se/gatsby-packages/commit/53fc38dabe80a9020b5b2889b89614fa964b8869))
* add layout class to archive page ([a28374a](https://github.com/whitespace-se/gatsby-packages/commit/a28374a0541613b20d466ab315ace5bc6a128371))
* add more precise variables ([ff1346f](https://github.com/whitespace-se/gatsby-packages/commit/ff1346fb21aad3bf14cc7958c97bb09fda7360ac))
* add new variable to view search hits total ([46f63d6](https://github.com/whitespace-se/gatsby-packages/commit/46f63d695fb9dd76e1d88402ea72671508c0b1b6))
* Add padding to full width page layout ([8297ea1](https://github.com/whitespace-se/gatsby-packages/commit/8297ea115e4364cb592518c900504ecd13cf04c3))
* add placeholder for tags filter ([a59ec85](https://github.com/whitespace-se/gatsby-packages/commit/a59ec85283ee6e919475de3b182e15aa3de0fbb7))
* add publishDate as default prop for search hits ([b69be9d](https://github.com/whitespace-se/gatsby-packages/commit/b69be9de35a49765579bde7c4aa1868995f5eed0))
* add support for titles without links ([ef5a65f](https://github.com/whitespace-se/gatsby-packages/commit/ef5a65f2778ae9c5f48ff43eb719572ca3737b56))
* add translatable month i18n strings ([b9179c4](https://github.com/whitespace-se/gatsby-packages/commit/b9179c49f8a88046bb730a58774e267a89b29ac9))
* allow translation of pagination button labels ([47b44e5](https://github.com/whitespace-se/gatsby-packages/commit/47b44e59776edc9c1289665fe31a4be65c07b0e1))
* avoid circular import ([998b737](https://github.com/whitespace-se/gatsby-packages/commit/998b73757840bf23c0524b26e25cd6aa967f0808))
* avoid error on empty whitelist ([99907d0](https://github.com/whitespace-se/gatsby-packages/commit/99907d06a8f2c2fb221f2b28deceb1ff379680e3))
* Avoid JSON stringify error ([103ef43](https://github.com/whitespace-se/gatsby-packages/commit/103ef43ab673728fed83e227925dbabd4619849f))
* better styling for multi filter ([a3c740f](https://github.com/whitespace-se/gatsby-packages/commit/a3c740f7a7f2820d2642facb77f793238eeda81a))
* **ci:** add prettier ignore for examples ([9f0c9ef](https://github.com/whitespace-se/gatsby-packages/commit/9f0c9ef9a3edfe2ac7e46c3cce646b3a70f184cf))
* **ci:** remove prepublish script ([d7a08f1](https://github.com/whitespace-se/gatsby-packages/commit/d7a08f1c8cee12a96f44ce3b777649ad8fb2bee2))
* **ci:** some scripts could not be run on windows ([ef68f01](https://github.com/whitespace-se/gatsby-packages/commit/ef68f01f5505b81127479f7b70c7a924777fb6c9))
* clear only "other" params ([de34c9f](https://github.com/whitespace-se/gatsby-packages/commit/de34c9f41e2dd66ee3cc3e3722983a5d2021d783))
* correct import path for useHasMounted ([7abe502](https://github.com/whitespace-se/gatsby-packages/commit/7abe502ebfad8feb2bcf626c6306484d2ca00207))
* correct proptype for taxonomy in article ([39b8330](https://github.com/whitespace-se/gatsby-packages/commit/39b8330816f2bcd3dd1c32083167b4eb71e43ed9))
* deps ([980863d](https://github.com/whitespace-se/gatsby-packages/commit/980863d0a7f455a506642b831b095a912a72688e))
* **deps:** add missing deps ([eb0dce3](https://github.com/whitespace-se/gatsby-packages/commit/eb0dce3054d1c10d1b2240a9175a148536d368d7))
* **deps:** allow override of Link props in CoverLink ([a5c0237](https://github.com/whitespace-se/gatsby-packages/commit/a5c0237847cd9453edbc3a14fde713c0f998ede4))
* **deps:** Clean up deps ([b66db82](https://github.com/whitespace-se/gatsby-packages/commit/b66db8299aec488b13c050e4a17c2ea8210c69cb))
* **deps:** two versions of react-i18next ([41a55ab](https://github.com/whitespace-se/gatsby-packages/commit/41a55abea127ce337a292be7e3b2e573f43c86d2))
* **deps:** use correct dep version in example to allow hoisting ([6d0b882](https://github.com/whitespace-se/gatsby-packages/commit/6d0b882b26a489aa783170fcda84adf7499bcb4d))
* **deps:** Use same Gatsby version range as other packes ([a615032](https://github.com/whitespace-se/gatsby-packages/commit/a6150329abde6c1297e867dc3c21d94751eac444))
* **deps:** versions mismatch ([0bfc6c7](https://github.com/whitespace-se/gatsby-packages/commit/0bfc6c7356133ed79d87d32b40b6330f84d90a53))
* **deps:** wrong versions ([5f96884](https://github.com/whitespace-se/gatsby-packages/commit/5f9688479d3c620e1a64d86393c1a814b6dc9c65))
* did not fetch all posts ([265364f](https://github.com/whitespace-se/gatsby-packages/commit/265364f01b1ba8b38db0d03ff03976155a05576c))
* disable facetCounts feature for minisearch until it???s fixed ([85df67f](https://github.com/whitespace-se/gatsby-packages/commit/85df67f59882a0599fc604d7db0a7027b7bf04f5))
* empty search wasn???t handled properly ([7f59431](https://github.com/whitespace-se/gatsby-packages/commit/7f59431d58fe6a02e79d89a71350f0a38f136de1))
* error after updates ([83c98f4](https://github.com/whitespace-se/gatsby-packages/commit/83c98f4ba50b4ba908fa74eea8c81edf50ff9b81))
* error after updates ([abbf776](https://github.com/whitespace-se/gatsby-packages/commit/abbf776766d494d40dc43141222d9c2f3aa3d7e5))
* error in missing param type ([d1ff074](https://github.com/whitespace-se/gatsby-packages/commit/d1ff07428ec6df9b17406c6cd1852df78a88e6af))
* Error in onRouteUpdate ([3addbcf](https://github.com/whitespace-se/gatsby-packages/commit/3addbcf21ebd2b0503ae1f8358208835a10cd7ed))
* error in search fields for missing param types ([f3d4e34](https://github.com/whitespace-se/gatsby-packages/commit/f3d4e34257c6c42d73853c95205d8e72989b6887))
* error on archive pages ([a957314](https://github.com/whitespace-se/gatsby-packages/commit/a957314d243c89ea36e7e3b861ae9f7628cb7c70))
* error on missing featured image on archive page ([1f86864](https://github.com/whitespace-se/gatsby-packages/commit/1f8686457009596290e312ace26ad81f705e8fac))
* error on missing string in HTML and PageContent components ([05255fa](https://github.com/whitespace-se/gatsby-packages/commit/05255facc24fe89383ebabf4c44a2ea4addfd656))
* error on page creation ([02acd68](https://github.com/whitespace-se/gatsby-packages/commit/02acd68cdd24528a4da6095971c69c51e3c0ddd0))
* filter out undefined facets ([c257836](https://github.com/whitespace-se/gatsby-packages/commit/c2578363c618fa4571d06ddb72fff0f3b44a6a6a))
* focus ring on images ([a1e11ec](https://github.com/whitespace-se/gatsby-packages/commit/a1e11ec93a43054be55598756b12d3afc615d435))
* graphql fetch error was ignored on page creation ([33020bf](https://github.com/whitespace-se/gatsby-packages/commit/33020bf566dc536e571cc617f8af1011a7f86bc3))
* hide publish date for event search hits by default ([02cbff0](https://github.com/whitespace-se/gatsby-packages/commit/02cbff0474e4f72c74c3ef7b58c69e6310229a42))
* ignore empty strings in multi-value filters ([3ff4c6a](https://github.com/whitespace-se/gatsby-packages/commit/3ff4c6a4e5634b6197361e49ecadf235f4119d80))
* image caption font size typo ([43fcf83](https://github.com/whitespace-se/gatsby-packages/commit/43fcf8380396abd454f26c13bd6120844f94287f))
* improve `StateSearchParamsProvider` ([60571b2](https://github.com/whitespace-se/gatsby-packages/commit/60571b2e78397969fde4ef91198348b9e94a53d1))
* incorrect imports ([fcce742](https://github.com/whitespace-se/gatsby-packages/commit/fcce742014215ba3102b0b223a467456933f5210))
* layout spacing ([b6a2596](https://github.com/whitespace-se/gatsby-packages/commit/b6a25961c73657a749304dd7b1bc5eb685ae6abf))
* let page context set the forced params of Archive page ([124862c](https://github.com/whitespace-se/gatsby-packages/commit/124862ca7d9716a031ccaed6a4ff113d7fcec655))
* lint error ([7182e68](https://github.com/whitespace-se/gatsby-packages/commit/7182e68a9f38f7255d447680fdc3d6d1f8277a08))
* lint errors ([3824650](https://github.com/whitespace-se/gatsby-packages/commit/382465076a5c0a5d1963cf2548e9221a49e9ba40))
* low contrast default styles for `SelectField` ([5118589](https://github.com/whitespace-se/gatsby-packages/commit/511858914e09d31f23f6d07e765fdf18af240da0))
* Mismatching version of ESLint with Gatsby ([45fe510](https://github.com/whitespace-se/gatsby-packages/commit/45fe510f69601f852eed4719959ef4f2e83f145e))
* only show "clear filters" btn if url params are not query, page or contentType ([819de9c](https://github.com/whitespace-se/gatsby-packages/commit/819de9ce77626d79a2678e94654f699d55835383))
* preview error ([5c72b2f](https://github.com/whitespace-se/gatsby-packages/commit/5c72b2f1d2b7ab0b80ac504399a1ca632711e0a0))
* prop type validation error in pagination ([737be1d](https://github.com/whitespace-se/gatsby-packages/commit/737be1d7aecd510e17d1dd1246d74c65007cf58d))
* proptypes for `URLSearchParamsProvider` ([32a6137](https://github.com/whitespace-se/gatsby-packages/commit/32a6137c83088726af1da658ac9eb96020ddf3cb))
* publish config ([3c8f4d4](https://github.com/whitespace-se/gatsby-packages/commit/3c8f4d4bb0f5c5a7289f1cd719f46b463c91c24a))
* remove added "fix" for titles without links ([0688e4e](https://github.com/whitespace-se/gatsby-packages/commit/0688e4ecd1d6bc12d15dd088fb7316a0d8fec794))
* remove debug code ([a9e80be](https://github.com/whitespace-se/gatsby-packages/commit/a9e80be5dab2f4de538fb179a3960bf5b5ea7ae2))
* Remove debug code ([a5c2dad](https://github.com/whitespace-se/gatsby-packages/commit/a5c2dadf7eb75db8c5dbf8f48d43115d7f187dba))
* remove predetermined spacing variables ([ec75720](https://github.com/whitespace-se/gatsby-packages/commit/ec75720cd3ef7c0a3f2ecc46a0158129794fc7b6))
* remove restProps ([783cd4d](https://github.com/whitespace-se/gatsby-packages/commit/783cd4d54e4c122ba387f1255480a51f216c04ef))
* remove unsused css module rules ([2b29e5c](https://github.com/whitespace-se/gatsby-packages/commit/2b29e5cee9795739e3adcc0a9b335ddbf41e84fe))
* remove unused code after merge ([3189016](https://github.com/whitespace-se/gatsby-packages/commit/3189016bee8f3a5b41ed97b30a0c901b4cb80161))
* Removed error message `withComponentDefaults requires namespace` ([94b2eef](https://github.com/whitespace-se/gatsby-packages/commit/94b2eefe46c7b7f9d2e16d60152f690f410f5e55))
* rename prop to meta ([e7afed5](https://github.com/whitespace-se/gatsby-packages/commit/e7afed5a7758215d038a1f56905e80502dca8886))
* replace border bottom on hits with border-top ([31be7ff](https://github.com/whitespace-se/gatsby-packages/commit/31be7ffd02f6e3ef6cdfa8c5fb7faa5d43db1e9a))
* reverse year filter so that it starts in desc order ([422d349](https://github.com/whitespace-se/gatsby-packages/commit/422d349df5ded337d7e59e2f83dbb37d980205f0))
* Runtime errors ([8c923e3](https://github.com/whitespace-se/gatsby-packages/commit/8c923e3c49e0ed42ed24d13962a6bd83ccc711e7))
* search sort options missing ([780b03b](https://github.com/whitespace-se/gatsby-packages/commit/780b03bfa1c00584ae22edfd2b129f4bdf2d6677))
* separate search hit contact and search hit ([2d43f11](https://github.com/whitespace-se/gatsby-packages/commit/2d43f11f1fe3494a66aded947e6d472f605d8cf9))
* set a default value to avoid breakage when path is empty (i.e. 404 pages) ([6093a6a](https://github.com/whitespace-se/gatsby-packages/commit/6093a6a1f47fbea84dcfe5bb858f5f607d73e34e))
* site search page content width ([4f0794f](https://github.com/whitespace-se/gatsby-packages/commit/4f0794f93929558aad8ae28d06e0c7fc6edb63af))
* sort posts by publishDate in desc order on archive pages ([d3a73a1](https://github.com/whitespace-se/gatsby-packages/commit/d3a73a14ed226a6326f09d58973f2a5fd11113f3))
* style multi filter and add default value for spacing variable ([108bfbd](https://github.com/whitespace-se/gatsby-packages/commit/108bfbd4b46b12158b34cae0b2b69255d5e123f0))
* total hits ([ccc536e](https://github.com/whitespace-se/gatsby-packages/commit/ccc536e798e75aebe6a3ab98fca570296f122271))
* translate months on site search page ([a59bb6d](https://github.com/whitespace-se/gatsby-packages/commit/a59bb6dca6e7e2a3818f9d814b7adbb1e8034a48))
* update search settings translatable strings ([87eb01e](https://github.com/whitespace-se/gatsby-packages/commit/87eb01eadfc3b2ab88b3da56ae4213b098512f26))
* use correct prop type ([10fa99d](https://github.com/whitespace-se/gatsby-packages/commit/10fa99d8063f6bec48795221392b5cc9efc735ff))
* use facetLabels category instead ([0b9bc64](https://github.com/whitespace-se/gatsby-packages/commit/0b9bc64a029406419f775709aa99b09e8aeaf3c8))
* use language-agnostic numbers for strings instead ([111ea4b](https://github.com/whitespace-se/gatsby-packages/commit/111ea4bbb838ab48041a07cc7099198e198c973c))
* use translated label for select field ([43fbfc6](https://github.com/whitespace-se/gatsby-packages/commit/43fbfc6eef6cec7eeaf600190d4dda17a54bce4d))
* wp blocks did not handle media embedded correctly ([f9d2e10](https://github.com/whitespace-se/gatsby-packages/commit/f9d2e10b9fff39b260218c65bf024ecbe6479e25))


### Code Refactoring

* fetch page tree in batches ([5011ce2](https://github.com/whitespace-se/gatsby-packages/commit/5011ce2e1ebae003090b9ee32b38d6bd3ef57ac9))
* fetch search documents in batches ([5f58a51](https://github.com/whitespace-se/gatsby-packages/commit/5f58a51839a8e85bc0e63b7a1e5bfc57a3df0646))
* Make useIsFullWidthPage context aware ([ccd0b82](https://github.com/whitespace-se/gatsby-packages/commit/ccd0b82899081b2efc17525c7433025de41899d6))


### Miscellaneous Chores

* **deps:** update all deps ([4cfbb84](https://github.com/whitespace-se/gatsby-packages/commit/4cfbb8485f8c4871ed42bba82dcf753c462b6049))
* **deps:** update all packages ([d0efc38](https://github.com/whitespace-se/gatsby-packages/commit/d0efc3882d169b0ad9d0342ae9f94ea51e39e019))
* fix all lint errors ([6516578](https://github.com/whitespace-se/gatsby-packages/commit/6516578c577cba9160802e28eb9e3383d7defb4b))
