import React, { Component } from 'react';
import Markdown from 'react-markdown';
import Loading from './Loading';
import CodeBlock from './CodeBlock';

import { SocialShareIcons } from './SocialMedia';

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

    render(){
        if(this.props.isLoading){
            return(
                <Loading />
            )
        }else{
            const testArr = this.props.article.description.split('  ');
            const body = (this.props.article.body_markdown).split('---').pop();

            const descriptionAvailable = !testArr.every( sentence => {
                // if it's just a blank string
                if (!sentence.replace(/\s/g, '').length){
                    return true;
                }
                return body.includes(sentence.trim());
            });

            const linkTitle = this.props.article.title.replace(/\s/g, '%20');

            const sms = {
                twitter : {
                    icon : {
                        path : 'BrandIcons',
                        name : 'faTwitter',
                    },
                    link : {
                        url : `https://twitter.com/intent/tweet?url=${window.location.href}&text=${linkTitle}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share on Twitter'
                        }
                    },
                },
                linkedin : {
                    icon : {
                        path : 'BrandIcons',
                        name : 'faLinkedinIn'
                    },
                    link : {
                        url : `http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${linkTitle}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share on Linkedin'
                        }
                    },
                },
                facebook : {
                    icon : {
                        path : 'BrandIcons',
                        name : 'faFacebook'
                    },
                    link : {
                        url : `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}%20${linkTitle}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share on Facebook'
                        }
                    },
                },
                reddit : {
                    icon : {
                        path : 'BrandIcons',
                        name : 'faReddit'
                    },
                    link : {
                        url : `http://www.reddit.com/submit?url=${window.location.href}&title=${linkTitle}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share on Reddit'
                        }
                    },
                },
                mail : {
                    icon : {
                        path : 'SolidIcons',
                        name : 'faEnvelope'
                    },
                    link : {
                        url : `mailto:?subject=${linkTitle}&body=Check%20out%20booellean's%20article%0D%0A%0D%0A${window.location.href}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share in an Email'
                        }
                    },
                },
            };

            // If they are on a phone
            if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS)/)){
                sms.sms = {
                    icon : {
                        path : 'SolidIcons',
                        name : 'faSms'
                    },
                    link : {
                        url : `sms:?subject=${linkTitle}&body=Check%20out%20booellean's%20article%0D%0A%0D%0A${window.location.href}`,
                        properties : {
                            className : 'social-link',
                            target : '_blank',
                            'aria-label' : 'Share in an Email'
                        }
                    },
                };
            }

            navigator.userAgent.match()
            return(
                <article>
                    <h1 className="article-title">{this.props.article.title}</h1>
                    {(descriptionAvailable ?
                    <section className="article-description">
                        {this.props.article.description}
                    </section> : <React.Fragment></React.Fragment>
                    )}
                    <section className="article-content">
                        <Markdown
                            source={body} 
                            linkTarget='_blank'
                            renderers={{ code: CodeBlock }}
                        />
                    </section>
                    <section className="social-icons">
                        <SocialShareIcons
                            sms={sms}
                        />
                    </section>
                </article>
            )
        }
    }
}

export default Article;