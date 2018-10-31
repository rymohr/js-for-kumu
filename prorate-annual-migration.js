let oldPlans = [
  {
    name: 'Large',
    private_projects: 50,
    price: 479000
  },
  {
    name: 'Medium',
    private_projects: 20,
    price: 287000
  },
  {
    name: 'Small',
    private_projects: 10,
    price: 171800
  },
  {
    name: 'Micro',
    private_projects: 5,
    price: 95000
  },
  {
    name: 'Nano',
    private_projects: 3,
    price: 56600
  },
  {
    name: 'Free',
    private_projects: 0,
    price: 0
  }
]

function calculateOldPrice(identifier) {
  if(typeof identifier === 'string') {
    return oldPlans.find(plan => plan.name === identifier).price
  } else if(typeof identifier === 'number') {
    return oldPlans.find(plan => plan.private_projects === identifier).price
  }
}

function calculateNewPrice(newTotalProjects, discount, waiveMembershipFee) {
  let membershipFee = (waiveMembershipFee) ? 0 : 1000 * .8 * 12 * (1 - discount)
  let projectFee = 2000 * newTotalProjects * .8 * 12 * (1 - discount)

  return membershipFee + projectFee
}

function calculatePercentTimeRemaining(planStart) {
  let today = new Date()
  let start = new Date(planStart)

  let startYear = start.getFullYear()
  let startMonth = start.getMonth()
  let startDate = start.getDate()

  let end = new Date(startYear + 1, startMonth, startDate)

  return (end - today) / (end - start)
}

function prorateAnnualMigration(planStart, oldPlanIdentifier, newTotalProjects, discount, waiveMembershipFee) {

  let percentTimeRemaining = calculatePercentTimeRemaining(planStart)

  let oldPrice = calculateOldPrice(oldPlanIdentifier)
  let newPrice = calculateNewPrice(newTotalProjects, discount, waiveMembershipFee)

  let proratedRefund = oldPrice * percentTimeRemaining

  let proratedTotal = Math.round(newPrice - proratedRefund)

  console.log(`oldPrice: ${oldPrice / 100}`)
  console.log(`newPrice: ${newPrice / 100}`)
  console.log(`proratedRefund: ${proratedRefund / 100}`)
  console.log(`proratedTotal: ${proratedTotal / 100}`)
}

prorateAnnualMigration('2018-03-19', 50, 50, 0, false)
