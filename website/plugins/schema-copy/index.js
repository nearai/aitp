const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function schemaCopyPlugin() {
  return {
    name: 'schema-copy-plugin',
    async loadContent() {
      // Get all schema.json files from capabilities directory
      const schemaFiles = glob.sync('../../capabilities/**/schema.json', {
        cwd: __dirname,
        absolute: true
      });

      return schemaFiles;
    },
    async contentLoaded({content, actions}) {
      const {createData, addRoute} = actions;
      
      // For each schema file found
      content.forEach(sourceFile => {
        // Get the relative path from capabilities dir
        const relativePath = path.relative(
          path.resolve(__dirname, '../../capabilities'),
          sourceFile
        );
        
        // Create the destination path in static dir
        const destPath = path.join(
          path.resolve(__dirname, '../../static/capabilities'),
          relativePath
        );

        // Ensure the destination directory exists
        fs.mkdirSync(path.dirname(destPath), {recursive: true});
        
        // Copy the file
        fs.copyFileSync(sourceFile, destPath);
      });
    }
  };
};
