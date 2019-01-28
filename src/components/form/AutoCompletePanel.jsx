import React from 'react';
import styles from './index.less';

const fn = () => {};

class AutoCompletePanel extends React.Component {

  state={
    index: 0
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onBodyClick, true);
    document.body.addEventListener('keydown', this.pressKey);
  }
  
  componentWillUnmount(){
    document.body.removeEventListener('click', this.onBodyClick);
    document.body.removeEventListener('keydown', this.pressKey);
  }

  pressKey = (e) => {
    const { show, data = [], onClick = fn, onClose = fn } = this.props;
    if (!show) {
      return;
    }
    // 38 up 40 down
    switch(e.which) {
      case 38:
        this.setState({ index: this.state.index > 0 ? this.state.index - 1 : data.length -1 });
        e.preventDefault();
        break;
      case 40:
        this.setState({ index: this.state.index < (data.length - 1) ? this.state.index + 1 : 0 });
        e.preventDefault();
        break;
      case 13:
        onClick(data[this.state.index]);
        onClose();
        this.setState({ index: 0 });
        e.preventDefault();
        break;
      case 27:
        onClose();
        this.setState({ index: 0 });
        e.preventDefault();
        break;
    }
  }

  onBodyClick = () => {
    const { onClose = fn } = this.props;
    setTimeout(onClose, 10);
  }

  onItemClick = (item) => {
    const { onClick = fn } = this.props;
    onClick(item);
  }

  render(){
    const { data = [], show = false, position = { x: 0, y: 0 }, onClick } = this.props;
    return show && data.length > 0 && <div className="dynamic" style={{ left: position.x + 20, top: position.y + 20 }}>
      <ul onMouseLeave={() => {this.setState({ index: -1 })}}>
        {data.map((i, index) => (<li
          onMouseEnter={(e) => {this.setState({ index })}}
          className={index === this.state.index ? "active" : ""}
          key={i.key}
          onClick={(e)=>{this.onItemClick(i);}}
          title={i.title}>
          {i.key}
        </li>))}
      </ul>
    </div>;
  }
}

export default AutoCompletePanel;