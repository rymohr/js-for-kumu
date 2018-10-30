function replaceWithSpace(match) {
  return `${match.slice(0, match.length - 1)} ${match[match.length - 1]}`
}

function addSpaces(description) {
  let regexp = /(?:^#+\S|\n#+[^#\s])/g

  return description.replace(regexp, replaceWithSpace)
}

function fixMaps(Maps) {
  Maps.models.forEach(model => {
    let fixedDescription = addSpaces(model.attributes.description)

    model.save({ description: fixedDescription })
  })
}

fixMaps(Maps)
