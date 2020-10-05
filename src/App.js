import React, { useState } from 'react';

import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import ContentContainer from './components/Content/ContentContainer';

const App = () => {
    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);

    return (
        <div className='app-wrapper'>
            <HeaderContainer
                isSchemasClicked={isSchemasClicked}
                setIsSchemasClicked={setIsSchemasClicked}
            />
            <ContentContainer isSchemasClicked={isSchemasClicked} />
        </div>
    );
}

export default App;