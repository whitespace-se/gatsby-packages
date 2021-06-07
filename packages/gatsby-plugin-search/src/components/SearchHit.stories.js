import { SearchHit } from "./SearchHit";

const Template = SearchHit;

export default {
  title: "SearchHit",
};

function srcSet(ratio, url) {
  return [75, 150, 300, 450, 600, 800, 1220]
    .map((width) => {
      let height = Math.round(width / ratio);
      return `${url({ width, height })} ${width}w`;
    })
    .join(",\n");
}

export const Contact = Template.bind({});
Contact.args = {
  type: "Contact",
  name: "Lina Marklund",
  position: "Sektionschef",
  department: {
    name: "Avdelning/Enhet/Sektion",
    city: "Trelleborg",
  },
  email: "lina.marklund@riksarkivet.se",
  telephone: "010-4768084",
  address: "Arkivgatan 9",
  postal: "411 34",
  city: "Göteborg",
  image: {},
};

export const Content = Template.bind({});
Content.args = {
  type: "Page",
  title: "Information om öppen data",
  image: {
    base64:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QDgRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFwAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAA8AAAADoAQAAQAAAAoAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDEwMjYA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgACgAPAwEiAAIRAQMRAf/EABcAAAMBAAAAAAAAAAAAAAAAAAIDBAX/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/9oADAMBAAIQAxAAAAE04sxr/8QAGxAAAgEFAAAAAAAAAAAAAAAAAQMCAAUVMTL/2gAIAQEAAQUCQbfINx4pWp9f/8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAB/9oACAEDAQE/ATC//8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAB/9oACAECAQE/AcW//8QAGxAAAgEFAAAAAAAAAAAAAAAAAAEQESExcaL/2gAIAQEABj8CuqbRnkUf/8QAGhAAAgIDAAAAAAAAAAAAAAAAASEAMRARUf/aAAgBAQABPyHWle8OgWU2FfP/2gAMAwEAAgADAAAAEMf/xAAWEQEBAQAAAAAAAAAAAAAAAAABEQD/2gAIAQMBAT8QTub/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQIBAT8QTZt//8QAGxABAAMBAAMAAAAAAAAAAAAAAQARITFBUWH/2gAIAQEAAT8Q2BBVEv3FrJdNZGzNeuhCFRWHIsfGZP/Z",
    src: "https://picsum.photos/id/1026/1500/1000",
    srcSet: srcSet(
      1500 / 1000,
      ({ width, height }) => `https://picsum.photos/id/1026/${width}/${height}`,
    ),
    srcWebp: "",
    srcSetWebp: "",
    width: "1500",
    height: "1000",
    alt: "Min bild",
  },
  uri: "/nyhetsarkiv/2014/november/riksarkivets-sida-for-oppna-datamangder-har-fått-ett-ansiktslyft",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet velit in quam commodo sagittis at eget ex.",
  path: [
    {
      label: "Nyhetsarkiv",
      uri: "/nyhetsarkiv",
    },
    {
      label: "2014",
      uri: "/nyhetsarkiv/2014",
    },
    {
      label: "November",
      uri: "/nyhetsarkiv/2014/november",
    },
  ],
};
