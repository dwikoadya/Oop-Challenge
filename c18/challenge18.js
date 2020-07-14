const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'masukan salah satu no. dari opsi diatas:  '
})


function login() {
  console.log(`====================================================`);
  console.log(`Welcome to Institut Teknologi Nasional`);
  console.log(`Jl. PH.H. Mustofa no. 23 Bandung`);
  console.log(`====================================================`);
  rl.question('Username : ', (user) => {
    console.log(`====================================================`);
    rl.question('Password : ', (pass) => {
      console.log(`====================================================`);
      murid.db.serialize(() => {
        let sql = `SELECT * FROM login WHERE username = ? AND pass = ?`;
        murid.db.get(sql, [user, pass], (err, row) => {
          if (err) throw err;
          if (row) {
            console.log(`Welcome ${row.username}. Your acces level is : ${row.acclevel}`);
            run();
          }
          else {
            console.log(`username atau password belum terdaftar!`);
            login();
          }
        })
      });
    });
  });
};
login();

class Home {
  constructor() {
    this.opt = ['Mahasiswa', 'Jurusan', 'Dosen', 'Matakuliah', 'Kontrak', 'Keluar'];
    this.subOpt = ['Mahasiswa', 'Jurusan', 'Dosen', 'Matakuliah', 'Kontrak'];
    this.list = ['daftar', 'cari', 'tambah', 'hapus'];
  }

  opsi() {
    console.log(`====================================================`);
    console.log(`silahkan pilih opsi dibawah ini`);
    for (let i = 0; i < this.opt.length; i++) {
      console.log(`[${i + 1}] ${this.opt[i]}`);
    }
    console.log(`====================================================`);
  }

  subOpsi(index) {
    console.log(`====================================================`);
    console.log(`silahkan pilih opsi dibawah ini`);
    for (let i = 0; i < 4; i++) {
      console.log(`[${i + 1}] ${this.list[i]} ${this.subOpt[index]}`);
    }
    console.log('[5] Kembali')
    console.log(`====================================================`);
  }
}


