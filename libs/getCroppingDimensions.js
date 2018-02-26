import chunk from 'lodash.chunk';

const division = 100;
const trunc = x => (x < 0 ? Math.ceil(x) : Math.floor(x));

const getCroppingDimensions = ({ data, width }) => {
  const chunkedData = chunk(chunk(data, 4), width);
  return detectCropArea(chunkedData);
};
export default getCroppingDimensions;

const detectCropArea = (chunkedData) => {
  const { x, y } = detectCropStartPoint(chunkedData);
  const rightBottom = detectCropEndPoint(chunkedData, x, y);
  return {
    x,
    y,
    rightBottom,
    width: rightBottom.x - x,
    height: rightBottom.y - y,
  };
};

const isCoveredRange = index => (index < 45 || index > 55);
const detectCropStartPoint = (chunkedData, upperX, upperY) => {
  const width = chunkedData[0].length;
  const height = chunkedData.length;
  const result = { x: upperX || width, y: upperY || height };
  for (let yIndex = 0; yIndex < (upperY || height); yIndex += 1) {
    for (let x = 0; x <= division; x += 1) {
      if (isCoveredRange(x)) {
        const xIndex = trunc(width / division) * x;
        if (xIndex >= result.x || xIndex >= (upperX || width)) { break; }
        const pixel = chunkedData[yIndex][xIndex];
        if (pixel.join() === '0,0,0,0') {
          result.x = Math.min(result.x, xIndex);
          result.y = Math.min(result.y, yIndex);
        }
      }
    }
  }
  return result;
};
const detectCropEndPoint = (chunkedData, upperX, upperY) => {
  const width = chunkedData[0].length;
  const height = chunkedData.length;
  const { x, y } = detectCropStartPoint(
    reverseMatrix(chunkedData),
    upperX !== undefined ? reverseIndex(width, upperX) : upperX,
    upperY !== undefined ? reverseIndex(height, upperY) : upperY
  );
  return { x: reverseIndex(width, x), y: reverseIndex(height, y) };
};
const reverseIndex = (length, index) => length - index - 1;
const reverseMatrix = matrix => (
  [...matrix].reverse().map(row => [...row].reverse())
);
