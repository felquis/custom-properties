const isRoot = rule => rule.selectorText === ':root'
const isColorProperty = prefix => prop => prop.startsWith(prefix)
const filterPrefixedProperties = (prefix) => (acc, rule) => {
  const colorProperties = Array.from(rule.style).filter(isColorProperty(prefix))

  const colorsNotAddedYet = colorProperties.filter(prop => !acc.includes(prop))

  return acc.concat(colorsNotAddedYet)
}

const get = (prefix = '') => {
  // each styleSheet available
  return Array.from(document.styleSheets).reduce((results, sheet) => {
    // some styleSheets does not have rule declarations
    if (!sheet.cssRules) {
      return results
    }

    // get all the rules that is `:root`
    const rootRules = Array.from(sheet.cssRules).filter(isRoot)

    // map all the rules and get only the custom properties' names
    const customPropertiesFound = rootRules.reduce(filterPrefixedProperties(prefix), [])

    return results.concat(customPropertiesFound)
  }, [])
}

function groupIndex (properties, groupIndex, sortIndex) {
  const tokenizedProperties = properties.map(color => color.split('-').filter(onlyTruthy => !!onlyTruthy))

  return tokenizedProperties.reduce((result, color, colorIndex) => {
    const groupName = color[groupIndex]

    if (result[groupName]) {
      result[groupName] = [...result[groupName], properties[colorIndex]]
    } else {
      result[groupName] = [properties[colorIndex]]
    }

    // if provided, sort the properties by index
    if (sortIndex) {
      result[groupName] = result[groupName]
        .sort((a, b) => +a.split('-')[sortIndex + 2] < +b.split('-')[sortIndex + 2]) // sortIndex + 2 is not the best solution
    }

    return result
  }, {})
}

module.exports = {
  get,
  groupIndex,
}
