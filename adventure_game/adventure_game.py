class Person:
    num_people = 0
    def __init__(self, name, age, greeting, starting_location):
        self.name = name
        self.age = age
        self.greeting = greeting
        self.location = starting_location
        self.location.items[name] = self
        Person.num_people += 1
    def talk(self):
        print(self.greeting)
        
class Item:
    num_items = 0
    def __init__(self, name, location):
        self.name = name
        self.location = location
    def use(self):
        print("Using " + self.name)
        
class Place:
    num_places = 0
    def __init__(self, name, left, right):
        self.name = name
        self.left = left
        if (self.left):
            self.left.right = self
        self.right = right
        if (self.right):
            self.right.left = self
        self.items = {}
    def find(self, item):
        return self.items[item]
class Player:
    num_players = 0
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
        self.backpack[item.name] = item
    #Implement this! You should first check if you have that item.
    #If you do, use it! If you don't, print a message and don't do anything.
    def use(self,item):
        #implement this!
        return
    #Implement this function as well!
    def eat(self,item):
        #implement this!
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


        
    
        
        
        
