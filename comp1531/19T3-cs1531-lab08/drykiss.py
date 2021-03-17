import sys


my_list = []
def get_input_min():
    global my_list
    my_min = 0
    counter = 0
    while counter < 5:
        my_list.append(int(input("Enter an input: ")))
        if (counter > 0):

            if (my_list[counter] < my_list[counter - 1]):
                my_min = my_list[counter] 

        else:
            my_min = my_list[counter]
        counter += 1
    
    print("Minimum: " + str(my_min))

def get_product(start, end):
    global my_list
    my_product = 1
    for i in range(start, end):
        my_product *= my_list[i]
    print("Product of numbers from: " + str(start) + " to " + str(end) + " = ")
    print(f"{my_product}")
    

if __name__ == '__main__':
    get_input_min()
    get_product(0, 4)
    get_product(1, 5)
