$(function(){

var canvasEl = document.getElementById("canvas");
var ctx = canvasEl.getContext('2d');


var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };


})