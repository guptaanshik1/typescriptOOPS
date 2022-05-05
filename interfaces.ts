interface Named {
    readonly name: string
}

interface Greetable extends Named {
    age?: number
    greet(phrase: string): void;
}   

class Person implements Greetable {
    name: string
    constructor(n: string) {
        this.name = n
    }

    greet(phrase: string) {
        console.log(phrase + this.name);
    }
}

class Person2 implements Greetable {
    name: string;

    constructor(name: string, public age: number) {
        this.name = name
        this.age = age
    }

    greet(phrase: string): void {
        console.log(phrase + this.name + ' ' + this.age)
    }
}

let user1: Greetable

user1 = {
    name: 'Max',
    // age: 30,

    greet(phrase: string) {
        console.log(phrase + this.name)
    }
}

const user2 = new Person('John')
const user3 = new Person2('John', 30)

user1.greet("Hi there I am: ")
user2.greet("Hi there I am user2: ")
user3.greet("Hi there I am user3: ")

// interface as a type
interface AddFn {
    (n1: number, n2: number): number;
}

let addNew: AddFn

addNew = (n1: number, n2: number) => {
    return n1 + n2
}

console.log(addNew(2, 2))
