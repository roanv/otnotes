export default class TreeList {
  #list = [];
  #tree = [];
  constructor({ clone, list: fromList, expanded }) {
    if (clone) {
      this.#list = clone.list;
      this.#tree = clone.tree;
    } else if (fromList) {
      this.#list = fromList;
      this.#createTree();
    }
    if (expanded) this.#expand(expanded);
  }
  get tree() {
    return this.#tree;
  }
  get list() {
    return this.#list;
  }
  #createTree() {
    const tree = this.#list.map((item) => {
      if (!Array.isArray(item.path)) {
        item.path = item.path.split(".");
        item.path = item.path.map((path) => parseInt(path));
      }
      const parentID = item.path[item.path.length - 2];
      if (parentID) {
        const parent = this.#list.find((item) => item.id === parentID);
        if (!parent.children) parent.children = [];
        parent.children.push(item);
        return;
      }
      return item;
    });
    this.#tree = tree.filter((item) => item);
  }
  #expand(expanded) {
    expanded = expanded.map((item) => {
      return parseInt(item);
    });
    this.#list.map((item) => {
      if (expanded.find((id) => id === item.id)) item.expanded = true;
      else item.expand = false;
    });
  }
}
