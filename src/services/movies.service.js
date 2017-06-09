class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.baseURL = 'https://api.themoviedb.org/3';
    this.imageURL = 'https://image.tmdb.org/t/p/w342';
    this.apikey = '0566c7e8fd04d3d26c3021e5622a70a0';
  }

  getPopular() {
    return this.$http.get(`${this.baseURL}/discover/movie?sort_by=popularity.desc&include_adult=false&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getLatest() {
    return this.$http.get(`${this.baseURL}/discover/movie?sort_by=release_date.desc&release_date.lte=2017-05-30&include_adult=false&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getTopRated() {
    return this.$http.get(`${this.baseURL}/discover/movie?sort_by=vote_count.desc&vote_average.gte=8&include_adult=false&api_key=${this.apikey}`)
      .then((response) => response.data.results);
  }

  getCovers(results) {
    return results.map((result) => this.imageURL + result.poster_path);
  }
}

MoviesService.$inject = ['$http'];

export default MoviesService;
