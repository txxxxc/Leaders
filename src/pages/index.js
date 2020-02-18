import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => {
  console.log({data})
  const node = data.allMarkdownRemark.edges[0].node
  console.log(node)
  return (
    <div class="content">
      <div class="header">
        <img
          class="icon"
          src={node.frontmatter.image.publicURL}
          alt=""
          width="32px"
        />
        <div class="author">{node.frontmatter.author}</div>
        <div class="date">{node.frontmatter.date}</div>
      </div>
      <div>{node.frontmatter.title}</div>
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
    </div>
  )
}

export const query = graphql`
        query {
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
      `
