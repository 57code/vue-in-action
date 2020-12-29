// 解析SCSS变量
export function parseScssVariables(variables) {
  const s1 = variables.split(":export")[1].trim();
  const s2 = s1.substring(1, s1.length - 1);
  const items = s2.split(";");
  const result = {};
  items.forEach(item => {
    const arr = item.trim().split(":");
    if (arr[1]) {
      result[arr[0]] = arr[1].trim();
    }
  });
  return result;
}
