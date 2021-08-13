import SearchHitContact from "./SearchHitContact";

const Template = SearchHitContact;

export default {
  title: "SearchHitContact",
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
  title: "Sektionschef",
  email: "lina.marklund@riksarkivet.se",
  phone: "010-4768084",
  city: "Göteborg",
  image: {},
};
