import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Blog extends Component {
    constructor(props){
      super(props);

      if(window.initialData){
        props.addArticles(window.initialData);
        window.initialData = null;
      }

      let page = 1;

      if(window.page){
        page = parseInt(window.page);
        window.page = null;
      }

      this.state = {
          currentPage : page
      }
    }

    componentDidMount(){
        if(this.props.isLoading){
            this.props.loadArticles();
        }
    }

    createTagList = (article) =>{
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

    createDateItem = (article) =>{
        if(article.published){
            return(
                <time datetime={article.published_at}>
                    {article.published_at}
                </time>
            );
        }
    }

    formatAricles = (articles) =>{
        if(articles.length > 0){
            return (
                <ul>
                    {articles.map( article =>{
                        return(
                            <li key={article.id}>
                                <Link to={{ pathname : `/blog/article/${article.id}`, entry : article }}>
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

    sortButton = (e, articles, type) =>{
        const index = this.props.filters.indexOf(type + '-asc' );

        if(index > -1){
            return this.props.sortArticles(articles, type, 'desc');
        }
        return this.props.sortArticles(articles, type, 'asc');
    }

    filterButton = (e, tag) =>{
        const index = this.props.filters.indexOf(tag);

        if(index > -1){
            return this.props.removeFilter([tag]);
        }
        return this.props.addFilter([tag]);
    }

    render(){
        if(this.props.isLoading){
            return(
                <div>
                    Loading...
                </div>
            )
        }else{
            // TODO: Paginate here

            // Filters out any items that do not have the filtered tags
            let activeArticles = this.props.articles;
            if(this.props.filters.length > 0){
                activeArticles = this.props.articles.filter( article =>  article.tag_list.filter(tag => this.props.filters.includes(tag)).length > 0 );
            }
            
            const perPage = 2;

            const maxPages = Math.floor(activeArticles.length/perPage);

            const lastIndex = this.state.currentPage * perPage;
            const firstIndex = lastIndex - perPage;

            const shownArticles = activeArticles.slice(firstIndex, lastIndex);

            return(
                <div>
                    Blog Page!
                    <button onClick={ (e) => this.sortButton(e, this.props.articles, 'alphabetical')}>Alphabetize</button>
                    <button onClick={ (e) => this.sortButton(e, this.props.articles, 'date')}>Date</button>
                    <button onClick={ (e)=> this.filterButton(e, 'tests')}>Tests Tag</button>
                    <button onClick={ (e)=> this.filterButton(e, 'code')}>Code Tag</button>
                    { this.formatAricles(shownArticles) }
                </div>
            )
        }
    }
}

export default Blog;