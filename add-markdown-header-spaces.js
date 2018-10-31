function addSpaceToMatch(match, start, leadingSpaces, blockquote, headers) {
  blockquote = (blockquote) ? blockquote : ''
  
  return `${start}${leadingSpaces}${blockquote}${headers} `
}

function addSpacesToDescription(description) {
  let regexp = /(^|\n)( {0,3})(> {0,4})?(#+)/g

  return description.replace(regexp, addSpaceToMatch)
}

function fixMaps(Maps) {
  Maps.models.forEach(model => {
    let fixedDescription = addSpacesToDescription(model.attributes.description)

    model.save({ description: fixedDescription })
  })
}

fixMaps(Maps)
