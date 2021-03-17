from list_exercises import *

def test_reverse():
    l = [0]
    reverse_list(l)
    assert l == [0]

    l = [-3, -2, -1, 0, 1, 2, 3]
    reverse_list(l)
    assert l == [3, 2, 1, 0, -1, -2, -3]

    #No Input
    l = []
    reverse_list(l)
    assert l == []
    
    #Testing input of misc chars
    l = ['@', '@', '%', '%']
    reverse_list(l)
    assert l == ['%', '%', '@', '@']
    
def test_min():
    assert minimum([0]) == 0
    assert minimum([-3, -2, -1, 0, 1, 2, 3]) == -3
    assert minimum([-999, 999]) == -999
    assert minimum([2, 2]) == 2
    assert minimum([-2, -2]) == -2

def test_sum():
    assert sum_list([0]) == 0
    assert sum_list([-3, -2, -1, 0, 1, 2, 3]) == 0
    assert sum_list([]) == 0
    assert sum_list([-1 -1 -1 -1]) == -4