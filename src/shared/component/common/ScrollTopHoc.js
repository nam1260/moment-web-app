import React from 'react';

export const ScrollTopHoc = (WrapComponent) => {

    return class extends React.Component {
        constructor(props) {
            super(props)
            document.documentElement.scrollTo({ top: 0, left: 0 }) 
        }

        render() {
            return <WrapComponent {...this.props}/>
        }
    }
}