import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults : 0
    };
    document.title=`${this.props.category}-News`;
  }

  async updateNews() {}

  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9eddc30124d4553b659ffdad74b5302&page=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, page: 1, loading: false ,totalResults:parsedData.totalResults });
    this.props.setProgress(100);
  }

  // handlePrev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=b9eddc30124d4553b659ffdad74b5302&page=${this.state.page - 1}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  // handleNext = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=b9eddc30124d4553b659ffdad74b5302&page=${this.state.page + 1}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
   this.props.setProgress(0);
    this.setState({page : this.state.page + 1 })
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9eddc30124d4553b659ffdad74b5302&page=${this.state.page}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles), page: this.state.page, loading: false ,totalResults:parsedData.totalResults });
    this.props.setProgress(100);
  };

  render() {
    return (
      <><div className="container my-3">
        <h1 className="text-center">Top headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
            dataLength={this.state.articles?.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles?.length !== this.state.totalResults}
            loader={<Spinner/>}
          >

        <div className="row">
         
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    title={element.title ? element.title.slice(0, 58) : ""}
                    description={element.description
                      ? element.description.slice(0, 105)
                      : ""}
                    imageUrl={element.urlToImage
                      ? element.urlToImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2KTjdkrae7DSg2iMlEIfg_oY2FXR6gNBLjEcxmVGw-w3TD9a56fKV9T7B2XXF9upJ5s&usqp=CAU"}
                    newsUrl={element.url} />
                </div>

              );
            })}
            </div>
            </InfiniteScroll>
            </div>
          
          
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}  
    </>
    )
  }
  
}

export default News;
