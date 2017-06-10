class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.baseURL = 'https://api.themoviedb.org/3';
    this.discoverURL = '/discover/movie?include_adult=false&';
    this.searchURL = '/search/movie?include_adult=false&';
    this.genreURL = '/genre/movie/list?';
    this.imageURL = 'https://image.tmdb.org/t/p/w342';
    this.apikey = '0566c7e8fd04d3d26c3021e5622a70a0';
  }

  getGenres() {
    return this.$http.get(`${this.baseURL}${this.genreURL}api_key=${this.apikey}`)
      .then((response) => response.data.genres);
  }

  getPopular() {
    return this.$http.get(`${this.baseURL}${this.discoverURL}sort_by=popularity.desc&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getLatest() {
    return this.$http.get(`${this.baseURL}${this.discoverURL}sort_by=release_date.desc&release_date.lte=2017-05-30&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getTopRated() {
    return this.$http.get(`${this.baseURL}${this.discoverURL}sort_by=vote_count.desc&vote_average.gte=8&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  search(keyword) {
    return this.$http.get(`${this.baseURL}${this.searchURL}query=${keyword}&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getCovers(results) {
    return results.map((result) => result.poster_path ? this.imageURL + result.poster_path : 'http://via.placeholder.com/270x400');
  }
}

MoviesService.$inject = ['$http'];

export default MoviesService;
