import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
import Plist from './plist';
import './app.scss';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"keyword": ""};
    this.refreshKeyword = this.refreshKeyword.bind(this);
  }

  refreshKeyword(name) {
    this.setState({"keyword": name});
  }

  render() {
    return (
      <div  className="container">
        <section>
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <Search sendAction={this.refreshKeyword}/>
        </section>

        <Plist keyword={this.state.keyword}/>
      </div>    
    );
  }
}
export default App