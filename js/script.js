const app = new PIXI.Application();
document.querySelector('#scene').appendChild(app.view);

// Inner radius of the circle
const radius = 70;

// The blur amount
const blurSize = 32;

app.loader.add('grass', './images/img/1.jpg');
app.loader.load(setup);

function setup(loader, resources) {
    const background = new PIXI.Sprite(resources.grass.texture);
    app.stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const circle = new PIXI.Graphics()
        .beginFill(0xFF0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
    const focus = new PIXI.Sprite(texture);

    app.stage.addChild(focus);
    background.mask = focus;

    app.stage.interactive = true;
    app.stage.on('mousemove', pointerMove);

    function pointerMove(event) {
        focus.position.x = event.data.global.x - focus.width / 2;
        focus.position.y = event.data.global.y - focus.height / 2;
    }
}
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();
tl.to(".wrapper",2,{x:-window.innerWidth})
.from(".section2 h2",2,{opacity:0,scale:3})
tl.to(".wrapper",2,{x:-window.innerWidth})
.from(".section3 h2",2,{opacity:0,scale:3})


ScrollTrigger.create(
    {
        animation:tl,
        trigger:".wrapper",
        start:"center center",
        end:"+=4000",
        scrub:true,
        pin:true

    }
)



