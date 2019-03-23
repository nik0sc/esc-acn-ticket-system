//test function in Ticket Tables

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

describe("desc test suit1", () => {
  test("desc  result1", () => {
    expect(desc("a", "b")).toBe(0);
  })

});
describe("desc test suit2", () => {
  test("desc  result2", () => {
    expect(desc(1, 3)).toBe(0);
  })

});

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
// test with integer array
const a = new Array();
a[0]=3;
a[1]=2;
a[2]=1;
const b = new Array();
b[0]=1;
b[1]=2;
b[2]=3;
describe("sort test suit", () => {
  test("sort result", () => {
    expect(stableSort(a,function cmp(a,b)
    {
      return a - b
    })).toEqual(b);
  })
})
// test with string change the cmp

const c = new Array();
c[0]="a";
c[1]="c";
c[2]="b";
const d = new Array();
d[0]="a";
d[1]="b";
d[2]="c";
describe("sort test suit1", () => {
  test("sort result1", () => {
    expect(stableSort(c,function cmp(a,b)
    {
      if (a == b) return 0;
      return a < b ? -1 : 1;
    }) ).toEqual(d);
  })
})
// fail case
const m = new Array();
m[0]=3;
m[1]=2;
m[2]=1;
const n = new Array();
n[0]=2;
n[1]=1;
n[2]=3;
describe("sort test suit", () => {
  test("sort result", () => {
    expect(stableSort(m,function cmp(a,b)
    {
      return a - b
    })).toEqual(n);
  })
})
