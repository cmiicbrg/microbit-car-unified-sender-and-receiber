input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showIcon(IconNames.SmallDiamond)
    radio.sendString("stop")
})
radio.onReceivedNumber(function (receivedNumber) {
    // serial.writeValue("r", receivedNumber)
    vr = Math.map(receivedNumber, -90, 90, 383, 1023)
    vl = Math.map(-1 * receivedNumber, -90, 90, 383, 1023)
})
function vor () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showArrow(ArrowNames.North)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showIcon(IconNames.SmallDiamond)
}
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.North)
    radio.sendString("vor")
})
function zurück () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.showArrow(ArrowNames.South)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "vor") {
        vor()
    } else if (receivedString == "zurück") {
        zurück()
    } else if (receivedString == "stop") {
        stop()
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.South)
    radio.sendString("zurück")
})
function bestimmeRichtung () {
    // Wenn zu weit gedreht, wird sonst genau die entgegengesetzte Richtung gesetzt
    if (input.acceleration(Dimension.Y) > 0) {
        r = 180 * (Math.atan2(input.acceleration(Dimension.Y), -1 * input.acceleration(Dimension.X)) / Math.PI) - 90
    }
}
function schreibeGeschwindigkeit () {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
let r = 0
let vl = 0
let vr = 0
basic.showIcon(IconNames.SmallDiamond)
vr = 703
vl = 703
radio.setGroup(134)
stop()
basic.forever(function () {
    bestimmeRichtung()
    radio.sendNumber(r)
    schreibeGeschwindigkeit()
})
