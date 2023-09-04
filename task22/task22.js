let i = 0;

// let argument = "<script>document.write(1)</" + "script>";
let argument = document.write(1);
const write = () => {
  document.write(argument);
  argument = document.write(argument);
  i++;
  write();
};

try {
  write();
} catch {
  console.log(i);
}

// 10452 ???
