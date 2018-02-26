import React, { Fragment } from 'react';
import { lifecycle } from 'recompose';

import subBG, { imageDimensions } from '../libs/subBG';
import getCroppingDimensions from '../libs/getCroppingDimensions';

const style = 'img { width: 100% }';

const BackgroundSubtractionPage = ({ subSrc, cropSrc001, cropSrc002 }) => (
  <Fragment>
    <h1>Background subtraction page</h1>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    { subSrc && <img id="result" src={subSrc} alt="result" /> }
    <img id="h001" src="/static/images/0000/history/004.png" alt="001" />
    { cropSrc001 && <img id="cropped" src={cropSrc001} alt="cropped" /> }
    <img id="h002" src="/static/images/0000/history/005.png" alt="002" />
    { cropSrc002 && <img id="cropped" src={cropSrc002} alt="cropped" /> }
    <img id="h003" src="/static/images/0000/history/006.png" alt="003" />
  </Fragment>
);

async function componentDidMount() {
  const img001 = document.getElementById('h001');
  const img002 = document.getElementById('h002');
  const img003 = document.getElementById('h003');
  const subImages = [
    await subBG(img001, img002),
    await subBG(img002, img003),
    await subBG(img003, img001),
  ];
  const area = [
    getCroppingDimensions(subImages[0]),
    getCroppingDimensions(subImages[1]),
    getCroppingDimensions(subImages[2]),
  ];
  const croppingDimension = maxCroppingDimensions(...area);
  console.log(croppingDimension);
  const cropSrc001 = await getCroppedImageDataURL(img001, croppingDimension);
  const cropSrc002 = await getCroppedImageDataURL(img002, croppingDimension);
  this.setState({
    subSrc: getDataURL(subImages[0]),
    cropSrc001,
    cropSrc002,
  });
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

const getCroppedImageDataURL = async (image, cropArea) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const { width, height } = await imageDimensions(image);
  canvas.width = width;
  canvas.height = height;
  context.drawImage(
    image,
    cropArea.x, cropArea.y, cropArea.width, cropArea.height,
    0, 0, width, height
  );
  return canvas.toDataURL('image/png');
};

const maxCroppingDimensions = (...area) => {
  const finalDimension = area.reduce((prevDimension, nextDimension) => ({
    x: Math.min(prevDimension.x, nextDimension.x),
    y: Math.min(prevDimension.y, nextDimension.y),
    rightBottom: {
      x: Math.max(prevDimension.rightBottom.x, nextDimension.rightBottom.x),
      y: Math.max(prevDimension.rightBottom.y, nextDimension.rightBottom.y),
    },
  }));
  return {
    ...finalDimension,
    width: finalDimension.rightBottom.x - finalDimension.x,
    height: finalDimension.rightBottom.y - finalDimension.y,
  };
};
