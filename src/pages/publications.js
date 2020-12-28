import React from "react";
import AWS from "aws-sdk";
import Header from '../components/Header';
import styled from "styled-components";

const List = styled.li`
  max-width: 50%;
  :hover{
    color: blue;
    font-weight: bold;
    cursor: pointer;
  }
`

class Publications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ''
    }
  }


  componentDidMount() {
    let params = {
      Bucket: 'aws1.efishery',
      Prefix: 'notebooks/',
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.GATSBY_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.GATSBY_AWS_SECRET_ACCESS_KEY,
      region: process.env.GATSBY_AWS_REGION,
    });

    s3.listObjectsV2(params, (err, data) => {
      if (err) console.log(err);
      else {
        for (const content of data.Contents) {
          if (content.Size === 0) continue;

          const objectParams = {
            Bucket: 'aws1.efishery',
            Key: content.Key,
          }

          s3.getObject(objectParams, (err, dataObject) => {
            const copyData = { ...dataObject, Filename: content.Key };
            if (err) console.log(err);
            else {
              this.setState({ items: [...this.state.items, copyData] });
            }
          })
        }
      }
    });
  }

  showData = (index) => {
    const selectedItem = this.state.items[index];
    var wnd = window.open("about:blank", "_blank");

    const html = selectedItem.ContentType === 'text/html'
      ? selectedItem.Body.toString('utf-8')
      : 'Not HTML Format';

    wnd.document.write(html);
  }

  render() {
    console.log('Pubs Data: ', this.state.items);
    return (
      <div>
        <Header>
          Data Science Showcase Collections
        </Header>
        <ul>
          {this.state.items && this.state.items.map((item, index) => {
            return (
              <List onClick={() => this.showData(index)} key={index}>
                {item.Filename}
              </List>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Publications;