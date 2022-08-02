const fs = require('fs');
const readline = require('readline');

function solution(input) {
    let result = "invalid";

    let pair = {
        "{":"}",
        "(":")"
    };

    let stack = [];
    for (const ch of input) {
        if (pair[ch]) {
            stack.push(ch);
            result = "valid"
        } else {
            if (pair[stack.pop()] !== ch) {
                result = "invalid"
            }
        }
    }

    if (stack.length != 0) {
        result = "invalid";
    }


    return result;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('test.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let number = 0;
  for await (const line of rl) {
    number += 1;
    let data = line.split(' ');
    let result = solution(data[0])
    let expected = data[1];
    if (result !== expected) {
        throw Error(`Failed test: expected ${expected} got: ${result} input: '${data[0]}'`)
    }
  }
}

processLineByLine();

