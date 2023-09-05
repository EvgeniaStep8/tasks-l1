let i = 0;

let argument = `<script>1;document.write(1)</` + `script>`;
// let argument = document.write(1);
const write = () => {
  document.write(argument);
  //argument = `<script>1;document.write(${argument})</` + `script>`;
  i++;
  write();
};

try {
  write();
} catch {
  console.log(i);
}

// 10452 ???
