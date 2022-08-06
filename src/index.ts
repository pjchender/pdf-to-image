/* eslint-disable @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-floating-promises */

async function main() {
  /**
   * Bootstrap
   * */
  if (process.env.NODE_ENV === 'production') {
    // import the package if want to use the import alias, i.e., @/utils/foobar, in the production
    // @ts-expect-error: no types definition
    await import('module-alias/register');
  }

  /**
   * Import modules using import alias with dynamic import...
   */
  const { sleep } = await import('@/utils/sleep');
  const { example1 } = await import('@/examples/for-async-await');

  /**
   * Write the code below...
   */
  await sleep('sleep', 1000);
  await example1();
}

main().catch((error) => {
  console.error('[main] error', error);
});
