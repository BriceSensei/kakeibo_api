import { glob } from "glob";

async function main() {
  const seedFiles = await glob("./database/seeders/*.seed.ts");

  for (let file of seedFiles) {
    let success = true;
    const { seed } = await import(`../${file}`);
    
    (await seed()) && (success = false);
    
    console.log(`${success?"\x1b[32m":"\x1b[31m"}${file.split("/").pop()} ${success ? "Done":"Failed"} !\x1b[0m`);
  }
}

main();