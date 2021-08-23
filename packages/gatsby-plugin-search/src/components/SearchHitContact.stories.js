import SearchHitContact from "./SearchHitContact";

const Template = SearchHitContact;

export default {
  title: "SearchHitContact",
};

export const Contact = Template.bind({});
Contact.args = {
  type: "Contact",
  name: "John Doe",
  title: "Sektionschef",
  email: "John.doe@riksarkivet.se",
  phone: "010-8909213",
  city: "Göteborg",
  image: {},
};
