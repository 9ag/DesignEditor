import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Throttle from 'lodash-decorators/throttle';
import { inject, observer } from 'mobx-react';
import { DropTarget, DragSource } from 'react-dnd';
import rootStore from '../../store/store';
import PlaceHolder from '../common/PlaceHolder';
import Selector from '../common/Selector';
import { DragType, OperationMode, Position } from '../../lib/enum';
import { getPositionByMiddleOffset, defaultPosition } from '../../lib/util';
import * as Util from '../common/DragUtil';

const target = {
  drop(props, monitor, component) {

    const item = monitor.getItem();
    if (item.mode === OperationMode.INSERT) {
      rootStore.DesignState.execCommand('insertContent', monitor.getItem(), props.guid, props.columnGuid, monitor.getItem().position);
    } else if (item.mode === OperationMode.MOVE) {
      item.guid !== props.guid && rootStore.DesignState.execCommand('moveContent', item, props.guid, props.columnGuid, monitor.getItem().position);
    }
  },
  hover(props, monitor, component){
    const dom = findDOMNode(component);
    const position = getPositionByMiddleOffset(dom, monitor.getClientOffset());
    monitor.getItem().position = position;
    component.getDecoratedComponentInstance().wrappedInstance.setPosition(position);
  },
  canDrop(props, monitor, component){
    const item = monitor.getItem();
    if (props.guid === item.guid) {
      return false;
    }
    return true;
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

@DropTarget([DragType.CONTENT], target, collect)
@DragSource(DragType.CONTENT, Util.getSource({ mode: OperationMode.MOVE, position: defaultPosition }, (props) => ({ guid: props.guid, type: props.type })), Util.getCollect())
@inject('rootStore')
@observer
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.guid = props.guid;
    this.subtype = props.subtype;
  }

  state = {
    position: defaultPosition
  }

  onSelect = (e) => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.setSelected(guid);
    e.stopPropagation();
  }

  @Throttle(150)
  setPosition(position) {
    this.setState({ position });
  }

  onDelete = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.execCommand('deleteContent', guid);
  }

  onCopy = () => {
    const { guid, rootStore: { DesignState } } = this.props;
    DesignState.execCommand('copyContent', guid);
  }

  render() {
    const { connectDropTarget, connectDragSource, isOver, canDrop, children, guid, rootStore: { DesignState } } = this.props;
    return <div>
        { isOver && canDrop && this.state.position === Position.BEFORE && <PlaceHolder /> }
        {connectDropTarget(<div className={classnames("ds-layer ds-layer-selectable", (guid === DesignState.selected) && 'ds-layer-selected')}  onMouseUp={this.onSelect}>
          <Selector
            type="content"
            onRef={(dom) => {connectDragSource(dom);}}
            placeholder="Content" 
            onDelete={this.onDelete}
            onCopy={this.onCopy}
          />
          { children }
        </div>)}
        { isOver && canDrop && this.state.position === Position.AFTER && <PlaceHolder /> }
    </div>;
  }
}

const Dragger = (Content);

export default (Dragger);