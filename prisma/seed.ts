import { glob } from "glob";

async function main() {
  const seedFiles = (await glob("./prisma/seeders/*.seed.ts")).sort((a, b) => numb(a) < numb(b) ? -1 : 1);

  for (let file of seedFiles) {
    let success = true;
    const { seed } = await import(`../${file}`);
    
    (await seed()) && (success = false);
    
    console.log(`${success?"\x1b[32m":"\x1b[31m"}${file.split("/").pop()} ${success ? "Done":"Failed"} !\x1b[0m`);
  }
}

function numb(str: string): number {
  const parsed: number = parseInt(str.split("/").pop()?.split("_")[0] ?? "0");
  return parsed;
}

main();