import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
export default ({ data }) => {
  const node = data.allMarkdownRemark.edges[0].node
    const siteData = useStaticQuery(graphql`
      query MyQuery {
        allImageSharp {
          edges {
            node {
              fixed(width: 32) {
                base64
                width
                height
                src
                srcSet
                originalName
              }
            }
          }
        }
        file(relativePath: { eq: "images/icon.png" }) {
          childImageSharp {
            # Specify a fixed image and fragment.
            # The default width is 400 pixels
            fixed(width: 32) {
              base64
              width
              height
              src
              srcSet
            }
          }
        }
        allMarkdownRemark {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                author
                image {
                  publicURL
                  relativePath
                }
              }
              html
            }
          }
        }
      }
    `)
    let hoge;
    if (siteData.allImageSharp.edges) {
      hoge = siteData.allImageSharp.edges.filter(
        image => image.node.fixed.originalName === "tonkotsuRamen.png"
      )
    }
    console.log(siteData.allImageSharp.edges)
    console.log({ hoge })
  return (
    <>
      <div className="header">
        <div className="header-content">
          <Img className="icon" fixed={hoge[0].node.fixed} />
          <span className="title">Leadersへの意気込み</span>
        </div>
      </div>
      <div className="content">
        <div className="information">
          <Img className="icon" fixed={siteData.file.childImageSharp.fixed} />
          <div className="author">{node.frontmatter.author}</div>
          <div className="date">{node.frontmatter.date}</div>
        </div>
        <h1>{node.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </div>
    </>
  )
}
