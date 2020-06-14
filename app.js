//var express = require('express');
const fs = require('fs');
const { idriSortSchema,  buildSchema, printSchema} = require('graphql')

const schema = fs.readFileSync('../../engr_storefront/schema.graphql', { encoding: 'utf-8'})
const schemaV2 = buildSchema(schema)
const sortedSchema = idriSortSchema(schemaV2)

const schemaText = `# This file was generated based on ".graphqlconfig". Do not edit manually.

schema {
  query: Query
  mutation: Mutation
}

`;

fs.writeFile('generated/schema.graphql', schemaText.concat(printSchema(sortedSchema)), function (err) {
  if (err) throw err;
  console.log('Writing file: "generated/schema.graphql" ... Done!');
  fs.copyFile('generated/schema.graphql', '../../engr_storefront/schema.graphql', (error) => {
    if (error) throw error;
    console.log('File "generated/schema.graphql" was copied to destination');
  });
});

/*
console.log("-----------------------------------------------------------------");

console.log(schemaV2);

fs.writeFile('generated/schema_unsorted.graphql', printSchema(schemaV2), function (err) {
  if (err) throw err;
  console.log('Saved!');
});

/*
var app = express();
app.get('/', function (req, res) {
  

  res.send("Schema sorted!");
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
*/