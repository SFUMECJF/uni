from nnwl import predict
import random


def main():

    list3 = []
    o = random.sample(range(1,30),5)
    list3.append(o)
    print(list3)
    x = {"usersData": list3}
    y = predict(x)
    print(y)

if __name__ == '__main__':
    main()