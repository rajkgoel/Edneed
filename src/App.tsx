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
    const apiUrl = 'http://localhost:8000/domain/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
         this.setState({domains: this.extractDomains(data?.domains) });
      });
  }

  extractDomains = (data: Record<string, any>): Domain[] => {
    let domains: Domain[] = [];
    for(const [,value] of Object.entries(data)) {
      let dom = value as Domain;
      let domain: Domain = { 
        text: dom.text, id: dom.id, level: dom.level, 
        parent_id: dom.parent_id, domains: [] 
      }; 
      if (dom.domains) {
        let childDomains = this.extractDomains(dom.domains);
        domain.domains = childDomains;
      }
      domains.push(domain);
    }
    return domains;
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
