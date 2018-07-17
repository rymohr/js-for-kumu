const fs = require('fs');

function commonDomains(plans, planType) {
  plans = plans.map(plan => {
    plan.accounts = plan.accounts.map(account => {
      account.domains = account.email
        .split(/[,\s]/g)
        .filter(email => /\w/.test(email) === true)
        .map(email => email.substring(email.indexOf('@') + 1))
        .filter(domain => domain !== "qq.com");

      return account;
    }).filter(account => {
      return account.domains.length > 0;
    });

    return plan;
  });

  let domains = Array.from(
    new Set(
      plans.reduce((acc, plan) => {
        let theseDomains = plan.accounts
          .reduce((a, account, index, array) => {
            console.log('unique domains ' + plan.plan + ' ' + Math.round(index * 10000 / array.length) / 100 + '%');
            return a.concat(account.domains);
          }, []);

        return acc.concat(theseDomains);
      }, [])
    )
  );

  domains = domains.map((domain, index, array) => {
    // console.log('total accounts ' + Math.round(index * 10000 / array.length) / 100 + '%');
    let obj = new Object();

    obj.domain = domain;
    obj.total_accounts = 0;

    return obj;
  });

  plans.forEach(plan => {
    plan.accounts.forEach((account, index, array) => {
      console.log('total accounts ' + plan.plan + ' ' + Math.round(index * 10000 / array.length) / 100 + '%');

      let uniqueDomains = Array.from(new Set(account.domains));

      uniqueDomains.forEach(domain => {
        let thisDomain = domains.find(d => d.domain === domain);
        thisDomain.total_accounts ++;
      });
    });
  })

  console.log(domains.length + ' unique domains');

  domains = domains.sort((a, b) => b.total_accounts - a.total_accounts);

  fs.writeFile('./betweenputs/' + planType + '-domains.json', JSON.stringify(domains, null, 2), (err) => {
    if (err) throw err;
    console.log(planType + ' domains written');
  });

  fs.writeFile('./betweenputs/' + planType + '-plans-with-domains.json', JSON.stringify(plans, null, 2), (err) => {
    if (err) throw err;
    console.log(planType + ' plans with domains written');
  });
}

let personalPlans = JSON.parse(
  fs.readFileSync('./betweenputs/personal-plans.json', 'utf8')
);

let orgPlans = JSON.parse(
  fs.readFileSync('./betweenputs/org-plans.json', 'utf8')
);

commonDomains(personalPlans, 'personal');
commonDomains(orgPlans, 'org');
