#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable= C0103, R0913, C0303, W0601, R0902, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Thu Oct 31 3:40:07 2019

@author: z5211275
"""

import urllib
import imghdr
from PIL import Image
import call_error

def image_process(img_url, x_start, y_start, x_end, y_end, u_id):
    img_path = f"./static/icon{u_id}.jpg"
    urllib.request.urlretrieve(img_url, img_path)
    imageObject = Image.open(img_path)
    width, height = imageObject.size
    if int(x_start) < 0 or int(x_end) > width or int(y_start) < 0 or int(y_end) > height:
        call_error.user_profile_image_out_of_dimension()
    cropped = imageObject.crop((int(x_start), int(y_start), int(x_end), int(y_end)))
    cropped.save(img_path)
    if imghdr.what(img_path) != 'jpeg':
        call_error.user_profile_wrong_imagetype()
