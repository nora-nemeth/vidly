import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

class DisplayMovies extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return (
      <React.Fragment>
        {this.displayText()}
        <table>
          <thead>
            <tr>
              <th className="pr-4 pl-4 pt-4">Title</th>
              <th className="pr-4 pl-4 pt-4">Genre</th>
              <th className="pr-4 pl-4 pt-4">Stock</th>
              <th className="pr-4 pl-4 pt-4">Rate</th>
            </tr>
          </thead>
          {this.renderFilms()}
        </table>
      </React.Fragment>
    );
  }

  displayText() {
    const { length: count } = this.state.movies;

    if (count > 0) {
      return <p>Showing {count} movies in the database.</p>;
    } else {
      return <p>There are no movies in the database.</p>;
    }
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  renderFilms() {
    return (
      <tbody>
        {this.state.movies.map((movie) => (
          <tr key={`${Math.random()}`}>
            <td key={`${movie._id} ${movie.title}`} className="pr-4 pl-4 pt-4">
              {movie.title}
            </td>
            <td
              key={`${movie._id} ${movie.genre.name}`}
              className="pr-4 pl-4 pt-4"
            >
              {movie.genre.name}
            </td>
            <td
              key={`${movie._id} ${movie.numberInStock}`}
              className="pr-4 pl-4 pt-4"
            >
              {movie.numberInStock}
            </td>
            <td
              key={`${movie._id} ${movie.dailyRentalRate}`}
              className="pr-4 pl-4 pt-4"
            >
              {movie.dailyRentalRate}
            </td>
            <td>
              <Like
                liked={movie.liked}
                onClick={() => this.handleLike(movie)}
              />
            </td>
            <td key={movie._id}>
              <button
                key={movie._id}
                data-key={movie._id}
                onClick={this.deleteMovieRow}
                className="btn btn-danger mr-4 ml-4 mt-4"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  deleteMovieRow = (event) => {
    this.setState(deleteMovie(event.target.getAttribute('data-key')));
  };
}

export default DisplayMovies;
