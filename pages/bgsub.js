import React, { Fragment } from 'react';
import { lifecycle } from 'recompose';

import subBG from '../libs/subBG';

const style = 'img { width: 100% }';

const BackgroundSubtractionPage = ({ retSrc }) => (
  <Fragment>
    <h1>Background subtraction page</h1>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    { retSrc && <img id="result" src={retSrc} alt="result" /> }
    <img id="h001" src="/static/images/0000/history/001.png" alt="001" />
    <img id="h002" src="/static/images/0000/history/002.png" alt="002" />
    <img id="h003" src="/static/images/0000/history/003.png" alt="003" />
  </Fragment>
);

async function componentDidMount() {
  const subImage = await subBG(
    document.getElementById('h001'),
    document.getElementById('h002')
  );
  this.setState({ retSrc: getDataURL(subImage) });
}

export default lifecycle({ componentDidMount })(BackgroundSubtractionPage);

const getDataURL = (imageData) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
};
