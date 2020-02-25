import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Blog extends Component {
    constructor(props){
      super(props);

      console.log(window.location);

      if(window.initialData){
        props.addArticles(window.initialData);
        window.initialData = null;
      }

      this.state = {
          page : 1
      }
    }

    componentDidMount(){
        if(this.props.isLoading){
            this.props.loadArticles();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // TODO: Merge state only if the article isn't already there.
        // console.log(prevState);
    }

    createTagList(article){
        if(article.tag_list.length > 0){
            return(
                <ul>
                    {article.tag_list.map( tag =>{
                        return(
                            <li key={tag}>#{tag}</li>
                        );
                    })}
                </ul>
            )
        }else{
            return '';
        }
    }

    createDateItem(article){
        if(article.published){
            return(
                <time datetime={article.published_at}>
                    {article.published_at}
                </time>
            );
        }
    }

    formatAricles(articles){
        if(articles.length > 0){
            return (
                <ul>
                    {articles.map( article =>{
                        return(
                            <li key={article.id}>
                                <Link to={{ pathname : `/blog/${article.id}`, entry : article }}>
                                    <article>
                                        <h2>{ article.title }</h2>
                                        <div>{ this.createDateItem(article) }</div>
                                        <p>{ article.description }</p>
                                        <div>{ this.createTagList(article) } </div>
                                    </article>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }else{
            return <h3>There are no Articles at this Time!</h3>
        }

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
                    Blog Page!
                    { this.formatAricles(this.props.articles) }
                </div>
            )
        }
    }
}

export default Blog;