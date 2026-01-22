# Configuring typescript

tsc --init (will create a tsconfig.json file)

# Watch mode

tsc -w filename

# Working with multiple files

tsc

# the files compiler option

```json
{
  "compilerOptions": {},
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
}
```

# the include and exclude option

```json
{
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["src/dontTouch.js"]
}
```

# outDir option

Specify an output folder for all emitted files

```json
"outDir":"./dist"

```

# target option

Specifies the javascript version that typescript will compile to

```json
"target": "es6"

```
