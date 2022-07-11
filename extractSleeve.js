function colorArrayToHex(arr)
{
	return (arr[0]<<16) + (arr[1]<<8) + arr[2];
}

function extractPixel(colorArray, index)
{
	return [
		colorArray[index * 4],
		colorArray[index * 4 + 1],
		colorArray[index * 4 + 2],
		colorArray[index * 4 + 3]
	];
}

function extractSleeveColors(colorArray, width, height)
{
	function getPixelIndex(index)
	{
		let x = (index % 16) * 8;
		let y = Math.floor(index / 16) * 32;
		return y * width + x;
	}

	function extractSleeveColor(index, yOffset=0)
	{
		const pixelIdx = getPixelIndex(shirtIdx) + yOffset;
		const dyePixelIdx = pixelIdx + 128;

		let [,,,a] = extractPixel(colorArray, dyePixelIdx);
		if(a > 0) {
			return colorArrayToHex( extractPixel(colorArray, dyePixelIdx) );
		}
		return colorArrayToHex( extractPixel(colorArray, pixelIdx) );
	}

	const result = [];
	let shirtIdx = 0;
	while(getPixelIndex(shirtIdx) * 4 < colorArray.length) {
		result[shirtIdx] = {
			light : extractSleeveColor(shirtIdx, 2*width),
			mid : extractSleeveColor(shirtIdx, 3*width),
			dark : extractSleeveColor(shirtIdx, 4*width)
		};
		shirtIdx++;
	}
	return result;
}

export { extractSleeveColors };