class Mahasiswa {
  constructor() {
    this.db = new sqlite3.Database('./university.db', sqlite3.OPEN_READWRITE);
  }
  list() {
    this.db.serialize(() => {
      let sql = "SELECT * FROM mahasiswa";
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          let table = new Table({
            head: ['Nim', 'Nama', 'Umur', 'Alamat', 'Jurusan ID'],
            colWidths: [10, 30, 10, 20, 15]
          });
          rows.forEach((row) => {
            table.push([row.nim, row.nama, row.umur, row.alamat, row.jurusan_id]);
          });
          console.log(table.toString());
          beranda.subOpsi(0);
          rl.prompt();
        }
      });
    });
  }
  search() {
    console.log(`====================================================`)
    rl.question(`Masukan NIM: `, (nim) => {
      let sql = `SELECT * FROM mahasiswa WHERE nim = ?`;
      this.db.get(sql, [nim], (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`====================================================`)
          console.log(`student details`)
          console.log(`====================================================`)
          console.log(`Nim            : ${nim}`);
          console.log(`Nama           : ${row.nama}`);
          console.log(`Umur           : ${row.umur}`);
          console.log(`Alamat         : ${row.alamat}`);
          console.log(`Kode Jurusan   : ${row.jurusan_id}`);
        } else {
          console.log(`mahasiswa dengan nim ${nim} tidak terdaftar`);
        }
        beranda.subOpsi(0);
        rl.prompt();
      });
    });
  }

  add() {
    console.log(`====================================================`)
    console.log("Lengkapi data di bawah ini: ");
    rl.question("NIM:", (nim) => {
      rl.question("Nama:", (nama) => {
        rl.question("Umur:", (umur) => {
          rl.question("Alamat:", (alamat) => {
            rl.question("Jurusan ID:", (jurusan_id) => {
              this.db.serialize(() => {
                let sql = `INSERT INTO mahasiswa (nim, nama, umur, alamat, jurusan_id) VALUES ("${nim}", "${nama}", "${umur}", "${alamat}", "${jurusan_id}")`;
                this.db.run(sql, (err) => {
                  if (err) throw err;
                  console.log(`====================================================`)
                  murid.list();
                });
              });
            })
          })
        })
      })
    })
    return this;
  }

  delete() {
    console.log(`====================================================`)
    rl.question((`masukan NIM mahasiswa yang akan dihapus: `), (nim) => {
      this.db.run(`DELETE FROM mahasiswa WHERE nim = '${nim}'`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Mahasiswa dengan NIM ${nim} telah dihapus`);
        console.log(`====================================================`)
        murid.list();
      })
    })
  }
}

class Jurusan {
  constructor() {
    this.db = new sqlite3.Database('./university.db', sqlite3.OPEN_READWRITE);
  }
  list() {
    this.db.serialize(() => {
      let sql = "SELECT * FROM jurusan";
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          let table = new Table({
            head: ['Jurusan ID', 'Nama Jurusan'],
            colWidths: [15, 20]
          });
          rows.forEach((row) => {
            table.push([row.jurusan_id, row.nama_jurusan]);
          });
          console.log(table.toString());
          beranda.subOpsi(1);
          rl.prompt();
        }
      });
    });
  }
  search() {
    console.log(`====================================================`);
    rl.question(`Masukan ID jurusan yang anda cari\nID : `, (jurusan_id) => {
      let sql = `SELECT * FROM jurusan WHERE jurusan_id = ?`;
      this.db.get(sql, [jurusan_id], (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`====================================================`);
          console.log(`ID Jurusan     : ${row.jurusan_id}`);
          console.log(`Nama Jurusan   : ${row.nama_jurusan}`);
        } else {
          console.log(`ID jurusan "${jurusan_id}" tidak terdaftar`);
        }
        beranda.subOpsi(1);
        rl.prompt();
      });
    });
  }

  add() {
    console.log(`====================================================`);
    console.log("Lengkapi data di bawah ini: ");
    rl.question("ID Jurusan : ", (id_jurusan) => {
      rl.question("Nama Jurusan : ", (nama_jurusan) => {
        this.db.serialize(() => {
          let sql = `INSERT INTO jurusan (jurusan_id, nama_jurusan) VALUES ("${id_jurusan}", "${nama_jurusan}")`;
          this.db.run(sql, (err) => {
            if (err) throw err;
            console.log(`====================================================`);
            jur.list();
          });
        });
      });
    });
  }

  delete() {
    console.log(`====================================================`);
    rl.question((`masukan kode jurusan yang akan dihapus: `), (id_jurusan) => {
      this.db.run(`DELETE FROM jurusan WHERE jurusan_id = '${id_jurusan}'`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Jurusan dengan kode ${id_jurusan} telah dihapus`);
        console.log(`====================================================`);
        jur.list();
      })
    })
  }
}

