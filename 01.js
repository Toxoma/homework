function number(num) {
    switch (num) {
        case 5: return 'пять'
        case 13: return 'тринадцать'
        case 22: return 'двадцать два'
        case 35: return 'тридцать пять'
        case 98: return 'девяносто восемь'
        default: return num
    }
}
let x = 14 //? ваше число
let y = '';
for (i = 1; i <= x; i++) {
    y += number(i) + ' '
}
console.log(y)
