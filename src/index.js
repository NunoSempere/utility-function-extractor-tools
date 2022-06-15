// IMPORTS
import * as fs from "fs";
import { mergeSort } from "./mergeSort.js";
import { findPaths } from "./findPaths.js";
import { aggregatePaths } from "./aggregatePaths.js";

// DEFS
const inputLinksFilePath = "./input/input-links.json";
const inputListFilePath = "./input/input-list.json";
const outputFilePath = "./output/output.json";

// MAIN
async function main() {
  // read file
  const inputLinksAsString = fs.readFileSync(inputLinksFilePath);
  const inputListAsString = fs.readFileSync(inputListFilePath);
  const links = JSON.parse(inputLinksAsString);
  const list = JSON.parse(inputListAsString);

  // process file
  // const sources = links.map((link) => link.source);
  // const targets = links.map((link) => link.target);
  // const list = [...new Set([...sources, ...targets])];
  // process in mergeSort

  let mergeSortOutput = mergeSort({ list, links });
  console.log("Output: ");
  console.log(mergeSortOutput);
}
main();
