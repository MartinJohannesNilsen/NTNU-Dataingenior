
let v1 = [1, 2, 3];
let v2 = [4, 5, 6];

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
    a = 0;
    b = '';
    v1.map(e =>  {
        b += 'v1[' + a + '] = ' + v1[a] + ', ';
        a++;
    });
    return b;
};

console.log('v1 as string:', funk());