const TEMPLATES = await (await fetch('static/app.xml')).text();
import { Component, useState, useRef, mount } from "@odoo/owl";

// Counter component
class Vem extends Component {
    static template = 'Vem';

    setup(){
        this.state = useState({ 
            x:0, y:0, 
            xLock: false, yLock: false, // locked = ignored
            direction:null, value: 0 
        })
        this.plotterRef = useRef('plotter')
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

    xBeginDrag(ev){
        this.state.yLock = true;
        this.xyBeginDrag(ev)
    }
    yBeginDrag(ev){
        this.state.xLock = true;
        this.xyBeginDrag(ev)
    }
    xyBeginDrag(ev){
        console.log('begin drag')
        // const el = this.plotterRef.el;
        const offsetX = ev.pageX;
        const offsetY =  ev.pageY;
        // const x = this.state.x, y = this.state.y;
        const {x,y,xLock,yLock} = this.state;
        let dx, dy;

        
        const moveWindow = (ev) => {
            dx = ev.pageX - offsetX;
            dy = ev.pageY - offsetY;
            // el.style.setProperty('--x', `${x+dx}`);
            // el.style.setProperty('--y', `${y+dy}`);
            if(!xLock) this.state.x = x + dx;
            if(!yLock) this.state.y = y + dy;
        }
        const stopDnD = () => {
            window.removeEventListener("mousemove", moveWindow);
            // el.classList.remove('dragging');
            this.state.xLock = false;
            this.state.yLock = false;
            
            if (dy !== undefined && dx !== undefined) {
                // self.windowService.updatePosition(current.id, dx, dy);
            }
        }

        window.addEventListener("mousemove", moveWindow);
        window.addEventListener("mouseup", stopDnD, { once: true });
    }
}

// Application setup
mount(Vem, document.body, { templates: TEMPLATES, dev: true});