class Dosen {
  constructor() {
    this.db = new sqlite3.Database('./university.db', sqlite3.OPEN_READWRITE);
  }
  list() {
    this.db.serialize(() => {
      let sql = "SELECT * FROM dosen";
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          let table = new Table({
            head: ['NIP', 'Nama Dosen'],
            colWidths: [10, 20]
          });
          rows.forEach((row) => {
            table.push([row.dosen_id, row.nama]);
          });
          console.log(table.toString());
          beranda.subOpsi(2);
          rl.prompt();
        }
      });
    });
  }
  search() {
    rl.question(`Masukan ID Dosen yang anda cari\nID : `, (dosen_id) => {
      let sql = `SELECT * FROM dosen WHERE dosen_id = ?`;
      this.db.get(sql, [dosen_id], (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`====================================================`);
          console.log(`ID             : ${row.dosen_id}`);
          console.log(`Nama Dosen     : ${row.nama}`);
        } else {
          console.log(`Dosen dengan ID "${dosen_id}" tidak terdaftar`);
        }
        beranda.subOpsi(2);
        rl.prompt();
      });
    });
  }

  add() {
    console.log("Lengkapi data Dosen di bawah ini: ");
    rl.question("ID : ", (dosen_id) => {
      rl.question("Nama Dosen : ", (nama) => {
        this.db.serialize(() => {
          let sql = `INSERT INTO dosen (dosen_id, nama) VALUES ("${dosen_id}", "${nama}")`;
          this.db.run(sql, (err) => {
            if (err) throw err;
            console.log(`====================================================`);
            dos.list();
          });
        });
      });
    });
  }

  delete() {
    rl.question((`masukan ID dosen yang akan dihapus: `), (dosen_id) => {
      this.db.run(`DELETE FROM dosen WHERE dosen_id = '${dosen_id}'`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Dosen dengan ID ${dosen_id} telah dihapus`);
        console.log(`====================================================`);
        dos.list();
      })
    })
  }
}

class Matakuliah {
  constructor() {
    this.db = new sqlite3.Database('./university.db', sqlite3.OPEN_READWRITE);
  }
  list() {
    this.db.serialize(() => {
      let sql = "SELECT * FROM mata_kuliah";
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          let table = new Table({
            head: ['Kode', 'Nama Matakuliah', 'SKS'],
            colWidths: [10, 50, 5]
          });
          rows.forEach((row) => {
            table.push([row.matkul_id, row.nama, row.sks]);
          });
          console.log(table.toString());
          beranda.subOpsi(3);
          rl.prompt();
        }
      });
    });
  }
  search() {
    rl.question(`Masukan ID Matakuliah yang anda cari\nID : `, (matkul_id) => {
      let sql = `SELECT * FROM mata_kuliah WHERE matkul_id = ?`;
      this.db.get(sql, [matkul_id], (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`====================================================`);
          console.log(`ID Matakuliah       : ${row.matkul_id}`);
          console.log(`Nama Matakuliah     : ${row.nama}`);
          console.log(`SKS                 : ${row.sks}`);
        } else {
          console.log(`Matakuliah dengan ID "${matkul_id}" tidak terdaftar`);
        }
        beranda.subOpsi(3);
        rl.prompt();
      });
    });
  }

  add() {
    console.log("Lengkapi data Matakuliah di bawah ini: ");
    rl.question("ID : ", (matkul_id) => {
      rl.question("Nama Matakuliah  : ", (nama) => {
        rl.question("SKS  : ", (sks) => {
          this.db.serialize(() => {
            let sql = `INSERT INTO mata_kuliah (matkul_id, nama, sks) VALUES ("${matkul_id}", "${nama}", "${sks}")`;
            this.db.run(sql, (err) => {
              if (err) throw err;
              console.log(`====================================================`);
              mk.list();
            });
          });
        });
      });
    });
  }

  delete() {
    rl.question((`masukan ID matakuliah yang akan dihapus: `), (matkul_id) => {
      this.db.run(`DELETE FROM mata_kuliah WHERE matkul_id = '${matkul_id}'`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Matakuliah dengan ID ${matkul_id} telah dihapus`);
        console.log(`====================================================`);
        mk.list();
      })
    })
  }
}

class KRS {
  constructor() {
    this.db = new sqlite3.Database('./university.db', sqlite3.OPEN_READWRITE);
  }
  list() {
    this.db.serialize(() => {
      let sql = "SELECT * FROM krs";
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          let table = new Table({
            head: ['KRS ID', 'NIM', 'ID Dosen', 'ID Mata Kuliah', 'Nilai'],
            colWidths: [10, 10, 10, 20, 10]
          });
          rows.forEach((row) => {
            table.push([row.krs_id, row.nim, row.dosen_id, row.matkul_id, row.nilai]);
          });
          console.log(table.toString());
          beranda.subOpsi(4);
          rl.prompt();
        }
      });
    });
  }

  search() {
    rl.question(`Masukan id KRS yang ingin anda cari\nID : `, (krs_id) => {
      let sql = `SELECT * FROM krs WHERE krs_id = ?`;
      this.db.get(sql, [krs_id], (err, row) => {
        if (err) throw err;
        if (row) {
          console.log(`KRS ID            : ${row.krs_id}`);
          console.log(`NIM Mahasiswa     : ${row.nim}`);
          console.log(`ID Dosen          : ${row.dosen_id}`);
          console.log(`ID Matakuliah     : ${row.matkul_id}`);
          console.log(`Nilai             : ${row.nilai}`);
        } else {
          console.log(`KRS dengan id "${krs_id}" tidak terdaftar`);
        }
        beranda.subOpsi(4);
        rl.prompt();
      });
    });
  }

  add() {
    console.log("Lengkapi data KRS di bawah ini: ");
    rl.question("KRS ID: ", (krs_id) => {
      rl.question("Nilai: ", (nilai) => {
        rl.question("Nim Mahasiswa: ", (nim) => {
          rl.question("ID Matakuliah: ", (matkul_id) => {
            rl.question("ID Dosen: ", (dosen_id) => {
              this.db.serialize(() => {
                let sql = `INSERT INTO krs (krs_id, nilai, nim, matkul_id, dosen_id) VALUES ("${krs_id}", "${nilai}", "${nim}", "${matkul_id}", "${dosen_id}")`;
                this.db.run(sql, (err) => {
                  if (err) throw err;
                  kr.list();
                });
              });
            });
          });
        });
      });
    });
  }

  delete() {
    rl.question((`masukan id KRS yang akan dihapus: `), (krs_id) => {
        this.db.run(`DELETE FROM krs WHERE krs_id = '${krs_id}'`, (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log(`KRS dengan id "${krs_id}" telah dihapus`);
          console.log(`====================================================`);
          kr.list();
        })
      });
  }
}

