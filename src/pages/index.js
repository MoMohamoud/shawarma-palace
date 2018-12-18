import React from 'react';
import {Link, graphql} from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {rhythm} from '../utils/typography';
import {Parallax, ParallaxLayer} from 'react-spring/addons';
import './styles.css';

// const styles = {
//   .container > div > div {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .text {
//     pointer-events: none;
//     justify-content: start !important;
//     font-family: 'Kanit', sans-serif;
//     line-height: 0px;
//     text-transform: uppercase;
//   }

//   .number {
//     font-size: 450px;
//     color: #373c4c;
//   }

//   .number span {
//     display: inline-block;
//     position: relative;
//     transform: translate3d(-35%, 0, 0);
//   }

//   .header {
//     margin-left: 350px;
//     font-size: 70px;
//     color: white;
//   }

//   .stripe {
//     height: 2px;
//     width: auto;
//   }

//   .slopeBegin {
//     background-color: #20232f;
//     clip-path: polygon(20vw 0, 70% 0, calc(70% - 20vw) 100%, 0 100%);
//   }

//   .slopeEnd {
//     clip-path: polygon(70% 0, 100% 0, calc(100% - 20vw) 100%, calc(70% - 20vw) 100%);
//   }

//   .slopeBegin,
//   .slopeEnd {
//     position: absolute;
//     width: 140%;
//     height: 100%;
//     cursor: pointer;
//   }

//   // .teal {
//   //   background: linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%);
//   // }

//   // .tomato {
//   //   background: linear-gradient(to right, tomato 0%, gold 100%);
//   // }
// };

const Page = ({offset, caption, first, second, gradient, onClick}) => (
  <React.Fragment>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </ParallaxLayer>

    <ParallaxLayer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </ParallaxLayer>

    <ParallaxLayer className="text header" offset={offset} speed={0.4}>
      <span>
        Catering Options
        <p style={{fontSize: 20}}>{caption}</p>
        <div className={`stripe ${gradient}`} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </ParallaxLayer>
  </React.Fragment>
);

class BlogIndex extends React.Component {
  render () {
    const {data} = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <div>
        <Parallax
          className="container"
          ref="parallax"
          pages={3}
          horizontal
          scrolling={true}
        >
          <Page
            offset={0}
            gradient="pink"
            caption="Gold Menu"
            first="Feeds 12-16 People"
            second="Display Images"
          />
          <Page
            offset={1}
            gradient="teal"
            caption="Silver Catering Option"
            first="Feeds 8-12"
            second="Display Images"
          />
          <Page
            offset={2}
            gradient="tomato"
            caption="Bronze Catering Option"
            first="Feeds 4-8"
            second="Display Images"
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
