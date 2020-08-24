import $ from 'jquery'
import bg from '../image/star.jpg'
const bgImg = new Image()
bgImg.src = bg
$('body').append(bgImg)
console.log(window.$);
$('#say').text("hello home")

require('../style/common.css')
require('../style/home.css')
// eslint-disable-next-line no-unused-vars
let a = 1;
