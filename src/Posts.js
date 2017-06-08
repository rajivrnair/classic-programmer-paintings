import React, { Component } from 'react';

import apiResponse from './api.js';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      posts: apiResponse.posts.map(function(post) {
                return {
                  id: post.id,
                  photo: post['photo-url-1280'],
                  caption: post['photo-caption'] ? post['photo-caption'] : '¯\\_(ツ)_/¯',
                  height: post.height,
                  width: post.width 
                };
              }),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      index: (this.state.index > 112) ? 0 : this.state.index + 1,
    });
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
  }

  render() {
    const dimensions = this.calculateAspectRatioFit(this.state.posts[this.state.index].width, this.state.posts[this.state.index].height, 640, 480);
    return (      
      <figure>
        <figcaption dangerouslySetInnerHTML={{ __html: this.state.posts[this.state.index].caption }} />
        <img src={this.state.posts[this.state.index].photo} height={dimensions.height} width={dimensions.width} alt='nothing to see' />
      </figure>
    );
  }
}