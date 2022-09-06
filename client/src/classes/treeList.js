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
      this.#createKeys();
      this.#createTree();
    }
    if (expand) this.#expand(expand);
    if (drag) this.#drag(this.#keys[drag]);
    if (drop) this.#drop(drop);
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
    this.#convertPaths();
    // this.#sort();
    const tree = this.#list.map((item) => {
      const parent = this.getParent(item);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(item);
        return null;
      }
      return item;
    });
    this.#tree = tree.filter((item) => item);
  }

  #sort() {
    this.#list.sort((a, b) => {
      function compare(a, b, depth) {
        const orderA = a.sort_path[depth];
        const orderB = b.sort_path[depth];
        const nextA = a.sort_path[depth + 1];
        const nextB = b.sort_path[depth + 1];
        // order at current level
        if (orderA > orderB) return 1;
        if (orderA < orderB) return -1;
        // equal and have deeper level -> keep going
        if (nextA && nextB) return compare(a, b, depth + 1);
        // equal and one is parent
        if (!nextA && nextB) return -1;
        if (nextA && !nextB) return 1;
        // equal and neither have deeper level
        return 0;
      }
      return compare(a, b, 0);
    });
  }

  #createKeys() {
    this.#keys = this.#list.reduce(
      (acc, item) => ((acc[item.id] = item), acc),
      {}
    );
  }

  #convertPaths() {
    this.#list.map((item) => {
      item.path = this.#toArray(item.path);
      // item.sort_path = this.#toArray(item.sort_path);
    });
  }

  #toArray(path) {
    if (!Array.isArray(path)) {
      path = path.split(".");
      path = path.map((path) => parseInt(path));
    }
    return path;
  }

  #expand(expandList) {
    expandList = expandList.map((item) => {
      return parseInt(item);
    });
    this.#list.map((item) => {
      if (expandList.find((id) => id === item.id)) item.expanded = true;
      else item.expanded = false;
      return item;
    });
  }

  #drag(item) {
    item.isDragging = true;
    if (item.children) item.children.map((child) => this.#drag(child));
  }

  #drop(payload) {
    const { origin, target, direction } = payload;

    if (origin && target) {
      console.log(origin, target, direction);
      console.log(this.#list);
      console.log(this.getVisible());
    }
    this.#list.map((item) => (item.isDragging = false));
  }

  getParent(item) {
    const id = item.path[item.path.length - 2];
    return this.#keys[id];
  }

  getVisible() {
    return this.#list.filter((item) => {
      const parent = this.getParent(item);
      if (!parent) return item;
      else if (parent.expanded) return item;
      else return;
    });
  }

  getExpanded() {
    const expanded = this.#list.filter((item) => item.expanded);
    return expanded.map((item) => {
      return item.id.toString();
    });
  }
}
