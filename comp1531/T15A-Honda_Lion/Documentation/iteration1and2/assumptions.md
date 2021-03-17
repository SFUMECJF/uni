# Assumptions

* We assume that this app should have a database which includes the password, email addresses and other information on the user.

* We assume that password and email addresses should be stored as pairs, in a dictionary, or in 2 lists. In this way, we can check if user typed in the correct password for their email address.

* We assume there should be a decoding function somewhere that takes in token as input and return the authorisation of the user as output. Therefore we can determine if the user has the right to do something, otherwise it'll raise access error.

* We assume that token is a rather long string, which includes channel details(message,member,admin and so on) and its associated details. When we call channels_list or channels_listall function, we gain a way to interpret the information that is stored in the token.

* As such, we assume that the token will be encoded in such a way that sensitive
information, albiet for security or privacy reasons, will not be easily 
determined.

* We assume that the token and its internal timer is refreshed at least once 
every minute to ensure that the user has not exceeded their 15 minute time 
window. 

* We assume that there is a time function(maybe import from datetime) that can show us the sent time of the message.(stored with message so we can see the message and its corresponding time when it is sent) Same applies to message_sendlater.

* We assume there are 4 authorisation value:1,2,3,4 which represents the owner of slackr, owner of channel, admin of channel, member respectively.

* We assume that when logging in, validity of emails are checked before it is checked whether or not the email has been registered yet.

* We assume that when logging in, the validity of the password is checked before it is compared to the correct password of the email.

* We assume that when registering, validity of emails are checked before it is checked that the email has been registered before.

* We assume that when registering, the first and last names should contain at least 1 character.

* We assume that when registering, the first and last names should not contain any numbers or symbols.

* We assume that when requesting a password reset, the input email must be valid.

* We assume that when a password reset request is sent, the reset code will contain only letters and numbers.

* We assume that when resetting the password, the new password can be the same as the password before the reset.

* We assume that channels are associated by numbers and not by strings. This does 
not necesarily mean that the respective channel will not be able to be called
said string but rather, it's number ID in the database is linked to a string.

* We assume that messages will be saved by separate categorises, 
accessable through the means of the channel id. This way, messages are 
attributed via their "channel_data". 

* We assume that GUI will also contribute in preventing people from sending messages at a past date.

* We assume that sent messages are less than a 1000 characters long, with a visual warning popping up when an individual sends a longer message.

* We assume that messages that have pinned/unpinned with have either option and not both when a user is interacting with the inteface. The same idea applies for react and unreact.

* We assume that each message will have multiple reactions, from different individuals.

* We assume that messages sent are restricted to a channel at each instance, in other words sending a message on one channel will not send it on another unless there two channels are linked.

* We assume that when testing user_profile functions, all tokens are valid. 

* We assume that the specification had some typo/clarification errors but we took all the instructions at face value. 


