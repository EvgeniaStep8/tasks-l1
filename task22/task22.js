let i = 0;

const write = () => {
  i++;
  document.write(`<script>${write()}</` + "script>");
};

try {
  write();
} catch {
  console.log(i);
}

// 10452 ???
