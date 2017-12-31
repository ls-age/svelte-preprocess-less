export default function filter(attributes, name) {
  const typeAttributes = [attributes.type, attributes.lang];

  return typeAttributes.includes(name) || typeAttributes.includes(`text/${name}`);
}
