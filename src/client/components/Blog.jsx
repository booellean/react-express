import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Pagination from './Pagination';

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
          currentPage : page,
          perPage : 1
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

    filterItems = (articles) =>{
        let filters = Object.keys(this.props.filters);
        if(filters.length > 0){
            filters.forEach( filter =>{
                switch(filter){
                    case 'tags':
                        if(this.props.filters[filter].length > 0){
                            articles = articles.filter( article =>  article.tag_list.filter(tag => this.props.filters[filter].includes(tag)).length > 0 );
                        }
                        break;
                    default:
                        break;
                }
            })
        }
        return articles;
    }

    sortButton = (e, articles, type) =>{
        const index = this.props.orders.indexOf(type + '-asc' );

        if(index > -1){
            return this.props.sortArticles(articles, type, 'desc');
        }
        return this.props.sortArticles(articles, type, 'asc');
    }

    filterButton = (e, type, name) =>{
        if(this.props.filters[type]){
            const index = this.props.filters[type].indexOf(name);
            if(index > -1){
                return this.props.removeFilter(type, [name]);
            }
        }

        return this.props.addFilter(type, [name]);
    }

    updatePage = (e, pageNum) =>{
        this.setState({
            currentPage : pageNum
        });
    }

    TagList = (tags) =>{

        const taglist = tags.map( tag => {
            return(
                <li key={tag}>
                    <button onClick={ (e)=> this.filterButton(e, 'tags', tag)}>{tag}</button>
                </li>
            )
        });
    
        return(
            <ul>
                {taglist}
            </ul>
        );
    }

    render(){
        if(this.props.isLoading){
            return(
                <Loading />
            )
        }else{
            // Make Copy of our master articles
            let activeArticles = this.props.articles;

            // Apply all our filters from our props
            activeArticles = this.filterItems(activeArticles);

            // Define Our pagination
            const maxPages = Math.ceil(activeArticles.length/this.state.perPage);

            if(this.state.currentPage > maxPages){
                this.setState({
                    currentPage: maxPages
                });
            }

            const lastIndex = this.state.currentPage * this.state.perPage;
            const firstIndex = lastIndex - this.state.perPage;

            const shownArticles = activeArticles.slice(firstIndex, lastIndex);

            // Create a unique taglist to filter from
            // Thank you Adria from https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items!
            const mergeDedupe = (arr) => {
                return [...new Set([].concat(...arr))];
            }
        
            let tags = activeArticles.map( a =>{
                return a.tag_list;
            });

            tags = mergeDedupe(tags).sort();

            return(
                <div>
                    Blog Page!
                    <button onClick={ (e) => this.sortButton(e, this.props.articles, 'alphabetical')}>Alphabetize</button>
                    <button onClick={ (e) => this.sortButton(e, this.props.articles, 'date')}>Date</button>
                    { this.TagList(tags) }
                    { this.formatAricles(shownArticles) }
                    <Pagination currentPage={this.state.currentPage} maxPages={maxPages} updatePage={this.updatePage}/>
                </div>
            )
        }
    }
}

export default Blog;