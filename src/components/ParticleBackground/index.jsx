import React, { Component } from 'react'
import { $http } from "../../utils";
import Particle from './Particle.js'
import random from 'lodash/random';
import './style.scss';

export default class ParticleBackground extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.labelRef = React.createRef();
        this.canvasContext = null;
        this.width = 0;
        this.height = 0;
        this.background_color = {
          h: 0,
          s: 0,
          l: 100,
          a: 1
        };
        this.link_threshold = 300;
        this.density = 20;
        this.state = {
            mottos: [],
            highlightedMotto: '',
            mousePosition: {
              x: 0,
              y: 0
            },
            showLabel: false,
            labelPostion: {
              left: 0,
              top: 0
            }
        }
    }

    getMotto = () => {
      $http.get('motto').then(mottos => {
        this.setState({ mottos }, () => {
          this.initMouseEvent();
          this.generateParticles();
          this.animate();
        })
      })
    }

    generateParticles = () => {
      const {mottos} = this.state;
      var count, i, p, r, v_max, _i;
        this.particles = [];
        this.particle_pairs = [];
        count = this.width * this.height * (this.density / Math.pow(1e3, 2));
        r = 3;
        v_max = .3;
        for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
            p = new Particle(this, this.canvasContext, { width: this.width, height: this.height }, random(r, this.width - r), random(r, this.height - r), random(-v_max, v_max), random(-v_max, v_max), {
                h: random(0, 360),
                s: 30,
                l: 20,
                o: 1
            }, random(1, 3), mottos[i < mottos.length ? i : 0],
            this.updateHoveredText);
            this.particles.push(p)
        }
        this.connectParticle(this.particles, 2, function(_this) {
            return function(c) {
                return _this.particle_pairs.push([c[0], c[1]])
            }
        }(this));
    }

    connectParticle = (numArr, choose, callback) => {
      var n = numArr.length;
      var c = [];
      var inner = function(start, choose_) {
          if (choose_ == 0) {
              callback(c)
          } else {
              for (var i = start; i <= n - choose_; ++i) {
                  c.push(numArr[i]);
                  inner(i + 1, choose_ - 1);
                  c.pop()
              }
          }
      };
      inner(0, choose)
    }

    updateHoveredText = (text, particleX, particleY) => {
      if (!text) return;
      let activeX = particleX + 10;
      const activeY = particleY + 10;
      const labelEl = this.labelRef.current;
      
      this.setState({
        highlightedMotto: text
      }, () => {
        if (this.state.showLabel) return;
        const labelWidth = labelEl.offsetWidth;
        if (labelWidth + activeX > this.canvasContext.width) {
          activeX -= labelWidth + 10
        }
        return this.setState({
          labelPostion: {
            left: activeX,
            top: activeY
          },
          showLabel: true
        });
      });
    }

    updateLink() {
      var ctx, d, pairs, _i, _len, _ref, _results;
      ctx = this.canvasContext;
      _ref = this.particle_pairs;
      _results = [];
      for (_i = 0,
          _len = _ref.length; _i < _len; _i++) {
          pairs = _ref[_i];
          d = this.distance(pairs[0], pairs[1]);
          if (d < this.link_threshold) {
              this.link_color = pairs[0].color;
              this.link_color.a = (1 - d / this.link_threshold) * .2;
              ctx.beginPath();
              ctx.strokeStyle = this.hslaStr(this.link_color);
              ctx.lineWidth = 1;
              ctx.moveTo(pairs[0].x, pairs[0].y);
              ctx.lineTo(pairs[1].x, pairs[1].y);
              _results.push(ctx.stroke())
          } else {
              _results.push(void 0)
          }
      }
      return _results
  }

  updateParticles() {
    var d, hasHoveredParticle, p, _i, _len, _ref;
    const { mousePosition } = this.state;
    hasHoveredParticle = false;
    _ref = this.particles;
    for (_i = 0,
        _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        d = this.distance(p, mousePosition);
        p.move(d);
        p.draw(d);
        if (p.isHovered) {
          hasHoveredParticle = true
        }
    }
    if (!hasHoveredParticle) {
        return this.setState({
          showLabel: false
        })
    }
  }

  distance(p0, p1) {
    var d, dx, dy;
    dx = p0.x - p1.x;
    dy = p0.y - p1.y;
    d = Math.sqrt(dx * dx + dy * dy);
    if (isNaN(d)) {
        return 0;
    } else {
        return d;
    }
};

    initCanvas = () => {

    }

    initMouseEvent = () => {
      document.addEventListener('mousemove', event => {
        this.setState({
          mousePosition: {
            x: event.clientX,
            y: event.clientY
          }
        })
      });
      document.addEventListener('mouseleave', () => {
        this.setState({
          mousePosition: {
            x: Infinity,
            y: Infinity
          }
        })
      })
    }

    hslaStr = ({ h, s, l, a}) => {
      return `hsla(${h},${s}%,${l}%,${a})`;
    }

    clearBg = () => {
      this.canvasContext.fillStyle = this.hslaStr(this.background_color);
      return this.canvasContext.fillRect(0, 0, this.width, this.height)
    }

    animate = () => {
      this.clearBg();
      this.updateLink();
      this.updateParticles();
      return requestAnimationFrame(this.animate)
    }

    componentDidMount() {
      window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      };

      const canvasEl = this.canvasRef.current;
      this.canvasContext = canvasEl.getContext("2d");
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      this.width = canvasEl.width;
      this.height = canvasEl.height;
      // debugger
      this.getMotto();
    }

    render() {
      return (
          <>
            <label className="hoveredParticle" ref={this.labelRef}
              style={{
                top: this.state.labelPostion.top,
                left: this.state.labelPostion.left,
                visibility: this.state.showLabel ? 'visible' : 'hidden'
              }}>{this.state.highlightedMotto}</label>
            <canvas className="particleBackground" ref={this.canvasRef}/>
          </>
      )
    }
}