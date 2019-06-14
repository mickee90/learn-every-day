import React from 'react';

import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export default props => {
    return (
        <StyledCircularProgress 
            size={props.width ? props.witdh : 50} 
        />
    );
}

const StyledCircularProgress = styled(CircularProgress) ({
	width: '50px',
	height: '50px',
	position: 'absolute',
	top: '50%',
	left: '0;',
	right: '0',
	margin: '0 auto'
});