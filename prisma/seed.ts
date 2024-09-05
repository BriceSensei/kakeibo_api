const orderSeed: Array<string> = [
  'curency',
  'icon',
  'category',
  'budgetTypes',
  'tips',
  'role',
  'users',
  'fbTokens',
  'subCategory',
  'alerts',
  'frequency',
  'budget',
  'epargnes',
  'userGroups',
  'relationUserGroupsOnUsers',
]

async function main() {
  for (const index in orderSeed) {

    const file = orderSeed[index];

    let success = true;
    const { seed } = await import(`./seeders/${file}.seed.ts`);

    (await seed()) && (success = false);

    console.log(`${success ? "\x1b[32m" : "\x1b[31m"}${file.split("/").pop()} ${success ? "Done" : "Failed"} !\x1b[0m`);
  }
}

function numb(str: string): number {
  str = str.replace(/\\/g, "/")
  const parsed: number = parseInt(str.split("/").pop()?.split("_")[0] ?? "0");
  return parsed;
}

main();