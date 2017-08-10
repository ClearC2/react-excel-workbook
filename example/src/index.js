import React from 'react'
import {render} from 'react-dom'
import Workbook from '../../src/index'

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
  <div className="row" style={{marginTop: '100px'}}>
    <div className="col-xs-12 text-center">
      <Workbook filename="example.xlsx" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
        <Workbook.Sheet data={() => data1} name="Sheet A">
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
  </div>
)

render(example, document.getElementById('app'))
