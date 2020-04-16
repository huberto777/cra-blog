import React, { Component } from 'react';
import axios from 'axios';

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      rating: '',
    };
    // console.log(this.props);
  }

  token = {
    headers: {
      Authorization: `Bearer ${this.props.isAuth}`,
    },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/articles/${this.props.match.params.slug}/comments/${this.props.match.params.id}/edit`,
        this.token,
      )
      .then(response => {
        this.setState({
          content: response.data.content,
          rating: response.data.rating,
        });
      })
      .catch(error => console.log(error));
  }

  handleContent = e => {
    this.setState({
      content: e.target.value,
    });
    //
  };
  handleRating = e => {
    this.setState({
      rating: e.target.value,
    });
    console.log(e.target.value);
  };
  editComment = e => {
    e.preventDefault();
    const params = {
      content: this.state.content,
      rating: this.state.rating,
    };
    if (this.state.content === '' || this.state.rating === '') return;
    axios
      .put(
        `http://localhost:8000/api/articles/${this.props.match.params.slug}/comments/${this.props.match.params.id}`,
        params,
        this.token,
      )
      .then(res => res.data)
      .catch(err => console.log(err));
    this.props.history.goBack();
  };

  render() {
    const { content, rating } = this.state;
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">edycja komentarza: {this.props.match.params.slug}</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea
                  value={content}
                  className="form-control col-md-8"
                  type="text"
                  placeholder="treść:"
                  onChange={this.handleContent}
                />
              </div>
              <div className="form-group">
                <select
                  value={rating}
                  className="form-control col-md-8"
                  onChange={this.handleRating}
                >
                  <option>{rating}</option>
                  {rows}
                </select>
              </div>
              <button className="btn btn-secondary col-md-8 mb-2" onClick={this.editComment}>
                zapisz
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default EditComment;
