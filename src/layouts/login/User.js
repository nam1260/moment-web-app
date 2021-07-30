import React from 'react';
import '../../App.css';
import '../../Common.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function User() {
    return (
        <div className="App-login container">
            <div className="component">
                <AmplifySignOut />
                My App
            </div>

        </div>
    )
}

export default withAuthenticator(User);