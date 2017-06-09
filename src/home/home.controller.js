function HomeController(MoviesService) {
  const vm = this;

  vm.movies = [];
  vm.covers = [];

  vm.loadPopular = loadPopular;
  vm.loadRated = loadRated;
  vm.loadLatest = loadLatest;

  activate();

  ////////////////

  function activate() {
    loadPopular();
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
}

HomeController.$inject = ['MoviesService'];

export default HomeController;