let murid = new Mahasiswa();
let beranda = new Home();
let jur = new Jurusan();
let dos = new Dosen();
let mk = new Matakuliah();
let kr = new KRS();

function run() {
  beranda.opsi();
  rl.question('masukkan salah satu no. dari opsi diatas : ', (num) => {
    switch (num) {
      case '1': 
      beranda.subOpsi(0);
        rl.prompt();
        rl.on('line', (num) => {
          switch (num) {
            case '1':
              murid.list();
              break;
            case '2':
              murid.search();
              break;
            case '3':
              murid.add();
              break;
            case '4':
              murid.delete();
              break;
            case '5':
              run();
              break;
            default:
              console.log(`pilihan yang anda masukan salah`);
              beranda.subOpsi(0);
              rl.prompt()
              break;
          }
        });
        break;
      case '2':
        beranda.subOpsi(1);
        rl.prompt();
        rl.on('line', (num) => {
          switch (num) {
            case '1':
              jur.list();
              break;
            case '2':
              jur.search();
              break;
            case '3':
              jur.add();
              break;
            case '4':
              jur.delete();
              break;
            case '5':
              run();
              break;
            default:
              console.log(`pilihan yang anda masukan salah`);
              rl.prompt()
              break;
          }
        });
        break;

      case '3': 
      beranda.subOpsi(2);
        rl.prompt();
        rl.on('line', (num) => {
          switch (num) {
            case '1':
              dos.list();
              break;
            case '2':
              dos.search();
              break;
            case '3':
              dos.add();
              break;
            case '4':
              dos.delete();
              break;
            case '5':
              run();
              break;
            default:
              console.log(`pilihan yang anda masukan salah`);
              rl.prompt()
              break;
          }
        });
        break;

      case '4':
        beranda.subOpsi(3);
        rl.prompt();
        rl.on('line', (num) => {
          switch (num) {
            case '1':
              mk.list();
              break;
            case '2':
              mk.search();
              break;
            case '3':
              mk.add();
              break;
            case '4':
              mk.delete();
              break;
            case '5':
              run();
              break;
            default:
              console.log(`pilihan yang anda masukan salah`);
              rl.prompt()
              break;
          }
        });
        break;

      case '5':
        beranda.subOpsi(4);
        rl.prompt();
        rl.on('line', (num) => {
          switch (num) {
            case '1':
              kr.list();
              break;
            case '2':
              kr.search();
              break;
            case '3':
              kr.add();
              break;
            case '4':
              kr.delete();
              break;
            case '5':
              run();
              break;
            default:
              console.log(`pilihan yang anda masukan salah`);
              rl.prompt()
              break;
          }
        });
        break;

      case '6':
        console.log(`Kamu Telah Keluar`)
        login();
        break;
      default:
        console.log(`Pilihan yang anda masukan salah.`)
        run();
        rl.prompt()
        break;
    }
  });
}