let str_test="this is a test string";
for (let i=0;i<str_test.length;i++)
if ([' ','\r','\n','\t'].indexOf(str_test[i])!==-1) console.log("found at " + i);

