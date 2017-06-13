function HomeController(MoviesService, $sce) {
  const vm = this;

  vm.movies = [];
  vm.genres = [];
  vm.covers = [];

  vm.loadPopular = loadPopular;
  vm.loadRated = loadRated;
  vm.loadLatest = loadLatest;
  vm.search = search;
  vm.page = 'discover';

  vm.loadFiltered = loadFiltered;
  vm.resetFilters = resetFilters;
  vm.filterGenre = filterGenre;
  vm.filters = {
    genres: []
  };

  vm.toggleModal = false;
  vm.modalMovie = {};
  vm.modalCover = '';
  vm.modalGenres = [];
  vm.modalRatings = [];
  vm.modalTrailer = '';
  vm.trustSrc = trustSrc;
  vm.openModal = openModal;
  vm.closeModal = closeModal;

  activate();

  ////////////////

  function activate() {
    loadGenres();
    loadPopular();
  }

  // API Functions -----

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

  // Filter Functions -----

  function loadFiltered() {
    MoviesService.getFiltered(vm.filters).then((data) => (vm.movies = data))
      .then((movies) => (vm.covers = MoviesService.getCovers(movies)));
  }

  function resetFilters() {
    vm.filters = {
      genres: []
    };

    loadPopular();
  }

  function filterGenre(id) {
    if (vm.filters.genres.includes(id)) {
      vm.filters.genres.splice(vm.filters.genres.indexOf(id), 1);
    } else {
      vm.filters.genres.push(id);
    }
  }

  // Modal Functions -----

  function openModal(id) {
    vm.modalMovie = vm.movies[id];
    vm.modalCover = vm.covers[id];
    vm.modalGenres = getModalGenres();
    MoviesService.getOMDBRating(vm.modalMovie.title).then((data) => (vm.modalRatings = data));
    MoviesService.getTrailer(vm.modalMovie.id).then((data) => (vm.modalTrailer = data));
    vm.toggleModal = true;
  }

  function closeModal() {
    vm.modalMovie = {};
    vm.modalCover = '';
    vm.modalGenres = [];
    vm.modalRatings = [];
    vm.modalTrailer = '';
    vm.toggleModal = false;
  }

  function getModalGenres() {
    return vm.genres.filter((genre) => vm.modalMovie.genre_ids.includes(genre.id))
      .map((modalGenre) => modalGenre.name);
  }

  function trustSrc(src) {
    return $sce.trustAsResourceUrl(src);
  }
}

HomeController.$inject = ['MoviesService', '$sce'];

export default HomeController;
