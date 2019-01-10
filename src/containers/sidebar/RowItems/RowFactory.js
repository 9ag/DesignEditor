import React from 'react';
import { DragType, OperationMode } from '../../../lib/enum';
import { DragSource } from 'react-dnd';
import * as Util from '../../common/DragUtil';

function RowFactory(rowType, segmentations = [1]) {

  class RowElement extends React.Component {
    static type = rowType;
    render() {
      const { connectDragSource, isDragging, key } = this.props;
      const total = segmentations.reduce((i, total) => i+total, 0);
      return connectDragSource(<li>
          {
            segmentations.map((i, index) =>
            (<div key={index} className={`ds-row-column col-${12*i/total}`}>
              <div className="ds-row-content"></div>
            </div>))
          }
      </li>);
    }
  }
  return DragSource(DragType.ROW, Util.getSource({ mode: OperationMode.INSERT, type: rowType, cells: segmentations }), Util.getCollect())(RowElement);
}

export default RowFactory;