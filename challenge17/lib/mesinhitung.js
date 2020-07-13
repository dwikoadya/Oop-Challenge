export default class MesinHitung {
    // initial number
    constructor() {
        this.x = 1
        // this.Pi = 22/7  c
        
    }
    // penambahan
    add(z) {
        this.x += z;this
        return this;
    }
    // pengurangan
    substract(z) {
        this.x -= z;
        return this
    }
    // pembagian
    divide(z) {
        this.x /= z;
        return this;
    }
    // perkalian
    multiply(z) {
        this.x *= z;
        return this;
    }
    // akar pangkat 2
    squareRoot() {
        this.x = Math.sqrt(this.x);
        return this;
    }
    // exponent
    exponent(z) {
        this.x =  Math.pow(this.x, z);
        return this;
    }
    // pangkat 2
    square(z) {
        if (z === undefined) {
            this.x = Math.pow(this.x, 2);
            return this
        } else {
            this.x = Math.pow(this.x, z);
            return this
        }
    }
    // hasil
    result(){
        console.log(this.x)
    }
}

export const Pi = 3.14