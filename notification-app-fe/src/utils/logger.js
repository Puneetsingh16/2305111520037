export async function Log(stack, level, packageName, message) {
  console.log({
    stack,
    level,
    packageName,
    message,
  });
}