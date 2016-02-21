class Person:
    num_people = 0
    def __init__(self, name, age, greeting, starting_location):
        self.name = name
        self.age = age
        self.greeting = greeting
        self.location = starting_location
        self.location.people[name] = self
        Person.num_people += 1
    def talk(self):
        print(self.greeting)
        
class Item:
    num_items = 0
    def __init__(self, name, location):
        self.name = name
        self.location = location
        self.location.items[name] = self
    def use(self):
        print("Using " + self.name)
        
class Place:
    num_places = 0
    def __init__(self, name, left, right):
        self.name = name
        self.left = left
        self.right = right
        self.items = {}
        self.people = {}
        if (self.left):
            self.left.right = self
        self.right = right
        if (self.right):
            self.right.left = self
        self.items = {}
    def find(self, item):
        if item in self.items:
            return self.items[item]
        else:
            print("I can't find that item anywhere!")
    def describe(self):
        print("It is a bright sunny day here at the " + self.name)
        if not self.items:
            print("There is nothing here.")
        else:
            print("I can see a: ")
            for item in self.items:
                print(item)
        if not self.people:
            print("There are no people.")
        else:
            print("Here are the people here today: ")
            for person in self.people:
                print(person)


class Player:
    def __init__(self, name, age, location):
        self.name = name
        self.age = age
        self.location = location
        self.level = 1
        self.backpack = {}
        self.health = 50
        self.max_health = 100
    def talk(self):
        print("Hiya, my name is " + self.name)
    def take(self, item):
        item = self.location.find(item)
        if item:
            print("I picked up a " + item.name)
            self.backpack[item.name] = item
    #Implement this! You should first check if you have that item.
    #If you do, use it! If you don't, print a message and don't do anything.
    def use(self,item):
        #Implement this!
        return
    #Implement this function as well!
    def eat(self,food):
        #implement 
        return
    def go_left(self):
        #implement
        return
    def go_right(self):
        #implement
        return
class Food(Item):
    def __init__(self, name, location, health):
        self.name = name
        self.location = location
        self.health = health
        location.items[name]= self
    def eat(self):
        return self.health

home = Place("Home", None, None)
bus_station = Place("Bus Station", home, None)
school = Place("Sunny Side High", bus_station, None)
backyard = Place("Backyard", None, home)
apple = Food("Apple", home, 10)
me = Player("Frances", 20, home)
me.take("Apple")
me.talk()

running = True
def parse(string):
    if string == "go left":
        me.go_left()
        return
    if string == "go right":
        me.go_right()
        return
    if string == "talk":
        me.talk()
        return
    if string == "quit":
        global running
        running = False
        print("Goodbye, come back soon!")
        return
    if string == "look":
        me.location.describe()
        return
    string = string.split()
    if string[0] == "eat":
        if len(string) > 1:
            me.eat(string[1])
        else:
            print("Eat what?")
        return
    if string[0] == "use":
        if len(string) > 1:
            me.use(string[1])
        else:
            print("Use what?")
        return
    if string[0] == "take":
        if len(string) > 1:
            me.take(string[1])
        else:
            print("Take what?")
        return
    else:
        print("Sorry, what did you mean by that?")

#Starting the game
print("Hi, welcome to Adventure Game! Let's begin.")
while(running):
    parse(raw_input("Type >>"))




        
    
        
        
        
