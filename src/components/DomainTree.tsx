import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
//import Button from "@material-ui/core/Button";
import Domain from '../models/Domain';

interface P {
    domains: Domain[];
    selectedDomain(domainText: string): void;
}

export class DomainTree extends React.Component<P, {}> {

    render() {
        return (
            <TreeView key="domainTree" defaultCollapseIcon={<ExpandMoreIcon />} 
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {this.props.domains.map((domain) => 
                    <TreeItem key={domain.id} nodeId={domain.text.replace(" ", "")} label={domain.text} 
                        onLabelClick={this.domainClick}>
                        {domain.domains? 
                            <DomainTree domains={domain.domains} selectedDomain={this.domainClick}/> : 
                            <div></div>}
                    </TreeItem>
                )}
            </TreeView>
            );
    }

    domainClick = (data: any) => {
        let selectedText = data.target? data?.target?.textContent: data;
        this.props.selectedDomain(selectedText);
        //console.log(data.target.textContent);
    }
}