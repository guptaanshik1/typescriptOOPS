function Logging(logString: string) {
  return function (constructor: any) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  // return function (_: Function) {
  //     const hookEl = document.getElementById(hookId)
  //     if (hookEl) {
  //         hookEl.innerHTML = template
  //     }
  // }
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const person = new constructor()
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = person.name
    }
  };
}

// @Logging('Logging the person object....')
@WithTemplate("<h1>Person Object</h1>", "app")
class Persons {
  name = 'John';

  constructor() {
    console.log('Creating the Person object....')
  }
}

const p = new Persons();
console.log(p);

// property decorator
function Log (target: any, propertyName: string | Symbol) {
    console.log('Property Decorator target: ', target)
    console.log('Property Decorator propertyName: ', propertyName)
}

// accessor decorator
function Log2 (target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor Decorator target: ", target);
    console.log("Accessor Decorator name: ", name);
    console.log("Accessor Decorator descriptor: ", descriptor);
}

// method decorator
function Log3 (target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method Decorator target: ", target);
  console.log("Method Decorator name: ", name);
  console.log("Method Decorator descriptor: ", descriptor);
}

// parameter decorator
function Log4 (target: any, name: string | Symbol, position: number) {
    console.log("Parameter Decorator target: ", target);
    console.log("Parameter Decorator name: ", name);
    console.log("Parameter Decorator position: ", position);
}

class Product {
    @Log
    title: string;
    @Log
    private _price: number;

    @Log2
    set price (value: number) {
        this._price = value
    }

    constructor (title: string, price: number) {
        this.title = title
        this._price= price
    }

    @Log3
    getPriceWithTax (@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}

function WithTemplate2 (template: string, hookId: string) {
  return function <T extends { new (...args: any[]): {name: string} }> (originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super()
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

@WithTemplate2 ('<h2>Person 2 object</h2>', 'app')
class PersonNew {
  name = 'Max'

  constructor () {
    
  }
}

const pNew = new PersonNew()
console.log(pNew)

function Autobind1 (target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}

class Printer {
  message = 'This works'

  @Autobind1
  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', printer.showMessage)
