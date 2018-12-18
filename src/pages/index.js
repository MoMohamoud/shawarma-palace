import React, {Fragment} from 'react';
import {Link, graphql} from 'gatsby';
import delay from 'delay';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {rhythm} from '../utils/typography';
import {Parallax, ParallaxLayer} from 'react-spring/addons';
import {Keyframes, animated} from 'react-spring';

import './styles.css';

let selectedIndexValue = 0;

const myTimer = value => {
  console.log ('value', value);
  selectedIndexValue += 1;
};
console.log ('here');
// const myVar = setInterval(myTimer, 1000);
const setTimeoutAsync = function (value) {
  new Promise (r => setInterval (myTimer, 10000, value));
};

const Page = ({offset, caption, first, second, gradient, onClick}) => {
  return (
    <React.Fragment>
      <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
        <div className="slopeBegin" />
      </ParallaxLayer>

      <ParallaxLayer offset={offset} speed={-0.2} onClick={onClick}>
        <div className={`slopeEnd ${gradient}`} />
      </ParallaxLayer>

      {/* <ParallaxLayer className="text number" offset={offset} speed={0.3}>
        <span>{second}</span>
      </ParallaxLayer> */}

      <ParallaxLayer className="text header" offset={offset} speed={0.4}>
        <span>
          {/* <p style={{fontSize: 20}}>{caption}</p> */}
          {/* <div className={`stripe ${gradient}`} /> */}
          {/* <p>{first}</p> */}
          {/* <p>{second}</p> */}
        </span>
      </ParallaxLayer>
    </React.Fragment>
  );
};

class BlogIndex extends React.Component {
  render () {
    const {data} = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    console.log('offset', this.refs.parallax)

    // if (this && this.refs.parallax && this.refs.parallax) {
    //   setTimeoutAsync (this.refs.parallax);
    // }

    return (
      <div>
        <Parallax
          className="container"
          ref="parallax"
          pages={3}
          horizontal
          scrolling
        >
          <Page
            offset={0}
            gradient="pink"
            caption="Gold Menu"
            first="Feeds 12-16 People"
            second="Gold Menu"
          />
          <Page
            offset={1}
            gradient="teal"
            caption="Silver Catering Option"
            first="Feeds 8-12"
            second="Silver Menu"
          />
          <Page
            offset={2}
            gradient="tomato"
            caption="Bronze Catering Option"
            first="Feeds 4-8"
            second="Bronze Menu"
          />
        </Parallax>
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
