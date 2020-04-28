// Solution for Syntax highlighter taken from Bexultan A. Myrzatayev
// https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
// Read on March 10, 2020 at 10:31am

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightBlue as styled } from 'react-syntax-highlighter/dist/cjs/styles/hljs'; 

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={styled}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;