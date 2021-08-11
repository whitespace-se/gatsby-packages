import { graphql, useStaticQuery } from "gatsby";

// TODO: Strip html tags in a better way
function htmlToText(html) {
  return html && html.replace(/(<([^>]+)>)/gi, "");
}

export default function useSearchDocuments() {
  const data = useStaticQuery(graphql`
    query SearchDocumentsForMinisearch {
      pages: allFile(filter: { sourceInstanceName: { eq: "page" } }) {
        nodes {
          ...PageFileForSearch
        }
      }
      contacts: allFile(filter: { sourceInstanceName: { eq: "contact" } }) {
        nodes {
          ...ContactFileForSearch
        }
      }
    }
  `);

  return [
    data.pages.nodes.map((source) => {
      return {
        id: source.id,
        label: source.childMarkdownRemark.frontmatter.title,
        text: htmlToText(source.childMarkdownRemark.html),
        date: source.modifiedTime,
        contentType: "page",
      };
    }),
    data.contacts.nodes.map((source) => {
      return {
        id: source.id,
        label: source.childContactsYaml.name,
        text: [
          source.childContactsYaml.name,
          source.childContactsYaml.title,
          source.childContactsYaml.city,
          source.childContactsYaml.phone,
          source.childContactsYaml.email
        ],
        contentType: "contact",
        name: source.childContactsYaml.name,
        title: source.childContactsYaml.title,
        city: source.childContactsYaml.city,
        phone: source.childContactsYaml.phone,
        email: source.childContactsYaml.mail,
        image: source.childContactsYaml.thumbnail && {
          src: source.childContactsYaml.thumbnail,
          alt: source.childContactsYaml.name,
        },
      };
    }),
  ];
}
