function number(num) {
    for (i = 1; i <= num; i++) {
        switch (i) {
            case 5: console.log('пять');
                break;
            case 13: console.log('тринадцать');
                break;
            case 22: console.log('двадцать два');
                break;
            case 35: console.log('тридцать пять');
                break;
            case 98: console.log('девяносто восемь');
                break;
            default: console.log(i);
                break;

        }
    }
}
let x = 14 //? ваше число
number(x)
//1223
