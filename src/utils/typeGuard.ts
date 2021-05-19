// https://stackoverflow.com/questions/40081332/what-does-the-is-keyword-do-in-typescript

function isString(test: any): test is string {
  return typeof test === 'string';
}

function example(foo: any) {
  if (isString(foo)) {
    console.log(`it is a string${foo}`);
    console.log(foo.length);
  }
}

type Cat = {
  isMeow: boolean;
};

type Dog = {
  isBark: boolean;
};

type Animal = Cat | Dog;

// Type Guard
function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).isBark === true;
}

const getNoise = (animal: Animal) => {
  if (isDog(animal)) {
    console.log(animal.isBark);
    console.log('it is dog');
  } else {
    // console.log(animal.isBark); // 會報錯，不是 Dog 卻用了 dog 的方法
    console.log(animal.isMeow);
    console.log('it is cat');
  }
};

const dog: Dog = {
  isBark: true,
};

getNoise(dog);

example('hello world');
