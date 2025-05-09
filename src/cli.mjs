export const getArgsFromCli = () => {
  if (process.argv.length !== 4) {
    throw new Error("the number of arguments is not correct");
  }
  const path = process.argv[2];
  const iterStr = process.argv[3];
  if (!(typeof iterStr === "string") || !iterStr?.match(/^[0-9]+$/)) {
    throw new Error("the iter parameter is not correct");
  }
  const iter = parseInt(iterStr);
  if (isNaN(iter) || iter < 0) {
    throw new Error("the iter parameter is not correct");
  }
  const typeOfFile = path.split("/").pop().split(".").pop();
  if (typeOfFile !== "rle") {
    throw new Error("the file type is not correct");
  }
  return {
    path,
    iter,
  };
};
