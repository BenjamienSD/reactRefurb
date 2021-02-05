import React from 'react';

export default function TableHeader(props) {
  const { isOcmw, text } = props;
  return <th className={isOcmw ? '' : 'sideways'}>{text}</th>;
}
