const firstName = 'Yannick';
console.log(firstName);

let age = 33;
age++;

console.log(age);

const test = 1 + true;
const test2 = 125 + '9';
console.log(test);
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a'));

function displayUser(firstName, age) {
    console.log(`Bonjour je m'appelle ${firstName} et j'ai ${age} ans`);

}

displayUser('Rosalie', 12);

const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];

for (let fruit of fruits) {
    console.log(fruit);
}

fruits.push("Pomme");
console.log("=========");
//fruits.forEach(fruit => console.log(fruit))
fruits.forEach(f => console.log(f));


const sum = (a, b) => a + b;
const result = sum(12, 8);
console.log(result);

const filtre = fruits.filter(f => f.length > 5)
console.log(filtre);

const numbers = [10, 20, 30, 40];
const MULTIPLIER = 3;

const products = numbers.map(n => n * MULTIPLIER).filter(n => n > 75).map(n => n + 9);
console.log(products);
console.log(numbers);
//c'est une fonction qui marche aussi que j'ai trouver
//numbers.forEach(n => console.log(n*MULTIPLIER));


const spiderman = {
    hero: "SpiderMan",
    alterEgo: "Peter Parker",
    movies: [{ title: "SpiderMan 1" }, { title: "SpiderMan 2" }, { title: "SpiderMan 3" }]
};

const ironman = {
    hero: "IronMan",
    alterEgo: "Tony Stark",
    movies: [{ title: "IronMan 1" }, { title: "IronMan 2" }, { title: "IronMan 3" }]
};
console.log(spiderman.movies);
Sconsole.log(ironman.movies);


class Avenger {
    constructor(hero, alterEgo, movies) {
        this.hero = hero;
        this.alterEgo = alterEgo;
        this.movies = movies;
    }

    test(){

    }
}
const oneAvenger = new Avenger("hulk", "Bruce Baner", [{ title: "hulk 1" }, { title: "hulk 2" }, { title: "hulk 3" }])
console.log(oneAvenger);