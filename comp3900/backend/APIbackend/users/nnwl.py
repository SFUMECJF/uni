import torch
from torch._C import device
import torch.nn as nn
import json

import os
#this is the model of the neural network
class MyModel (nn.Module):
    """Some Information about MyModule"""
    #algorithm of the hidden layers
    def __init__(self):
        super(MyModel, self).__init__()
        self.layer_one = nn.Linear(5, 30)
        self.layer_two = nn.Linear(30, 6)

    #this is the process of the algorithm
    def forward(self, input):
        sum_one = self.layer_one(input)
        hidden  = torch.tanh(sum_one)
        sum_two = self.layer_two(hidden)
        output  = torch.sigmoid(sum_two)
        return (output)


#used to train the algorithm
def train(net, device, train_loader, optimiser):
    net.train()
    #adjects the hidden units so it would improve later on
    for batch_idx, (data,target) in enumerate(train_loader):
        optimiser.zero_grad()
        data, target = data.to(device), target.to(device)
        output = net(data)
        loss = nn.functional.binary_cross_entropy(output, target)
        loss.backward()
        optimiser.step()
        
#this is used to test the accuracy of the algorithm
def test(net, test_loader):
    with torch.no_grad():
        net.eval()
        correct = 0
        total= 0
        for data, target in test_loader:
            output = net(data)
        #just outputing a print for me to see how accurate they are
        for i,j in zip(output, target):
            x = i.tolist()
            y = j.tolist()
            maxv = max(x)
            mayv = max(y)
            if x.index(maxv) ==  y.index(mayv):
                correct = correct + 1
            total = total + 1
        p_cor = correct/total * 100
        print("Correct: ", correct, "\nPercentage correct: ",p_cor, "%")
        net.train()


#this to change number inputs into a list so that the nn can more easily learn it
def target_change(raw):
    new_target = []
    for i in raw:
        if i == 1:
            new_target.append([1,0,0,0,0,0])

        if i == 2:
            new_target.append([0,1,0,0,0,0])

        if i == 3:
            new_target.append([0,0,1,0,0,0])

        if i == 4:
            new_target.append([0,0,0,1,0,0])

        if i == 5:
            new_target.append([0,0,0,0,1,0])

        if i == 6:
            new_target.append([0,0,0,0,0,1])

    return new_target
        


#this is the main function
def nnwl(totalData):
    #amount of times repeated, the +1 is used so 1 more test will be outputed
    epochs = 100001
    #uses cuda to train the alogrithm if possible, but cpu if there isn't
    device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')

    #the input of data and turning them into tensor
    data_input_raw = totalData["usersData"]
    data_target_raw = totalData["busyness"]

    data_input = torch.Tensor(data_input_raw)
    test_input = torch.Tensor(data_input_raw)

    data_target = torch.Tensor(target_change(data_target_raw))
    test_target = torch.Tensor(target_change(data_target_raw))


    #loading the tensors in
    #trainloader
    train_dataset = torch.utils.data.TensorDataset(data_input,data_target)
    train_loader  = torch.utils.data.DataLoader(train_dataset,batch_size=len(data_input_raw))
    #testloader
    test_dataset = torch.utils.data.TensorDataset(test_input,test_target)
    test_loader  = torch.utils.data.DataLoader(test_dataset,batch_size=len(data_target_raw))

    net = MyModel().to(device)

   

    #initialise weight value
    net.layer_one.weight.data.normal_(0, 3)
    net.layer_two.weight.data.normal_(0, 3)

    #the parameters of learning rate and momentum
    optimiser = torch.optim.SGD(net.parameters(), lr = 0.5, momentum= 0.02, weight_decay= 0.0001)

    #the loop for training 
    for epoch in range(1, epochs):
        train(net, device, train_loader, optimiser)
        if epoch % 10000 == 0:
            test(net, test_loader)
        if epoch == epochs-1:
            torch.save(net, "nnwlModel.pth")

#uses to model to output an estimation of busyness
def final(net, final_loader):
    with torch.no_grad():
        net.eval()
        for data, target in final_loader:
            output = net(data)
            for i in output:
                x = i.tolist()
            maxv = max(x)
            print(output)
        print("Output: ", x.index(maxv))
    return x.index(maxv)+1

#takes in the input of data outputs busyness
def predict(userData):
    print(userData)
    usable_data= userData["usersData"]
    user_input = torch.Tensor(usable_data)
    user_target = torch.Tensor([userData["busyness"]])
    print(user_input, user_target)
    user_dataset = torch.utils.data.TensorDataset(user_input,user_target)
    user_loader  = torch.utils.data.DataLoader(user_dataset, batch_size=1)
    model = torch.load("nnwlModel.pth")
    final_output = final(model, user_loader)
    return final_output
