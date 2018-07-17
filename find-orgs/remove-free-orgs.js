const fs = require('fs');

function removeFreeOrgs(freeJuniorAnnualAccounts, orgAccounts) {
  let personalAccounts = freeJuniorAnnualAccounts.filter((account, index, array) => {
    console.log(Math.round(index * 10000 / array.length) / 100 + '%');

    return orgAccounts.findIndex(a => a.description === account.description) === -1;
  });

  console.log(freeJuniorAnnualAccounts.length);
  console.log(personalAccounts.length);
  console.log(orgAccounts.length);

  fs.writeFile('./betweenputs/personal.json', JSON.stringify(personalAccounts, null, 2), (err) => {
    if(err) throw err;
    console.log('personal accounts written');
  });
}

let freeJuniorAnnualAccounts = JSON.parse(
  fs.readFileSync('./inputs/free-junior-annual.json', 'utf8')
);

let orgAccounts = JSON.parse(
  fs.readFileSync('./inputs/org.json', 'utf8')
);

filterOrgs(freeJuniorAnnualAccounts, orgAccounts);
