const customProperties = require('../lib')

describe('customProperties#get', () => {
  beforeAll(() => {
    const styleSheets = [
      {
        cssRules: [{
          selectorText: ':root',
          style: [
            '--all-color-white',
            '--other-color-white',
          ]
        }]
      },
      {
        cssRules: [{
          selectorText: ':root',
          style: [
            '--all-color-black',
            '--other-color-black',
          ]
        }]
      },
      { cssRules: null }
    ]

    Object.defineProperty(document, 'styleSheets', {
      value: styleSheets,
      writable: true,
      readable: true
    })
  })

  it('should return --all prefixed properties ', () => {
    const propertiesFound = customProperties.get('--all')
    
    expect(propertiesFound).toEqual(['--all-color-white', '--all-color-black'])
  })

  it('should return --other prefixed properties ', () => {
    const propertiesFound = customProperties.get('--other')
    
    expect(propertiesFound).toEqual(['--other-color-white', '--other-color-black'])
  })

  it('should empty array', () => {
    const propertiesFound = customProperties.get('--other')
    
    expect(propertiesFound).toEqual(['--other-color-white', '--other-color-black'])
  })

  it('should return all custom properties', () => {
    const propertiesFound = customProperties.get()
    
    expect(propertiesFound).toEqual(['--all-color-white', '--other-color-white', '--all-color-black', '--other-color-black'])
  })
})

describe('customProperties#groupIndex', () => {
  beforeAll(() => {
    const styleSheets = [
      {
        cssRules: [{
          selectorText: ':root',
          style: [
            '--all-color-white',
            '--all-color-grey-400',
            '--all-color-grey-200',
            '--all-color-grey-100',
            '--all-color-grey-300',
            '--all-color-red-100',
            '--all-color-red-400',
            '--all-color-red-300',
            '--all-color-red-200',
          ]
        }]
      },
      { cssRules: null }
    ]

    Object.defineProperty(document, 'styleSheets', {
      value: styleSheets,
      writable: true,
      readable: true
    })
  })

  it('should group by index', () => {
    const properties = customProperties.get()
    const all = customProperties.groupIndex(properties, 0)

    expect(Object.keys(all)).toEqual(['all'])
  })

  it('should sort grouped by index', () => {
    const properties = customProperties.get()
    const all = customProperties.groupIndex(properties, 2, 3)

    expect(all.grey).toEqual([
      '--all-color-grey-400',
      '--all-color-grey-300',
      '--all-color-grey-200',
      '--all-color-grey-100',
    ])

    expect(all.red).toEqual([
      '--all-color-red-400',
      '--all-color-red-300',
      '--all-color-red-200',
      '--all-color-red-100',
    ])
  })
})
