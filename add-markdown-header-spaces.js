function addSpaceToMatch(match, start, leadingSpaces, blockquote, headers) {
  blockquote = (blockquote) ? blockquote : ''
  
  return `${start}${leadingSpaces}${blockquote}${headers} `
}

function addSpacesToDescription(description) {
  let regexp = /(^|\n)( {0,3})(> {0,4})?(#+)/g
  return description.replace(regexp, addSpaceToMatch)
}

function fixDescription(description) {
  return description ? addSpacesToDescription(description) : description;
}

function fixMaps(transaction) {
  Maps.each(model => {
    let description = model.get("description");
    let descriptionFixed = fixDescription(description);
    
    if (description != descriptionFixed) {
      transaction.update(model, {description: descriptionFixed});
    }
  })
}

function fixEntities(transaction) {
  [Elements, Connections, Loops].forEach(collection => {
    collection.each(entity => {
      let description = entity.getAttr("description");
      let descriptionFixed = fixDescription(description);
      
      if (description != descriptionFixed) {
        transaction.update(entity, () => entity.setAttr("description", descriptionFixed));
      }
    })
  })
}

transaction = new Transaction()
fixMaps(transaction)
fixEntities(transaction)
transaction.execute()
