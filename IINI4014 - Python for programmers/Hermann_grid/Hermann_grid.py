import turtle


class Hermann_grid():
    def __init__(self, grid_color, square_color, circle_color, image_size, square_size, gridLine_width):
        self.grid_color = grid_color
        self.square_color = square_color
        self.circle_color = circle_color
        self.image_size = image_size
        self.square_size = square_size
        self.gridLine_width = gridLine_width

    def setup_turtle(self):
        self.screen = turtle.Screen()
        self.screen.title('Hermann grid illusion')
        self.screen.setup(self.image_size, self.image_size)
        self.turtle = turtle.Turtle()
        self.turtle.hideturtle()
        self.turtle.speed(0)
        self.screen.tracer(0)  # For not showing the process of drawing

    def set_colors(self):
        self.screen.bgcolor(self.square_color)
        self.turtle.color(self.grid_color)

    def draw(self):
        self.turtle.pensize(self.gridLine_width)

        # Draws the horisontal lines
        for x in range(-self.image_size-2, self.image_size, self.square_size):
            self.turtle.up()
            self.turtle.goto(x, -self.image_size)
            self.turtle.down()
            self.turtle.seth(90)
            self.turtle.fd(self.image_size*2)

        for y in range(-self.image_size-2, self.image_size, self.square_size):
            self.turtle.up()
            self.turtle.goto(-self.image_size, y)
            self.turtle.down()
            self.turtle.seth(0)
            self.turtle.fd(self.image_size*2)

        self.turtle.up()
        for x in range(-self.image_size-2, self.image_size, self.square_size):
            for y in range(-self.image_size-2, self.image_size, self.square_size):
                self.turtle.goto(x, y)
                self.turtle.dot(self.circle_color)
        self.screen.update()
        self.screen.exitonclick()


if __name__ == "__main__":
    run = Hermann_grid(grid_color='green', square_color='yellow', circle_color='blue',
                       image_size=500, square_size=25, gridLine_width=3)
    run.setup_turtle()
    run.set_colors()
    run.draw()
