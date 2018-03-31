## custom-properties

I use this module to display a documentation of my [CSS Custom Properties][CSS Custom Properties] defined in the `:root`. It runs in the browser runtime, maps the [document.styleSheets][document.styleSheets] object and returns an array of custom properties.

## Install

`yarn add custom-properties`

`npm install custom-properties --save`

## Usage

Custom Properties for the examples.

```css
:root {
 --all-color-white: #hex;
 --all-color-grey-400: #hex;
 --all-color-grey-200: #hex;
 --all-color-grey-100: #hex;
 --all-color-grey-300: #hex;
 --all-color-red-100: #hex;
 --all-color-red-400: #hex;
 --all-color-red-300: #hex;
 --all-color-red-200: #hex;
}
```

### groupIndex(customPropertiesArray, groupIndex)

In the custom property `--all-color-grey`

`all` is index 0
`color` is index 1
`grey` is index 2

So, let's group all the custom properties by the sortIndex 2

```js
import customProperties from 'custom-properties'

const allWithPrefix = customProperties.get('--all')

const properties = customProperties.groupIndex(allWithPrefix, 2)
/*
{
  white: [
    '--all-color-white',
  ],
  grey: [
    '--all-color-grey-400',
    '--all-color-grey-200',
    '--all-color-grey-100',
    '--all-color-grey-300',
  ],
  red: [
    '--all-color-red-100',
    '--all-color-red-400',
    '--all-color-red-300',
    '--all-color-red-200',
  ]
}
*/
```

### groupIndex(customPropertiesArray, groupIndex, sortIndex)

Sometimes, I need to sort the shades of colors to show in the documentation, it can be made with the `sortIndex` parameter

```js
import customProperties from 'custom-properties'

const allWithPrefix = customProperties.get('--all')

const properties = customProperties.groupIndex(allWithPrefix, 2, 3)
/*
{
  white: [
    '--all-color-white',
  ],
  grey: [
    '--all-color-grey-400',
    '--all-color-grey-300',
    '--all-color-grey-200',
    '--all-color-grey-100',
  ],
  red: [
    '--all-color-red-400',
    '--all-color-red-300',
    '--all-color-red-200',
    '--all-color-red-100',
  ]
}
*/
```

[CSS Custom Properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[document.styleSheets]: https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/styleSheets
