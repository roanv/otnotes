export default class Page {
  constructor(name, element) {
    this.name = name;
    this.element = element;
  }
  get path() {
    return `/${this.name}`;
  }
  get key() {
    return `route-${this.name}`;
  }
}
