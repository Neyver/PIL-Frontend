import React from 'react';
import parse from 'html-react-parser';

const TransformToHtml = (text) => {
  return (
    < React.Fragment >
      { parse(text ? text : "")}
    </React.Fragment >
  )
};

export default TransformToHtml
