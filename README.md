# VEM - Virtual Embroidery Machine
Web-based embroidery machine simulation that execute GCODE sent from [Embroiderino](https://github.com/openembroidery/embroiderino)

![screen shoot](res/screenshot.png "Screenshot")

## Motivation
"Driven by the bold ambition to build a computer-controlled embroidery machine, I have spent years reading articles on the subject. However, I often got lost, possibly due to my lack of electronics background. That’s why I created this virtual embroidery machine, allowing me to begin cataloging the issues. This visualization has been instrumental in helping me find solutions to every detail of my uncertainties."

## What?
When it receives GCODE, the animation will start by moving the hoop to the specified coordinates. You can also do this manually by pressing the up/down/left/right arrow buttons on the screen. \
I want to involve sound of sewing machine running in future.

## What inside?
Every single millimeter in real hardware corresponds exactly to 1 pixel in this simulation. \
For example, your 400mm rail rods are literally represented here as 400px tall. This simplification is necessary to keep everything simple, enable quick troubleshooting, and ensure an accurate visual representation. The elements are then rotated 90 degrees in 3D space using CSS to achieve a realistic effect.

## What's Next?
I planned to implement [Teathimble Firmware](https://github.com/openembroidery/teathimble) in javascript to simulate Arduino powered embroidery system. It is now possible by using [wokwi/avr8js](https://github.com/wokwi/avr8js) library.
This will make VEM communicate via RS32 (aka. serial port). \
In case you curios, there is a [video](https://www.youtube.com/watch?v=fArqj-USmjA) to make an Arduino Simuator in JS


But I failed to build teathimble myself. (I have no electronic background, you know)  \
So, if you have a compiled teathimble (.hex) please make a PR or fill an github issue here.