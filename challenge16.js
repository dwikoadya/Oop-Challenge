class Car {
    constructor(merkban, ukuranban, kursi, pintu, kapasitas, tahun, garansi) {
        this.ban = new Tyre(merkban, ukuranban);
        this.kursi = kursi;
        this.pintu = pintu;
        this.kapasitas = kapasitas;
        this.garansi = garansi;
        this.tahun = tahun;
        this.nomesin = nomesin();
    }
}
function nomesin() {
    var z = Math.floor(Math.random() * 9999);
    var x = Math.floor(Math.random() * 999);
    var c = Math.floor(Math.random() * 99999);
    return `MH${x}${z}R${c}`

}
class Tyre {
    constructor(merk, ukuran) {
        this.ukuran = ukuran;
        this.merk = merk;
    }
}


class Jazz extends Car {
    constructor(tahun) {
        super('Bridgestone', '185/55 R15', 5, 5, '1497cc', tahun)
        this.garansi = 3
        this.type = 'Honda Jazz'
    }
}

class Alphard extends Car {
    constructor(tahun) {
        super('Achilles', '235/50 R18', 7, 5, '2494cc', tahun)
        this.garansi = 4
        this.type = 'Toyota Alphard'
    }
}

class Terios extends Car {
    constructor(tahun) {
        super('Dunlop', '215/65 R16', 7, 5, '1496cc', tahun)
        this.garansi = 5;
        this.type = 'Daihatsu Terios'
    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }

    static acak() {
        return Math.floor(Math.random() * 10)
    }

    produksi(tahun) {
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Jazz(tahun))
        }
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Alphard(tahun))
        }
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Terios(tahun))
        }
    }

    Warranty(year) {
        console.log(`Daftar mobil yang di produksi: `)
        this.cars.forEach(content => {
            console.log(`
        No.Mesin: ${content.nomesin}
        Nama Mobil: ${content.type}
        Jumlah Kursi: ${content.kursi}
        Jumlah Pintu: ${content.pintu}
        Merk/Ukuran Ban: ${content.ban.merk} ${content.ban.ukuran}
        Tahun Pembuatan: ${content.tahun}
        Kapasitas: ${content.kapasitas}
        Garansi: ${content.garansi} Tahun
        Masa Berlaku Garansi: ${(year - content.tahun) > content.garansi ? 'Tidak Berlaku' : 'Masih Berlaku'}
        `)
        })
    }
}

let mobil = new CarFactory();

mobil.produksi(2018);
mobil.produksi(2020);
mobil.Warranty(2023);
