const fs = require('fs');

function getDomains(plans, planType) {
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
        console.log('getting ' + planType + ' ' + plan.plan + ' unique domains...');
        let theseDomains = plan.accounts
          .reduce((a, account, index, array) => {
            return a.concat(account.domains);
          }, []);

        return acc.concat(theseDomains);
      }, [])
    )
  );

  domains = domains.map((domain, index, array) => {
    let obj = new Object();

    obj.domain = domain;
    obj.total_accounts = 0;

    return obj;
  });

  plans.forEach(plan => {
    console.log('getting ' + planType + ' ' + plan.plan + ' total accounts...');
    plan.accounts.forEach((account, index, array) => {

      let uniqueDomains = Array.from(new Set(account.domains));

      uniqueDomains.forEach(domain => {
        let thisDomain = domains.find(d => d.domain === domain);
        thisDomain.total_accounts ++;
      });
    });
  });

  domains = domains.sort((a, b) => b.total_accounts - a.total_accounts);

  fs.writeFile('./betweenputs/' + planType + '-domains.json', JSON.stringify(domains, null, 2), (err) => {
    if (err) throw err;
    console.log(planType + ' domains written');
    console.log(domains.length + ' unique ' + planType + ' domains');
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

getDomains(personalPlans, 'personal');
getDomains(orgPlans, 'org');
