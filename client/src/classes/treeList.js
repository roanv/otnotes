export default class TreeList {
  #list = [];
  #tree = [];
  constructor({ clone, fromList, expand }) {
    if (clone) {
      this.#list = clone.list;
      this.#tree = clone.tree;
    } else if (fromList) {
      this.#list = fromList;
      this.#createTree();
    }
    if (expand) this.#setExpanded(expand);
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
  #setExpanded(expandList) {
    expandList = expandList.map((item) => {
      return parseInt(item);
    });
    this.#list.map((item) => {
      if (expandList.find((id) => id === item.id)) item.expanded = true;
      else item.expanded = false;
    });
  }
  getExpandedNodes() {
    const expanded = this.#list.filter((item) => item.expanded);
    return expanded.map((item) => {
      return item.id.toString();
    });
  }
}
