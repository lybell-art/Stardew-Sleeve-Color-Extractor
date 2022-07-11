import { extractSleeveColors } from "./extractSleeve.js";
import { readFile, writeFile } from 'node:fs/promises';
import { decode } from "fast-png";

function to16Bit(num)
{
	return `0x${num.toString(16).toUpperCase().padStart(6, "0")}`;
}

function stringify(json)
{
	return JSON.stringify(json).replaceAll("},{", "},\n\t{");
}

const sheet = await readFile("./shirts.png");
const {width, height, data} = await decode(sheet);
const result = extractSleeveColors(data, width, height);

const resultDebug = result.map( ( {light, mid, dark} )=>{
	return {
		light:to16Bit(light),
		mid:to16Bit(mid),
		dark:to16Bit(dark)
	}
})

const resultJson = stringify(result);
await writeFile('./sleeveData.json', resultJson);

console.log("extract completed!");

