import React, { Component } from 'react';
import {
Switch,
Route,
withRouter
} from "react-router-dom";
import Blog from './Blog';
import Article from './Article';
import Main from './Main';
import Four_O_Four from './404';

import { connect } from 'react-redux';
import { 
    addArticles, 
    addArticle,
    addFilter,
    removeFilter,
    loadArticles, 
    loadArticle,
    sortArticles
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
      articles: state.articles,
      article: state.article,
      filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({  
    addArticle: (article) => dispatch(addArticle(article)),
    addArticles: (articles) => dispatch(addArticles(articles)),
    addFilter: (type) => dispatch(addFilter(type)),
    removeFilter: (type) => dispatch(removeFilter(type)),
    loadArticle: (id) => dispatch(loadArticle(id)),
    loadArticles: () => dispatch(loadArticles()),
    sortArticles: (articles, sortType, order) => dispatch(sortArticles(articles, sortType, order))
});

class Body extends Component {
    constructor(props){
      super(props);
    }

    componentDidMount() {
        this.props.loadArticles();
    }

    render(){
        return(
            <main>
                <Switch>
                    {/* NOTE: we render the component this way because when the article is loading from a page click, it passes the article json info from props. */}
                    <Route path={'/blog/article/:id'}
                        render={ (props) =><Article {...props}
                                article={this.props.article.article}
                                isLoading={this.props.article.isLoading}
                                errMess={this.props.article.errMess}
                                addArticle={this.props.addArticle}
                                loadArticle={this.props.loadArticle}
                            /> } />

                    <Route path="/blog">
                        <Blog 
                            articles={this.props.articles.articles}
                            isLoading={this.props.articles.isLoading}
                            errMess={this.props.articles.errMess}
                            filters={this.props.filters.filters}
                            addArticle={this.props.addArticle}
                            addArticles={this.props.addArticles}
                            loadArticles={this.props.loadArticles}
                            sortArticles={this.props.sortArticles}
                            addFilter={this.props.addFilter}
                            removeFilter={this.props.removeFilter}
                            />
                    </Route>
                    <Route path="/personal">
                        <div>Personal</div>
                    </Route>
                    <Route path="/" exact>
                        <Main />
                    </Route>
                    <Route>
                        <Four_O_Four />
                    </Route>
                </Switch>
            </main>
        )
    }
}

// export default Body;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));