export default class Page {
  constructor(name, element) {
    this.name = name;
    this.element = element;
  }
  get path() {
    return `/${this.name.replace(/\s+/g, "-").toLowerCase()}`;
  }
  get key() {
    return `route-${this.name}`;
  }
}
