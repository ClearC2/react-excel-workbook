# React Excel Workbook

React Excel Workbook is a library for defining downloadable excel workbooks with react components.

## Example

```jsx
import Workbook from 'react-excel-workbook'

const data1 = [
  {
    foo: '123',
    bar: '456',
    baz: 1234
  },
  {
    foo: 'abc',
    bar: 'dfg',
    baz: 567
  },
  {
    foo: 'aaa',
    bar: 'bbb',
    baz: 89
  }
]

const data2 = [
  {
    aaa: 1,
    bbb: 2,
    ccc: 3
  },
  {
    aaa: 4,
    bbb: 5,
    ccc: 6
  }
]

const example = (
  <div className="row text-center" style={{marginTop: '100px'}}>
    <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
      <Workbook.Sheet data={data1} name="Sheet A">
        <Workbook.Column label="Foo" value="foo"/>
        <Workbook.Column label="Bar" value="bar"/>
        <Workbook.Column label="Baz" value="baz" width={20} format="£#0.00"/>
      </Workbook.Sheet>
      <Workbook.Sheet data={data2} name="Another sheet">
        <Workbook.Column label="Double aaa" value={row => row.aaa * 2}/>
        <Workbook.Column label="Cubed ccc " value={row => Math.pow(row.ccc, 3)}/>
      </Workbook.Sheet>
    </Workbook>
  </div>
)

render(example, document.getElementById('app'))
```

![Example](http://i.imgur.com/dfhivAs.png)
![Excel](http://i.imgur.com/YcE0Y61.png)

Workbooks can have multiple sheets. Sheets can use the same or different data sets(an array of objects).
Sheets have columns. Columns define a column label and value. Values can either be a string(the property name) or a function
that takes the current object and returns a value.

Columns may also optionally have widths (as per [docs](https://docs.sheetjs.com/#column-properties)), or custom formatting (as per [docs](https://docs.sheetjs.com/#number-formats)).

## Dependencies

This package uses [file-saver](https://www.npmjs.com/package/file-saver) and [xlsx](https://www.npmjs.com/package/xlsx) packages. I am only familiar with webpack and in order for everything to work with webpack you must use the [json-loader](https://www.npmjs.com/package/json-loader) and have this defined in your webpack config.

```js
node: {fs: 'empty'},
externals: [
  {'./cptable': 'var cptable'},
  {'./jszip': 'jszip'}
]
```

See the `example` directory for a working example.

## Testing

I have no idea how to test this.
