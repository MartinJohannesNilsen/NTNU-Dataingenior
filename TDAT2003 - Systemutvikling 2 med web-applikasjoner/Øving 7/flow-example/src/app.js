// @flow

let v1 = [1, 2, 3];
let v2 = [4, 5, 6];

console.log('Oppgave 1');
console.log('2 + v1:', v1.map(e => 2 + e));
console.log('2 * v1:', v1.map(e => e * 2));
console.log('mean of v1:', v1.reduce((a,b) => (a+b)/a));

//skal nå få til å få skrevet ut noe ala
//console.log('v1 dot v2:', v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2]);
//Altså at en ganger første index i en med første i neste;

let d = e => e * v2[e-1];
console.log('v1 dot v2:',v1.map(d).reduce((sum,i) => (sum+i),0));

//Skal nå få skrevet ut v1s verdier + v2sverdier x 2
//console.log('sum of v1 + 2 * v2:', v1[0]+v1[1]+v1[2]+(2*(v2[0]+v2[1]+v2[2])));

let svar = (e) => {
    let a = v1.reduce((sum,i) => (sum+i),0);
    let b = 2 * v2.reduce((sum,i) => (sum+i),0);
    return a + b;
};

console.log('sum of v1 + 2 * v2:', svar());

//Skal til slutt skrive ut v1 som string

let funk = (e) => {
    let a = 0;
    let b = '';
    v1.map(e =>  {
        b += 'v1[' + a + '] = ' + v1[a] + ', ';
        a++;
    });
    return b;
};

console.log('v1 as string:', funk());
console.log('\n');

//Oppgave 2

class Complex {
    real: number;
    imag: number;

    constructor(real: number, img: number){
        this.real = real;
        this.imag = img;
    }
}

console.log('Oppgave 2');
let v = [new Complex(2,2), new Complex(1,1)];
console.log('v elements as strings:', v.map(e => e.real + ' + ' + e.imag + 'i'));
console.log('magnitude of v elements:', v.map(e => Math.sqrt(Math.pow(e.real, 2)+Math.pow(e.imag,2))));
let c = new Complex(v.reduce((sum, elements) => sum + elements.real, 0), v.reduce((sum, elements) => sum + elements.imag, 0));
console.log('sum of v:', c);
console.log('\n');

console.log('Oppgave 3');
let students = [{ name: 'Ola', grade: 'A' }, { name: 'Kari', grade: 'C'}, { name: 'Knut', grade: 'C'}];
console.log('student elements as strings:', students.map(stud => stud.name + ' got ' + stud.grade));
console.log('How many got C', students.filter(stud => stud.grade == 'C').length);
console.log('Percentage of C grades', students.filter(stud => stud.grade == 'C').length / students.length);
console.log('Did anyone get A?', students.some(stud => stud.grade == 'A'));
console.log('Did anyone get F?', students.some(stud => stud.grade == 'F'));



