function HomeController(MoviesService) {
  const vm = this;

  vm.movies = [];
  vm.genres = [];
  vm.covers = [];

  vm.loadPopular = loadPopular;
  vm.loadRated = loadRated;
  vm.loadLatest = loadLatest;
  vm.search = search;

  vm.toggleModal = false;
  vm.modalMovie = {};
  vm.modalCover = '';
  vm.modalGenres = [];
  vm.openModal = openModal;
  vm.closeModal = closeModal;

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

  function openModal(id) {
    vm.modalMovie = vm.movies[id];
    vm.modalCover = vm.covers[id];
    vm.modalGenres = getModalGenres();
    vm.toggleModal = true;
  }

  function closeModal() {
    vm.modalMovie = {};
    vm.modalCover = '';
    vm.modalGenres = [];
    vm.toggleModal = false;
  }

  function getModalGenres() {
    return vm.genres.filter((genre) => vm.modalMovie.genre_ids.includes(genre.id))
      .map((modalGenre) => modalGenre.name);
  }
}

HomeController.$inject = ['MoviesService'];

export default HomeController;
