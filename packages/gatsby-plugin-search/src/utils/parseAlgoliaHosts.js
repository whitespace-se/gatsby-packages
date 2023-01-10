export default function parseAlgoliaHosts(input) {
  return (Array.isArray(input) ? input : (input || "").split(","))
    .map((specifier) => {
      specifier = new URL(specifier, location.origin).toString();
      try {
        let [, protocol, url] = specifier.match(/^(\w+):(.*)$/);
        return { protocol, url };
      } catch {
        return;
      }
    })
    .filter(Boolean);
}
