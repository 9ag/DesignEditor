import React from 'react';
import ColorPicker from 'rc-color-picker';

const Color = ({ title = 'Color', value = '#fff', attribute = 'color', onUpdate = (a: string, b: string) => {} }) => (<div className="blockbuilder-widget blockbuilder-link-widget">
<div className="row">
  <div className="blockbuilder-widget-label col-6">
    <label className="blockbuilder-label-primary"><span>{title}</span></label>
  </div>
  <div className="col-6 text-right">
    <ColorPicker color={value} onChange={(e)=>{onUpdate(attribute, e.color)}}/>
  </div>
</div>
</div>);

export default Color;