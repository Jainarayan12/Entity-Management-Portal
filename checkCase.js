import fs from "fs";
import path from "path";
import process from "process";

const checkImports = (directory) => {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      checkImports(filePath); // Recursive check for all folders
    }

    if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(filePath, "utf-8");
      const matches = content.match(/import .* from ['"]([^'"]+)['"]/g) || [];

      matches.forEach((match) => {
        const importPath = match.match(/['"]([^'"]+)['"]/)[1];
        const fullImportPath = path.resolve(directory, importPath);

        if (fs.existsSync(fullImportPath)) {
          const actualFileName = fs
            .readdirSync(path.dirname(fullImportPath))
            .find((f) => f.toLowerCase() === path.basename(fullImportPath).toLowerCase());

          if (actualFileName && actualFileName !== path.basename(fullImportPath)) {
            console.error(
               `Case Mismatch: "${importPath}" (Expected: "${actualFileName}") in ${filePath}`
            );
            process.exit(1); // Exit with an error to stop the build
          }
        }
      });
    }
  });
};

checkImports("./src")