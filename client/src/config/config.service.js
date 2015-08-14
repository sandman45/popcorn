/**
 * Created by matthew.sanders on 4/15/15.
 */
var app = angular.module('popcorn');

app.service('config', function() {
  this.couch = {
    url: 'http://107.170.178.211:8081/',
    urlLocal: "http://127.0.0.1:8081/"
  };
  this.giphy = {
    url:"http://api.giphy.com/v1/gifs",
    publicKey:"dc6zaTOxFJmzC",
    productionKey:""//TODO: get prod key when ready
  }
});