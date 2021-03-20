"""
This file will simply unpickle data given
"""

import os 
import pickle
from collections import Counter

mostCommon  = {'colour' : '',
               'shape' : '',
        }

def unpickle():
    if os.path.exists('shapecolour.p'):
        unpickled = pickle.load(open('shapecolour.p','rb'))
        (mostCommon['colour'],_) = Counter(key['colour'] for key in unpickled).most_common(1)[0]
        (mostCommon['shape'],_) = Counter(key['shape'] for key in unpickled).most_common(1)[0]
        print(mostCommon)
        return(mostCommon)

                
    else: 
        print('fail')
        

if __name__ == '__main__':
    unpickle()