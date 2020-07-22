class Car {
    constructor(merkban, ukuranban, pintu, kursi, warna, tahun, garansi) {
        this.tyre = new Tyre(merkban, ukuranban)
        this.door = pintu;
        this.seat = kursi;
        this.color = warna;
        this.year = tahun;
        this.warranty = garansi;
        this.nomesin = nomesin()
    }
}
nomesin = () => {
    return Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase();
}

class Tyre {
    constructor(merk, ukuran) {
        this.brand = merk;
        this.size = ukuran
    }
}

class Jazz extends Car {
    constructor(tahun) {
        super('Dunlop', '185/55 R15', 4, 7, 'Merah', tahun)
        this.vehicle = 'Jazz'
        this.garansi = 4
    }

}
class Brio extends Car {
    constructor(tahun) {
        super('GT Radial', '195/78 R14', 4, 6, 'Hitam', tahun)
        this.vehicle = 'Brio'
        this.garansi = 5
    }

}
class Oddysey extends Car {
    constructor(tahun) {
        super('Bridgestone', '175/45 R13', 4, 8, 'Silver', tahun)
        this.vehicle = 'Oddysey'
        this.garansi = 6
    }

}
class CarFactory {
    constructor(){
        this.cars = []
    }
    
    static acak() {
        return Math.floor(Math.random() * 100)
    }
    
    produksi(tahun) {
        for(let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Jazz(tahun)); 
        }
        for(let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Brio(tahun))
        }
        for(let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Oddysey(tahun))
        }
    }

    garansi(year) {
        console.log('Hasil Produksi bulan ini: ')
        this.cars.forEach(content => {
            console.log(`
            Tahun Pembuatan: ${content.year}
            No Mesin: ${content.nomesin}
            Nama Mobil: ${content.vehicle}
            Warna Mobil: ${content.color}
            Jumlah Pintu: ${content.door}
            Jumlah Kursi: ${content.seat}
            Merk/Ukuran Ban: ${content.tyre.brand} ${content.tyre.size}
            Garansi: ${content.garansi} Tahun
            Masa Berlaku Garansi: ${(year - content.year) <= content.garansi ? 'Masih Berlaku' : 'Tidak Berlaku'} 
            `)
        })
    }
}

let honda = new CarFactory
honda.produksi(2018)
honda.produksi(2020)
honda.garansi(2023)