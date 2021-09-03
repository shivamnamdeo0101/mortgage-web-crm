import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import "./App.css";

function Loading() {
	return (
		<div className="loading">
			 <CircularProgress color="#444"/>
		</div>
	)
}

export default Loading