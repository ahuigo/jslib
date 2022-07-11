
Deno.test("get env home", () => {
  const v = Deno.env.get('HOME');
  console.log(v);

});