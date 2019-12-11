const Operation = require("./operation");

const initial = new Operation();
initial.insert("he1lo");
const o0 = initial.getOperation();
o0.unshift({ operator: "timestamp", value: 100 });

function inclusionTransform(o1, o2 = o0) {
  const t1 = o1.shift();
  const t2 = o2.shift();

  //o1의 포지션이 o2보다 작은 경우, 즉 앞에 있는 경우
  if (o1[0].value < o2[0].value) return o1;
  //o1의 포지션이 o2와 같으면서 타임스탬프(우선순위)가 빠른 경우
  if (o1[0].value === o2[0].value && t1.value < t2.value) return o1;
  //o1의 포지션이 o2보다 큰 경우, 즉 뒤에 있는 경우
  let index = 0,
    sum = 0,
    offset = 0;
  while (o1[0].value > sum) {
    const operation = o2[index++];
    switch (operation.operator) {
      case "retain":
        sum += operation.value;
        // offset -= operation.value;
        break;
      case "delete":
        sum += operation.value;
        offset -= operation.value;
        break;
      case "insert":
        sum += operation.value.length;
        // offset += operation.value.length;
        break;
    }
  }
  o1[0].value += offset;
  return o1;
}
function merge(operations, str) {
  let start = 0,
    end = undefined,
    preValue = "",
    nextValue = "";

  operations.forEach(operation => {
    switch (operation.operator) {
      case "retain":
        start += operation.value;
        break;
      case "delete":
        end = start + operation.value;
        preValue = str.slice(0, start);
        nextValue = str.slice(end);
        str = preValue + nextValue;
        break;
      case "insert":
        preValue = str.slice(0, start);
        nextValue = str.slice(start);
        str = preValue + operation.value + nextValue;
        break;
    }
  });

  return str;
}

module.exports = { inclusionTransform, merge };
