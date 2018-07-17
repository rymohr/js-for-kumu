const fs = require('fs');

function findOrgs(personalPlans, personalDomains, orgDomains, domainAccountsMin, domainAccountsMax) {
  /*
  Ignore people who
    1) Share a domain with an org
    AND/OR
    2) Do not share a domain name with many other personal accounts
  */

  function isNotOrgDomain(domain) {
    return orgDomains.findIndex(d => d.domain === domain) === -1;
  }

  personalDomains = personalDomains.filter(d => d.total_accounts > domainAccountsMin && d.total_accounts < domainAccountsMax);

  function isWithinDomainAccountBounds(domain) {
    return personalDomains.findIndex(d => d.domain === domain) > -1;
  }

  personalPlans = personalPlans.map(plan => {
    plan.accounts = plan.accounts.filter(account => {
      return account.domains.every(domain => isNotOrgDomain(domain) && isWithinDomainAccountBounds(domain));
    });

    return plan;
  });


  /*
  List free and paid accounts under their respective domains
  */

  let freeAccounts = personalPlans
    .filter(plan => /free/.test(plan.plan))
    .reduce((acc, plan) => acc.concat(plan.accounts), []);

  let paidAccounts = personalPlans
    .filter(plan => (!/free/.test(plan.plan)))
    .reduce((acc, plan) => acc.concat(plan.accounts), []);

  console.log(freeAccounts.length + ' free accounts');
  console.log(paidAccounts.length + ' paid accounts');

  personalDomains = personalDomains.map(domain => {
    domain.free_accounts = [];
    domain.paid_accounts = [];

    domain.total_free_accounts = 0;
    domain.total_paid_accounts = 0;

    return domain;
  });

  freeAccounts.forEach(account => {
    account.domains.forEach(domain => {
      let thisDomain = personalDomains.find(d => d.domain === domain);
      if(thisDomain) {
        thisDomain.free_accounts.push({'email': account.email, 'description': account.description, 'plan': account.plan_id});
        thisDomain.total_free_accounts ++;
      }
    });
  });

  paidAccounts.forEach(account => {
    account.domains.forEach(domain => {
      let thisDomain = personalDomains.find(d => d.domain === domain);
      if(thisDomain) {
        thisDomain.paid_accounts.push({'email': account.email, 'description': account.description, 'plan': account.plan_id});
        thisDomain.total_paid_accounts ++;
      }
    });
  });

  personalDomains = personalDomains
    .sort((a, b) => b.total_free_accounts - a.total_free_accounts)
    .sort((a, b) => b.total_paid_accounts - a.total_paid_accounts);

  console.log(personalDomains.length + ' possible orgs');

  let today = new Date();
  let date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

  fs.writeFile(
    './outputs/' + date + '-possible-orgs-max-' + domainAccountsMax + '-min-' + domainAccountsMin + '-users.json',
    JSON.stringify(personalDomains, null, 2),
    (err) => {
      if (err) throw err;
      console.log('possible orgs max ' + domainAccountsMax + ' min ' + domainAccountsMin + ' users written');
    }
  );
}

let personalPlans = JSON.parse(
  fs.readFileSync('./betweenputs/personal-plans-with-domains.json', 'utf8')
);

let personalDomains = JSON.parse(
  fs.readFileSync('./betweenputs/personal-domains.json', 'utf8')
);

let orgDomains = JSON.parse(
  fs.readFileSync('./betweenputs/org-domains.json', 'utf8')
);

findOrgs(personalPlans, personalDomains, orgDomains, 4, 12);
