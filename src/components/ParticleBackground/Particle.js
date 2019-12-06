const hslaStr = ({ h, s, l, a}) => {
    return `hsla(${h},${s}%,${l}%,${a})`;
}

export default class Particle {
    constructor(sphere, canvasContext, boundary, x, y, vx, vy, color, radius, quote, updateHoveredText) {
        this.sphere = sphere;
        this.canvasContext = canvasContext;
        this.boundary = boundary;
        this.x = x || 0;
        this.y = y || 0;
        this.vx = vx || 1;
        this.vy = vy || 1;
        this.color = color || {
            h: 0,
            s: 0,
            l: 0,
            o: 1
        };
        this.radius = radius || 3;
        this.quote = quote || "";
        this.updateHoveredText = updateHoveredText;
    }

    move(distance) {
        this.make_sure_in_boundary();
        // if the particle is far away from the mouse then keep moving
        if (distance > 30) {
            this.x += this.vx;
            this.y += this.vy;    
        }
    }

    draw(distance) {
        var r;
        this.isHovered = false;
        this.color.a = .2;
        this.draw_circle(this.x, this.y, this.radius, this.color);
        if (distance < 30) {
            this.color.a = .1;
            r = this.radius * 4;
            this.updateHoveredText(this.quote, this.x, this.y);
            this.isHovered = true
        } else {
            this.color.a = .05;
            r = this.radius * 3
        }
        return this.draw_circle(this.x, this.y, r, this.color)
    }

    make_sure_in_boundary() {
        if (this.x + this.radius > this.boundary.width || this.x - this.radius < 0) {
            this.vx = -this.vx
        }
        if (this.y + this.radius > this.boundary.height || this.y - this.radius < 0) {
            return this.vy = -this.vy
        }
    }

    draw_circle(x, y, r, color) {
        this.canvasContext.fillStyle = hslaStr(color);
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, r, 0, Math.PI * 2);
        this.canvasContext.fill();
    }
    
    draw_text(text, x, y) {
        var label, pos, w;
        if (x == null) {
            x = this.sphere.mouse.sx + 20
        }
        if (y == null) {
            y = this.sphere.mouse.sy + 10
        }
        label = this.sphere.$label;
        pos = label.offset();
        if (Math.abs(pos.left - x) < 1 || Math.abs(pos.top - y) < 1) {
            return
        }
        if (this.cb4hoverDot) this.cb4hoverDot({
            left: x,
            top: y,
            text: this.quote
        });
        // w = label.width();
        // if (w + x > this.canvasContext.width) {
        //     x -= w + 20
        // }
        // label.offset({
        //     left: x,
        //     top: y
        // }).html(this.quote);
        // return label.css({
        //     visibility: "visible"
        // })
    }
}
