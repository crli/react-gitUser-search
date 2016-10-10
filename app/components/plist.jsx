import React from 'react';
import get from './ajax.js';

class Plist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"loading":false, "list": []};
  }

  componentDidMount() {
    this.setState({"firstView": true});
  }
  componentWillReceiveProps(nextProps) {
    let keyword = nextProps.keyword;
    this.setState({"loading": true, 'firstView': false});
    let url = `https://api.github.com/search/users?q=${keyword}`;
    //发起ajax请求
    get(url).then((data) => {
      //更新本组件的state
      console.log(data);
      this.setState({"loading":false, "list": data.items});
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const imgStyle = {
      width: '50px'
    }
    //添加一些if else的判断，用来展示不同的内容
    if (this.state.firstView) {
      return (
        <h2>Enter name to search</h2>
      )
    }
    if (this.state.loading) {
      return (
        <h2>Loading result...</h2>
      );
    } else if (this.state.list.length === 0) {
      return (
        <h2>No result.</h2>
      )
    } else {
      return (
        <div className="row">
          {this.state.list.map(people=>{
            return (
              <div className="card" key={people.login}>
                <a href={people.html_url} target="_blank"><img src={people.avatar_url} style={imgStyle}/></a>
                <p className="cardtext">
                  {people.login}
                </p>
              </div>
            )
          })}
        </div>       
      );
    }
  }
}
export default Plist