from datetime import datetime
import re
import fileinput

#Assuming that the file is named dates.txt

def main():
    #getting dates
    with open("dates.dat", "r",) as date_numbers:
        dates = date_numbers.read().split(',')
    
    date_numbers.close()
    #getting variable of first day
    first_day = datetime(2019, 1, 1) 
    first_weekday = first_day.weekday()

    print("first weekday is" + str(first_weekday))

    requested = input("Enter int of requested day of week (0 = mon, 6 = sun): ")

    print("you requested the number " + requested)
    req_counter = 0
    counter = 0
    while (counter < len(dates) - 1):
        if (((int(dates[counter]) + first_weekday) % 7) == int(requested)):
            req_counter += 1
        
        counter += 1
    print("total found days in list is: " + str(req_counter))


if __name__ == '__main__':
    main()
