const fileStream = require('fs');

//Import docket json files here
const colors = require('../../assets/json/colors.json');
const zIndex = require('../../assets/json/z-index.json');

const variablesDir = './libs/assortments/src/lib/scss/settings/variables';

const intro = `// This is a generated file, do not edit directly. Use the 'npm run dockets' command to rebuild. \n\n`;

const generateColors = (color) => {
  let output = intro;
  color.map((item) => {
    const normalizedName = item.name.toLowerCase().replace(/\s/g, '');
    const normalizedAlias =
      item.alias && item.alias.toLowerCase().replace(/\s/g, '');

    if (item.variants) {
      item.variants.map((variant) => {
        output += `$color-${normalizedName}-${variant.name}: ${variant.color}; \n`;
        if (item.alias) {
          output += `$color-${normalizedAlias}-${variant.name}: $color-${normalizedName}-${variant.name}; \n`;

          if (variant.alias) {
            output += `$color-${normalizedAlias}-${variant.alias}: $color-${normalizedName}-${variant.name}; \n`;
          }
        }

        if (variant.alias) {
          output += `$color-${normalizedName}-${variant.alias}: $color-${normalizedName}-${variant.name}; \n`;
        }
      });
    } else {
      if (item.createDocket || item.createDocket === undefined) {
        output += `$color-${normalizedName}: ${item.color}; \n`;
        if (item.alias) {
          output += `$color-${normalizedAlias}:-${normalizedName}; \n`;
        }
      }
    }
  });
  return output;
};

const generateZindex = (z_index) => {
  let output = intro;
  Object.keys(z_index).map((item) => {
    output += `$z-index-${item}: ${zIndex[item]}; \n`;
  });
  return output;
};

fileStream.writeFile(
  `${variablesDir}/_colors.scss`,
  generateColors(colors),
  (error) => {
    if (error) throw error;
  }
);

fileStream.writeFile(
  `${variablesDir}/_z-index.scss`,
  generateZindex(zIndex),
  (error) => {
    if (error) throw error;
  }
);
