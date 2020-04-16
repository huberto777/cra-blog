import React, { Component } from "react";
import axios from "axios";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      rating: ""
    };
    // console.log(this.props);
  }

  handleValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addComment = e => {
    e.preventDefault();
    // console.log("click");
    if (this.state.content === "" || this.state.rating === "") return;
    axios
      .post(
        `http://localhost:8000/api/articles/${this.props.match.params.slug}/comments`,
        {
          content: this.state.content,
          rating: this.state.rating
        },
        {
          headers: {
            Authorization: "Bearer " + this.props.isAuth
          }
        }
      )
      .then(res => res.data)
      //console.log(res.data)
      .catch(e => console.log(e));

    this.props.history.goBack();
  };

  render() {
    const { content, rating } = this.state;
    let rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">
              Komentarz: {this.props.match.params.slug}
            </h4>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea
                  value={content}
                  className="form-control col-md-8"
                  type="text"
                  placeholder="treść:"
                  onChange={this.handleValue}
                  name="content"
                ></textarea>
              </div>
              <div className="form-group">
                <select
                  name="rating"
                  value={rating}
                  className="form-control col-md-8"
                  onChange={this.handleValue}
                >
                  <option>wybierz rating</option>
                  {rows}
                </select>
              </div>
              <button
                className="btn btn-secondary col-md-8 mb-2"
                onClick={this.addComment}
              >
                zapisz
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddComment;
