import angular from 'angular';
//Styles
import '../css/style.scss';
//Controllers
import HomeController from './home/home.controller';

const app = angular.module('filmboard', [])
  .controller('homeController', HomeController);

export default app;
