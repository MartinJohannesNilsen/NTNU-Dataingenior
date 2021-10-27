var mysql = require("mysql");
const KommentarDao = require("../dao/Kommentardao.js");
const runsqlfile = require("./runSQLFile");

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

let kommentarDao = new KommentarDao(pool);

beforeAll(done => {
  runsqlfile("tests/create_tables.sql", pool, () => {
    runsqlfile("tests/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Hent kommentarer med en gitt nyhetssakId fra db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(1);
    expect(data[0].kommentar).toBe("Enig");
    done();
  }
  kommentarDao.getCommentsWithArticleid(1, callback);
});

test("legg til kommentar i db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  kommentarDao.postComment(
    {
      nyhetssakId: 1,
      datoOgTidspunkt: "15.11.19 - 19:45",
      kommentar: "Test test",
      forfatter: "Max",
    },
    callback
  );
});


