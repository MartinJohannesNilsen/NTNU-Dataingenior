"""
The given assignment was to create two methods of drawing the cardioidshape based om times tables and a multiplier
First version was my own attempt without guidelines
Then I also created a function witout animating each step, but prints out the figure when finished. Much more efficient!
Second version is created with the use of generators, as it was given that we also had to create one function with generators and yield
Have also here created a function for printing the result without looking at the process of drawing it. 
"""

import turtle
import math
import time
pi = math.pi

# Attributes
radius = 180
numberOfPoints = 300
multiplier = 2


def initTurtle():
    myTurtle = turtle.Turtle()
    myTurtle.hideturtle()
    myTurtle.speed(10)
    return myTurtle


"""------------------- Version 1 -------------------"""


def drawCardioidV1():
    # This method gets the coordinates for each point around the circumference
    def getPointsForCircle():
        return [(math.cos(2*pi/numberOfPoints*x)*radius, math.sin(2*pi/numberOfPoints*x)*radius) for x in range(0, numberOfPoints+1)]
    points = getPointsForCircle()

    # Translates relative to absolute coordinates, for not needing to reset each time
    def pointPos(index):
        return (points[index][0], radius + points[index][1])

    # This function draws the lines in between the points on the circumference
    def draw():
        myTurtle = initTurtle()
        myTurtle.circle(radius)
        myTurtle.color("red")
        for x in range(numberOfPoints):
            myTurtle.penup()
            myTurtle.setpos(pointPos(x))
            myTurtle.pendown()
            # As we saw in the video x times the multiplier modulo numberOfPoints will be the same as the point number around the circumference
            myTurtle.setpos(pointPos((x * multiplier) % numberOfPoints))

    draw()
    turtle.Screen().exitonclick()


def drawCardioidV1_withoutAnimation():
    # This function removes the animation of the turtle for better efficiency
    turtle.tracer(0, 0)
    drawCardioidV1()
    turtle.update()


"""------------------- Version 2 -------------------"""


def drawCardioidV2():
    # Have to find all coordinates for each point around the circumference
    def coordinatesGenerator():
        for x in range(0, numberOfPoints+1):
            yield ([math.cos(2*pi/numberOfPoints*x)*radius, math.sin(2*pi/numberOfPoints*x)*radius])
    # Have to make it into a list for the drawing, loosing the efficiency-benefit of generator and yield with not all list in memory at all time
    points = list(coordinatesGenerator())

    # Translates relative to absolute coordinates, for not needing to reset each time
    def relativeCoordinatesGenerator():
        for x in range(numberOfPoints):
            yield ([points[x][0], radius + points[x][1]])
    relativeCoordinates = list(relativeCoordinatesGenerator())

    # This function draws the lines in between the points on the circumference
    def draw():
        myTurtle = initTurtle()
        myTurtle.circle(radius)
        myTurtle.color("red")
        for x in range(numberOfPoints):
            myTurtle.penup()
            myTurtle.setpos(relativeCoordinates[x])
            myTurtle.pendown()
            # As we saw in the video x times the multiplier modulo numberOfPoints will be the same as the point number around the circumference
            myTurtle.setpos(relativeCoordinates[(
                x * multiplier) % numberOfPoints])

    draw()
    turtle.Screen().exitonclick()


def drawCardioidV2_withoutAnimation():
    # This function removes the animation of the turtle for better efficiency
    turtle.tracer(0, 0)
    drawCardioidV2()
    turtle.update()


"""------------------- Run the program -------------------"""


def main():
    # drawCardioidV1() #Version 1, original
    # drawCardioidV1_withoutAnimation() #Version 1, without animation

    # drawCardioidV2() #Version 2, with generator
    drawCardioidV2_withoutAnimation()  # Version 2, without animation


if __name__ == "__main__":
    main()
