function locomotivAnimation() {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });





    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();


}




function initAnimations() {
    var tl = gsap.timeline();

    tl.from(".line h1", {
        y: 150,
        stagger: 0.25,
        duration: 0.5,
    });

    tl.from("#line1-part1, .line h2", {
        opacity: 0,
        onStart: function() {
            var h5timer = document.querySelector("#line1-part1 h5");
            var grow = 0;
            var interval = setInterval(function() {
                if (grow < 100) {
                    h5timer.innerHTML = grow++;
                } else {
                    h5timer.innerHTML = grow;
                    clearInterval(interval); // Stop the counter when reaching 100
                }
            }, 40);
        },
    });

    tl.to("#loader", {
        opacity: 0,
        duration: 0.4,
        delay: 3.5,
    });

    tl.from(".hero h2", { y: 100 });

    tl.from("#page1", {
        opacity: 0,
        y: 1200,
        ease: Power4,
    });
    tl.from("#hero1,#page2", {
        opacity: 0,
    });
}

function initCursorEffect() {
    document.addEventListener("mousemove", function(dets) {
        gsap.to("#crsr", {
            x: dets.clientX,
            y: dets.clientY,
            duration: 0.0,
        });
    });

}

















function sheryAnimation() {
    Shery.imageEffect(".image-div", {
        style: 5,
        gooey: true,
        config: { "a": { "value": 2.29, "range": [0, 30] }, "b": { "value": -0.71, "range": [-1, 1] }, "zindex": { "value": "", "range": [-9999999, 9999999] }, "aspect": { "value": 0.7930966609153571 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.53, "range": [0, 10] }, "metaball": { "value": 0.29, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.46, "range": [0, 2] }, "noise_scale": { "value": 19.08, "range": [0, 100] } },
    })
}

function cursorAnimation() {
    Shery.makeMagnet("#nav-part2 h2", {});
    Shery.mouseFollower({

        ease: "power1.Out",
        duration: 0.5,
    })
};



// Call both functions to initialize animations and cursor effects
initAnimations();
initCursorEffect();
sheryAnimation();

cursorAnimation();


locomotivAnimation();