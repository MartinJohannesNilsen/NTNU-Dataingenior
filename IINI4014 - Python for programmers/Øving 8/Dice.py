from tkinter import *
import random


class Virtual_Dice:
    def __init__(self, pos_x, pos_y, canvas_size):
        self.pos_x = pos_x
        self.pos_y = pos_y
        self.canvas_size = canvas_size
        self.init_canvas()

    def init_canvas(self, padding=10):
        self.window = Tk()
        self.window.title("Virtual Dice")
        self.canvas = Canvas(self.window,
                             width=self.canvas_size+padding, height=self.canvas_size+padding)
        self.padding = padding

    # Throws the dice
    def throw_dice(self):
        return random.randint(1, 6)

    # Draws a circle based on the tkinters method for creating oval
    def create_circle(self, *, x, y, r, fill="black"):
        # Draws a circle with center in the x,y given
        return self.canvas.create_oval(x-r, y-r, x+r, y+r, fill=fill)

    # Draws the dice
    def show(self, dice_color="white", dot_color="black"):
        # Creates outlinwe
        self.canvas.create_rectangle(self.pos_x+self.padding, self.pos_y+self.padding,
                                     self.pos_x + self.canvas_size,
                                     self.pos_y + self.canvas_size,
                                     fill=dice_color)
        # Rolls the dice
        self.value = self.throw_dice()
        print(f"The value of the dice rolled was {self.value}")
        # Draws the dots based on the value
        if self.value == 1:
            self.__draw_one_dot(dot_color)
        elif self.value == 2:
            self.__draw_two_dots(dot_color)
        elif self.value == 3:
            self.__draw_three_dots(dot_color)
        elif self.value == 4:
            self.__draw_four_dots(dot_color)
        elif self.value == 5:
            self.__draw_five_dots(dot_color)
        elif self.value == 6:
            self.__draw_six_dots(dot_color)

        # Methods for gathering widgets and packing canvas to new window, then running Tcl
        self.canvas.pack()
        mainloop()

    # Private methods for drawing the dots
    def __draw_one_dot(self, dot_color):
        # One dot in the center
        self.create_circle(x=self.pos_x+self.canvas_size/2,
                           y=self.pos_y+self.canvas_size/2,
                           r=self.canvas_size/10,
                           fill=dot_color)

    def __draw_two_dots(self, dot_color):
        # Two dots, one on the upper left corner and second on lower right
        self.create_circle(x=self.pos_x+self.canvas_size/4,
                           y=self.pos_y+self.canvas_size/4,
                           r=self.canvas_size/10,
                           fill=dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4)*3,
                           y=self.pos_y+(self.canvas_size/4)*3,
                           r=self.canvas_size/10,
                           fill=dot_color)

    def __draw_three_dots(self, dot_color):
        # Three dots, one dot in the lower left, center and upper right
        self.__draw_one_dot(dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4)*3,
                           y=self.pos_y+(self.canvas_size/4),
                           r=self.canvas_size/10,
                           fill=dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4),
                           y=self.pos_y+(self.canvas_size/4)*3,
                           r=self.canvas_size/10,
                           fill=dot_color)

    def __draw_four_dots(self, dot_color):
        # Four dots, one dot in the lower left and right, and upper left and right corner
        self.__draw_two_dots(dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4)*3,
                           y=self.pos_y+(self.canvas_size/4),
                           r=self.canvas_size/10,
                           fill=dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4),
                           y=self.pos_y+(self.canvas_size/4)*3,
                           r=self.canvas_size/10,
                           fill=dot_color)

    def __draw_five_dots(self, dot_color):
        # Five dots, four dots + centre dot
        self.__draw_four_dots(dot_color)
        self.__draw_one_dot(dot_color)

    def __draw_six_dots(self, dot_color):
        # Six dots, four dots + two dots vertically centred on both sides
        self.__draw_four_dots(dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4)*1,
                           y=self.pos_y+(self.canvas_size/2),
                           r=self.canvas_size/10,
                           fill=dot_color)
        self.create_circle(x=self.pos_x+(self.canvas_size/4)*3,
                           y=self.pos_y+(self.canvas_size/2),
                           r=self.canvas_size/10,
                           fill=dot_color)


dice = Virtual_Dice(pos_x=0, pos_y=0, canvas_size=800)
dice.show(dice_color="#F55656", dot_color="black")
