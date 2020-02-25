import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
    constructor(props){
      super(props);

      if(!props.article){
        if(window.initialData){
            props.addArticle(window.initialData);
            window.initialData = null;
          }
      }
    }

    componentDidMount(){
        console.log(this.props);
        if(!!this.props.location){
            if(!!this.props.location.entry){
                const article = this.props.location.entry;
                return this.props.addArticle(article);
            }
        }

        if(!this.props.article){
            const id = window.location.pathname.split('/').pop();
            return this.props.loadArticle(id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps);
    }

    render(){
        if(this.props.isLoading){
            return(
                <div>
                    Loading...
                </div>
            )
        }else{
            return(
                <div>
                    {this.props.article.title}
                </div>
            )
        }
    }
}

export default Article;