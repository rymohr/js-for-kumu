const fs = require('fs');

function separatePlans(accounts, accountType) {
  console.log(accounts.length + ' total accounts');

  let plans = Array.from(
    new Set(
      accounts.map(account => account.plan_id)
    )
  );

  plans = plans.map(plan => {
    let obj = new Object();

    obj.plan = plan;
    obj.accounts = accounts.filter(account => account.plan_id === plan);

    return obj;
  });

  plans.forEach(plan => {
    console.log(plan.accounts.length + ' ' + plan.plan + ' plans');
  });

  fs.writeFile('./betweenputs/' + accountType + '-plans.json', JSON.stringify(plans, null, 2), (err) => {
    if(err) throw err;
    console.log(accountType + ' plans written');
  });
}

let personalAccounts = JSON.parse(
  fs.readFileSync('./betweenputs/personal.json', 'utf8')
);

let orgAccounts = JSON.parse(
  fs.readFileSync('./inputs/org.json', 'utf8')
);

separatePlans(personalAccounts, 'personal');

separatePlans(orgAccounts, 'org');
