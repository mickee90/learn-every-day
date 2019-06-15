import React from 'react';

import styled from 'styled-components';

export default props => {
    let classes = [];
    if(props.classes) {
        classes.push(props.classes);
    }

    return (
        <Alert className={classes.join(' ')} onClick={props.alertClose}>{props.children}</Alert>
    );
}

const Alert = styled.div`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    margin: 5px;
    position: absolute;
    right: 0;
    left: 0;
    display: none;
    color: white;
    font-size: 14px;

    &.success {
        background: green;
        display: block;
    }
    &.error {
        background: red;
        display: block;
    }
    &.info {
        background: blue;
        display: block;
    }
`;