const names: string[] = [];
const names2: Array<string> = [];

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}

const mergedObj = merge({ name: "John" }, { age: 30 });

console.log(mergedObj.name);

console.log(mergedObj.age);

const mergedObj2 = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "John", hobbies: ["Sports"] },
  { age: 30 }
);

console.log(mergedObj2);

interface Lenghty {
  length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
  let description;
  if (element.length === 0) {
    description = "No length";
  } else if (element.length === 1) {
    description = `There is ${element.length} element`;
  } else {
    description = `There are ${element.length} elements`;
  }
  return [element, description];
}

console.log(countAndDescribe(""));
console.log(countAndDescribe(["John", "Max"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ name: "John" }, "name"));

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("John");
textStorage.addItem("Max");
console.log(textStorage.getItems());
textStorage.removeItem("John");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems());
numberStorage.removeItem(1);
console.log(numberStorage.getItems());
