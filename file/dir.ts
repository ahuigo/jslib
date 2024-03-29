/*
await Deno.mkdir("new_dir");
await Deno.mkdir("./dir/dir2/subdir", { recursive: true });
await Deno.remove("./new_dir");
await Deno.remove("./dir", { recursive: true });
Deno.mkdirSync("new_dir");
Deno.removeSync("new_dir");
*/

// Deno.env
export async function exists(filename: string): Promise<boolean> {
  try {
    Deno.statSync(filename);
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
};


export function cwd(): string {
  return Deno.cwd();
}

// Deno.chdir(".")
export function chdirModule() {
  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());
}

// readDir
export function readDirSync(dir: string) {
  return Deno.readDirSync(dir);
}
// walkDir
import{ ensureDir, walk as walkDir } from "https://deno.land/std@0.176.0/fs/mod.ts";
export function walk(dir: string) {
  return walkDir(dir)
}
Deno.test("walk dir", async () => {
  console.log("Deno.cwd():",Deno.cwd())
  for await (const entry of walk('.')) {
    if (entry.isFile) {
      console.log(entry.path)
      break;
    }
  }
})


// join path
import {
  dirname,
  relative as relativePath,
  join as joinPath
} from "https://deno.land/std/path/mod.ts";
import {join as joinWin} from "https://deno.land/std/path/win32.ts";
export function join(...paths: string[]) {
    return joinPath(...paths);
}

Deno.test(
  "test relativePath/join/walk...",
  () => {
  console.log(relativePath('/a/b/c/d.txt', '/a/b/')) // ../..
  console.log(relativePath('/a/b','/a/b/c/d.txt' )) // c/d.txt
  console.log(join('/a/b', './a.txt')) // /a/b/a.txt
  console.log(join('/a/b', 'a.txt')) // /a/b/a.txt
  console.log(join('/a/b', '/')) // /a/b/
  console.log(join('/a/b', '..')) // /a
  console.log(joinWin('/a/b', '/')) // \a\b\
})

//resolve path
export function resolveImport(path:string) {
    return import.meta.resolve(path) //./a.ts
}
import{ normalize, resolve, toFileUrl, } from "https://deno.land/std@0.176.0/path/mod.ts";
Deno.test("resolve:", () => {
  console.log("to fileURL:",toFileUrl('/home/www/jslib/a.ts')); // URL(file:///home/www/jslib/a.ts)
  console.log("fileurl:",import.meta.resolve('./a.ts')); // file:///home/www/jslib/a.ts
  console.log("filepath:",resolve('./a.ts')); // /home/www/jslib/a.ts
  console.log("filepath:",resolve('../')); // /home/www
  console.log("normal:",normalize('./a.ts')); // a.ts
  console.log("normal:",normalize('a.ts')); // a.ts
  console.log("normal:",normalize('..')); // ..
})


