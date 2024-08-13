const TEMPLATES = await (await fetch('static/app.xml')).text();
// This example illustrates how one can write Owl components with
// inline templates.

import { Component, useState, xml, mount } from "@odoo/owl";

// Counter component
class Vem extends Component {
  static template = 'Vem';

  setup(){
    this.state = useState({ 
      x:0, y:0, 
      direction:null, value: 0 
    })
  }

  navClick(ev){
    const go = ev.target.getAttribute('go')
    const [direction,value] = this._goToDir(go);
    this.state[direction] += value;
    console.log(go, direction, value)
  }
  _goToDir(go){
    const actions = [['y',-1],['x',1],['y',1],['x',-1]]
    go = ['up', 'right', 'down', 'left'].indexOf(go)
    return actions[go]
  }
}

// Application setup
mount(Vem, document.body, { templates: TEMPLATES, dev: true});
