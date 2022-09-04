export default class TreeList {
  #list = [];
  #tree = [];
  #keys = {};
  constructor({ clone, fromList, expand, drag, drop }) {
    if (clone) {
      this.#list = clone.list;
      this.#tree = clone.tree;
      this.#keys = clone.keys;
    } else if (fromList) {
      this.#list = fromList;
      this.#createTree();
      this.#createKeys();
    }
    if (expand) this.#setExpanded(expand);
    if (drag) this.#setDragging(this.#keys[drag]);
    if (drop) this.#drop();
  }
  get tree() {
    return this.#tree;
  }
  get keys() {
    return this.#keys;
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
        return null;
      }
      return item;
    });
    this.#tree = tree.filter((item) => item);
  }
  #createKeys() {
    this.#keys = this.#list.reduce(
      (acc, item) => ((acc[item.id] = item), acc),
      {}
    );
  }
  #setExpanded(expandList) {
    expandList = expandList.map((item) => {
      return parseInt(item);
    });
    this.#list.map((item) => {
      if (expandList.find((id) => id === item.id)) item.expanded = true;
      else item.expanded = false;
      return item;
    });
  }
  #setDragging(item) {
    item.isDragging = true;
    if (item.children) item.children.map((child) => this.#setDragging(child));
  }
  #drop() {
    this.#list.map((item) => (item.isDragging = false));
  }
  getExpandedNodes() {
    const expanded = this.#list.filter((item) => item.expanded);
    return expanded.map((item) => {
      return item.id.toString();
    });
  }
}
