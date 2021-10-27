var mysql = require("mysql");
const NyhetssakDao = require("../dao/Nyhetssakdao.js");
const runsqlfile = require("./runSQLFile.js");

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

let nyhetssakDao = new NyhetssakDao(pool);

beforeAll(done => {
  runsqlfile("tests/create_tables.sql", pool, () => {
    runsqlfile("tests/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Hent alle sakene fra db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(6);
    expect(data[0].overskrift).toBe("Testsak 6");  //Skal være descending
    done();
  }
  nyhetssakDao.getAll(callback);
});

test("Hent saker med gitt kategori fra db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(1);
    expect(data[0].overskrift).toBe("Testsak 1"); 
    done();
  }
  nyhetssakDao.getArticlesWithCategory("Teknologi", callback);
});

test("Hent saker med gitt id fra db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(1);
    expect(data[0].overskrift).toBe("Testsak 2");
    done();
  }
  nyhetssakDao.getArticleWithId(2, callback);
});

test("Hent saker med gitt prioritet fra db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(4);
    expect(data[1].overskrift).toBe("Testsak 5");
    done();
  }
  nyhetssakDao.getArticlesWithPriority(1, callback);
});

test("legg til sak i db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  nyhetssakDao.postArticle(
    {
      overskrift: "Ny artikkel",
      forfatter: "Martin",
      innhold: "Testsak",
      bilde: "https://www.fotball.no/imagevault/publishedmedia/qpk4fdvext4vfnqpmonb/td5da076.jpg",
      bildetekst: "Hei",
      kategori: "Sport",
      viktighet: 2
    },
    callback
  );
});

test("Slett sak i db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  nyhetssakDao.deleteArticle(
    {id: 1},
    callback
  );
});

test("endre sak i db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  nyhetssakDao.editArticle(
    {
      id: 6,
      overskrift: "Testsak 6 endret",
      innhold: "Hei",
      forfatter: "Martin",
      bilde: "https://test6endret.no",
      bildetekst: "Hei",
      kategori: "Sport",
      viktighet: 1
    },
    callback
  );
});
