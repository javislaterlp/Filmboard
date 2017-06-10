function HomeController(MoviesService) {
  const vm = this;

  vm.movies = [];
  vm.genres = [];
  vm.covers = [];

  vm.loadPopular = loadPopular;
  vm.loadRated = loadRated;
  vm.loadLatest = loadLatest;
  vm.search = search;

  activate();

  ////////////////

  function activate() {
    loadGenres();
    loadPopular();
  }

  function loadGenres() {
    MoviesService.getGenres().then((data) => (vm.genres = data));
  }

  function loadPopular() {
    MoviesService.getPopular().then((data) => (vm.movies = data))
      .then((movies) => (vm.covers = MoviesService.getCovers(movies)));
  }

  function loadRated() {
    MoviesService.getTopRated().then((data) => (vm.movies = data))
      .then((movies) => (vm.covers = MoviesService.getCovers(movies)));
  }

  function loadLatest() {
    MoviesService.getLatest().then((data) => (vm.movies = data))
      .then((movies) => (vm.covers = MoviesService.getCovers(movies)));
  }

  function search(keyword) {
    MoviesService.search(keyword).then((data) => (vm.movies = data))
      .then((movies) => (vm.covers = MoviesService.getCovers(movies)));
  }
}

HomeController.$inject = ['MoviesService'];

export default HomeController;
