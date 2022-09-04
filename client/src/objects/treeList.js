export default class TreeList {
  #list = [];
  #tree = [];
  constructor(list) {
    this.list = list;
  }
  /**@param {Array} list*/
  set list(list) {
    this.#list = list;
    this.#tree = this.treeFromList(list);
  }
  get tree() {
    return this.#tree;
  }
  get list() {
    return this.#list;
  }
  treeFromList(list) {
    this.convertPaths(list);
    const tree = list.map((area) => {
      const parentID = area.path[area.path.length - 2];
      if (parentID) {
        const parent = list.find((item) => item.id === parentID);
        if (!parent.children) parent.children = [];
        parent.children.push(area);
        return;
      }
      return area;
    });
    return tree.filter((item) => item);
  }
  convertPaths(list) {
    return list.map((item) => {
      if (!Array.isArray(item.path)) {
        item.path = item.path.split(".");
        item.path = item.path.map((path) => parseInt(path));
        return item;
      }
    });
  }
}
