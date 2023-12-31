import _ from "lodash";

export const oneSolve = (l: number, h: number) => {
  let sum = Array(l).fill(0);
  let n = 0;
  for (let i = 0; i < l - h + 1; i++) {
    let tempCan = Array(l).fill(0);
    for (let j = 0; j < h; j++) {
      tempCan[i + j] = 1;
      sum[i + j] += tempCan[i + j];
    }
    n += 1;
  }
  let result = _.map(sum, (item) => (item === n ? 1 : 0));
  return result;
};

export const twoSolve = (l: number, h: number[]) => {
  let sum = Array(l).fill(0);
  let n = 0;
  for (let i = 0; i < l - h[1] - h[0]; i++) {
    for (let j = i + h[0] + 1; j < l - h[1] + 1; j++) {
      let tempCan = Array(l).fill(0);
      for (let ii = 0; ii < h[0]; ii++) {
        tempCan[i + ii] = 1;
      }
      for (let ii = 0; ii < h[1]; ii++) {
        tempCan[j + ii] = 1;
      }
      for (let ii = 0; ii < l; ii++) {
        sum[ii] += tempCan[ii];
      }
      n += 1;
    }
  }

  let result = _.map(sum, (item) => (item === n ? 1 : 0));
  return result;
};

export const lineSolve = (l: number, h: number[], hint_can: number[]) => {
  let sum = Array(l).fill(0);
  let n = 0;
  let tempCan = Array(l).fill(0);
  for (let m = 0; m < Math.pow(2, l); m++) {
    ///////
    let canDum = [0, ...tempCan, 0];
    let ans = [];
    let summ = 0;
    if (new Set(tempCan).size === 1 && new Set(tempCan).has(0)) {
      ans.push(summ);
    }
    for (let i = 1; i < canDum.length; i++) {
      summ += canDum[i];
      if (canDum[i] === 1 && canDum[i + 1] === 0) {
        ans.push(summ);
        summ = 0;
      }
    }
    if (_.isEqual(ans, h)) {
      let ok = [];
      let ban = [];
      for (let i = 0; i < l; i++) {
        if (hint_can[i] === 1) ok.push(i);
        else if (hint_can[i] === -1) ban.push(i);
      }
      let okSw = 1;
      let banSw = 1;
      _.map(ok, (item, idx) => {
        if (tempCan[item] !== 1) okSw = 0;
      });
      _.map(ban, (item, idx) => {
        if (tempCan[item] !== 0) banSw = 0;
      });
      if (okSw * banSw === 1) {
        for (let i = 0; i < l; i++) {
          sum[i] += tempCan[i];
        }
        n += 1;
      }
    }
    ////
    tempCan[0] += 1;
    for (let k = 0; k < l - 1; k++) {
      if (tempCan[k] === 2) {
        tempCan[k] = 0;
        tempCan[k + 1] += 1;
      }
    }
  }

  let result = _.map(sum, (item) => (item === n ? 1 : item === 0 ? -1 : 0));
  return result;
};

export const okBanSolve = () => {
  const hintCan = [1, 0, 0, 0, 0, -1, 0, 0, 0, 0];
  let l = hintCan.length;
  let ok = [];
  let ban = [];
  for (let i = 0; i < l; i++) {
    if (hintCan[i] === 1) ok.push(i);
    else if (hintCan[i] === -1) ban.push(i);
  }
  console.log(ok, " : ", ban);
};

// export const bonusSolve = () => {
//     const hintCan = [1, 0, 0, 0, 0, -1, 0, 0, 0, 0];

//     let ok = [];
//     let ban = [];
//     for (let i = 0; i < l; i++) {
//       if (hintCan[i] === 1) ok.push(i);
//       else if (hintCan[i] === -1) ban.push(i);
//     }
//     console.log(ok, " : ", ban);

//   let tempCan = [1, 0, 1, 1, 0, 0, 1, 1, 1, 1];
//   let okSw = 1;
//   let banSw = 1;
// //   for(let i = 0; i<k)
// };

export const testSolve = () => {
  const tempCan = [1, 0, 1, 1, 0, 1, 1, 1, 1];
  let canDum = [0, ...tempCan, 0];
  let ans = [];
  let summ = 0;
  if (new Set(tempCan).size === 1 && new Set(tempCan).has(0)) {
    ans.push(summ);
  }
  for (let i = 1; i < canDum.length; i++) {
    summ += canDum[i];
    if (canDum[i] === 1 && canDum[i + 1] === 0) {
      ans.push(summ);
      summ = 0;
    }
  }

  console.log(ans);
};
