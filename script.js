let sortData = [];
let sizeOfArray = 40;
let max = 150;
let min = 2;
let delay = 500;
let histogram = document.querySelector(".histogram");
let bubbleSortBut = document.getElementById("mybut1");
let selectSortBut = document.getElementById("mybut2");
let insertionSortBut = document.getElementById("mybut3");
let mergeSortbut = document.querySelector('#mybut4');
let quickSortBut = document.querySelector('#mybut5');
let allButt = [bubbleSortBut, selectSortBut, insertionSortBut, mergeSortbut, quickSortBut];

let arrSpeed = document.querySelector("#a-speed");

let generateNewArray = document.querySelector("#a-generate");
generateNewArray.addEventListener("click", generatedArray);

// preloaded arraya is created
for (let i = 0; i < sizeOfArray; i++) {
    sortData.push(Math.floor(Math.random() * (max - min) + min));
}
createHistogram();
////

function generatedArray() {
    let newArr = [];
    for (let i = 0; i < sizeOfArray; i++) {
        newArr.push(Math.floor(Math.random() * (max - min) + min));
    }
    console.log(newArr);
    sortData = newArr;
    clearHistogram();
    createHistogram();
}

function clearHistogram() {
    let allbars = document.querySelectorAll(".div-array");
    for (let i = 0; i < allbars.length; i++) {
        let aBar = allbars[i];
        aBar.remove();
    }

}
function createHistogram() {
    for (let i = 0; i < sortData.length; i++) {
        let arrayDiv = document.createElement("div");
        arrayDiv.classList.add("div-array");
        arrayDiv.style.height = sortData[i] * 2 + "px";
        histogram.append(arrayDiv);
    }
}

arrSpeed.addEventListener('input', function () {
    let speed = arrSpeed.value;
    if (speed == 1) {
        delay = 400;
    }
    else if (speed == 2) delay = 300;
    else if (speed == 3) delay = 200;
    else if (speed == 4) delay = 100;
    else delay = 10;

})


async function bubbleSort() {
    disableButton();
    for (let i = 0; i < sortData.length; i++) {
        for (j = 0; j < sortData.length - i - 1; j++) {
            await selectDiv(j, j + 1);
            if (sortData[j] > sortData[j + 1]) {
                await wait();
                await swapB(sortData, j, j + 1);
                await wait();
            }
            await unselectDiv(j, j + 1);
        }
        await finalPosDiv(i);
        await wait();
    }
    enableButton();
}

bubbleSortBut.addEventListener("click", bubbleSort);
selectSortBut.addEventListener("click", selectionSort);
insertionSortBut.addEventListener("click", insertionSort);


async function swapB(arr, idx, jdx) {
    return new Promise(function (scb, fcb) {
        let temp = arr[idx];
        arr[idx] = arr[jdx];
        arr[jdx] = temp;
        let height = histogram.children[idx].style.height;
        histogram.children[idx].style.height = histogram.children[jdx].style.height;
        histogram.children[jdx].style.height = height;
        scb();
    });
}
async function selectDiv(idx, jdx) {
    return new Promise(function (scb, fcb) {
        let iBar = histogram.children[idx];
        let jBar = histogram.children[jdx];
        iBar.style.backgroundColor = "yellow";
        jBar.style.backgroundColor = "yellow";
        scb();
    });
}
async function unselectDiv(idx, jdx) {
    return new Promise(function (scb, fcb) {
        let iBar = histogram.children[idx];
        let jBar = histogram.children[jdx];
        iBar.style.backgroundColor = "black";
        jBar.style.backgroundColor = "black";
        scb();
    });
}
async function wait() {
    return new Promise(function (scb, fcb) {
        setTimeout(function () {
            scb();
        }, delay)
    });
}
async function finalPosDiv(idx) {
    return new Promise(function (scb, fcb) {
        let iBar = histogram.children[sortData.length - 1 - idx];
        iBar.style.backgroundColor = "green";
        scb();
    });
}

async function selectionSort() {
    disableButton();
    for (let i = 0; i < sortData.length; i++) {
        let min = i;
        await selectOneDiv(i, "yellow");
        for (let j = i + 1; j < sortData.length; j++) {
            await selectOneDiv(j, "red");
            if (sortData[j] < sortData[min]) {
                min = j;
            }
            await wait();
            await selectOneDiv(j, "black");
        }
        await wait();
        if (min != i) {
            await wait();
            await swapB(sortData, min, i);
        }
        await selectOneDiv(min, "black");
        await selectOneDiv(i, "green");
    }
    enableButton();
}

async function selectOneDiv(idx, color) {
    return new Promise(function (scb, fcb) {
        let iBar = histogram.children[idx];
        iBar.style.backgroundColor = color;
        scb();
    });
}

function disableButton() {
    for (let i = 0; i < allButt.length; i++) {

        let button = allButt[i];

        button.disabled = true;
    }
}

function enableButton() {
    for (let i = 0; i < allButt.length; i++) {
        let button = allButt[i];
        button.disabled = false;
    }
}


async function insertionSort() {
    disableButton();
    for (let i = 1; i < sortData.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (sortData[j] > sortData[j + 1]) {
                await wait();
                await selectOneDiv(j, "yellow");
                await selectOneDiv(j + 1, "yellow");
                await swapB(sortData, j, j + 1);
                await wait();
                await selectOneDiv(j + 1, "black");
                await selectOneDiv(j, "green");
            }
            else {
                await selectOneDiv(j, "green");
                break;
            }
            if (j == 0) await selectOneDiv(j, "green");
        }
    }
    enableButton();
}

mergeSortbut.addEventListener("click", function () {
    mergeSort(sortData, 0, sortData.length - 1);
    console.log(sortData);

})
async function mergeSort(sortData, l, r) {
    if (l < r) {
        let m = parseInt(l + (r - l) / 2);
        await mergeSort(sortData, l, m);
        await mergeSort(sortData, m + 1, r);
        await mergeTwoSortedArr(sortData, l, m, r);
    }
}
async function mergeTwoSortedArr(arr, start, mid, end) {
    let start2 = mid + 1;
    if (arr[mid] <= arr[start2]) {
        return;
    }
    while (start <= mid && start2 <= end) {
        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let idx = start2;
            while (idx != start) {
                //arr[idx]=arr[idx-1];
                await selectOneDiv(idx, "yellow");
                await selectOneDiv(idx - 1, "yellow");
                await wait();
                await swapB(arr, idx, idx - 1);
                await wait();
                await selectOneDiv(idx, "black");
                await selectOneDiv(idx - 1, "black");
                idx--;
            }
            //arr[start]=value;
            start++;
            mid++;
            start2++;
        }
    }
}


quickSortBut.addEventListener("click", function () {
    quickSort(sortData, 0, sortData.length - 1);
    console.log(sortData);
})
async function quickSort(sortData, lo, hi) {
    if (lo < hi) {
        let pivot = sortData[hi];
        let pi = await partition(sortData, pivot, lo, hi);
        await quickSort(sortData, lo, pi - 1);
        await quickSort(sortData, pi + 1, hi);
    }
}
async function partition(sortData, pivot, lo, hi) {
    let i = lo;
    let j = lo;
    while (i <= hi) {
        if (sortData[i] <= pivot) {
            await selectOneDiv(i, "yellow");
            await selectOneDiv(j, "yellow");
            await wait();
            await swapB(sortData, i, j);
            await wait();
            await selectOneDiv(i, "black");
            await selectOneDiv(j, "black");
            i++;
            j++;
        } else {
            i++;
        }
    }
    return (j - 1);
}




