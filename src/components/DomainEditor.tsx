import React from 'react';
import TextField from '@material-ui/core/TextField';

interface P {
    domainText: string;
}
export class DomainEditor extends React.Component<P, {}> {
    render() {
        return (
            <div>
                <TextField id="standard-basic" value={this.props.domainText}/>
            </div>
        );
    }
}