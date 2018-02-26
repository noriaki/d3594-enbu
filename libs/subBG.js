import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';

const trunc = x => (x < 0 ? Math.ceil(x) : Math.floor(x));

const subBG = async (prevImage, nextImage) => {
  const prevImageData = await getImageData(prevImage);
  const nextImageData = await getImageData(nextImage);
  if (prevImageData.width !== nextImageData.width ||
      prevImageData.height !== nextImageData.height) {
    throw new Error('Not same dimensions (width, height)');
  }
  const { chunkedData, width, height } = prevImageData;
  const nextImageChunkedData = nextImageData.chunkedData;
  const subtractedImageDataArray = chunkedData.map((prevPixel, index) => {
    const nextPixel = nextImageChunkedData[index];
    const same = prevPixel.every((point, i) => point === nextPixel[i]);
    return same ? [0, 0, 0, 255] : [0, 0, 0, 0];
  });
  return new ImageData(
    new Uint8ClampedArray(flatten(subtractedImageDataArray)), width, height
  );
};
export default subBG;

const getImageData = async (image) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const { width, height } = await imageDimensions(image);
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, width, height);
  imageData.chunkedData = chunk(imageData.data, 4);
  return imageData;
};

const imageDimensions = image => new Promise((resolve) => {
  const img = new Image();
  function onLoadImage() {
    resolve({
      width: this.width,
      height: this.height,
    });
  }
  img.onload = onLoadImage;
  img.src = image.src;
});
