import angular from 'angular';
//Styles
import '../css/style.scss';
//Services
import MoviesService from './services/movies.service';
//Controllers
import HomeController from './home/home.controller';

const app = angular.module('filmboard', [])
  .controller('HomeController', HomeController)
  .service('MoviesService', MoviesService);

export default app;
