import React from 'react';
import './App.css';
import Domain from "./models/Domain";
import { DomainTree } from './components/DomainTree';
import { DomainEditor } from './components/DomainEditor';

interface S{
  domains: Domain[];
  selectedDomain: string;
}

class App extends React.Component<{}, S> {
  
  constructor(props: any) {
    super(props);
    this.state = { domains: [], selectedDomain: "" };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:8000/domain/all';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ domains: [...data] });
      });
  }

  render() {
    return (
      <div className="App">
        <DomainTree domains = {this.state.domains} selectedDomain={this.domainSelected} />
        <br/>
        <DomainEditor domainText={this.state.selectedDomain} />
      </div>
    );
  }

  domainSelected = (domain: string) => {
    this.setState({ selectedDomain: domain });
  }
}

export default App;
