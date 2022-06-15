const errorMsg = "No link found; unable to proceed";

function isFirstElementGreater(links, element1, element2) {
  const relevantComparisons = links.filter(
    (link) =>
      (link.source == element1.name && link.target == element2.name) ||
      (link.source == element2.name && link.target == element1.name)
  );
  if (relevantComparisons.length == 0) {
    // console.log(element1, "vs", element2);
    return errorMsg;
  } else {
    const firstLink = relevantComparisons[0];
    // console.log(firstLink);
    const firstElementFirst =
      firstLink.source == element1.name && firstLink.target == element2.name
        ? true
        : false;
    const distanceIsGreaterThanOne = Number(firstLink.distance) > 1;
    const answer =
      (firstElementFirst && !distanceIsGreaterThanOne) ||
      (!firstElementFirst && distanceIsGreaterThanOne);
    return !answer;
  }
}

function merge(links, left, right) {
  let sortedArr = []; // the sorted elements will go here

  while (left.length && right.length) {
    // insert the biggest element to the sortedArr
    let link = isFirstElementGreater(links, left[0], right[0]);
    if (link == errorMsg) {
      console.group();
      console.log({ left, right });
      console.groupEnd();
      return errorMsg;
    } else if (link) {
      // left[0] > right[0]
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }

  // use spread operator and create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right]; // if they don't have the same size, the remaining ones will be greater than the ones before
}

export function mergeSort({ list, links }) {
  // console.log({ l: list.length });
  if (list == errorMsg) {
    return errorMsg;
  }
  const half = list.length / 2;

  // the base case is list length <=1
  if (list.length <= 1) {
    return list;
  }

  const left = list.slice(0, half); // the first half of the list
  const right = list.slice(half, list.length); // Note that splice is destructive.
  let orderedFirstHalf = mergeSort({ list: left, links });
  let orderedSecondHalf = mergeSort({ list: right, links });
  if (orderedFirstHalf != errorMsg && orderedSecondHalf != errorMsg) {
    let result = merge(links, orderedFirstHalf, orderedSecondHalf);
    return result;
  } else {
    return errorMsg;
  }
}
