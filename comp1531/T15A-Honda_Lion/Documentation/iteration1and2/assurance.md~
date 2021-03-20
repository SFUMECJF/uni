# Assurance

 ![](pylint.png)
 ![](test.png)
 ![](test_coverage.png)

# Understanding of verification and validation

* In order to achieve user customer satisfaction, verification and validation are required. Verification ensures that the system has been built in a correct manner and behaves functionally. Validation ensures that the product is fit for purpose and the demand of the consumers have been met. Both are equally important and cannot be ignored. In order to achieve validation and verification user stories must be converted into acceptance criteria and in order to ensure all functions are met. The general structure we followed involved converting the user stories into rule based acceptance criteria, where each user story was broken down into smaller parts(not too specific or broad) to be ticked off during implementation.

# Acceptance criteria

## User story #1

- As a user, I want to log in to the app via my registered email and password so that my login is safe and confidential.


    Rule-based Acceptance Criteria:
      * There is a field at the centre to enter the users email and password
      * The email field contains a placeholder grey text: “Email *” and similarly with password: “Password *”
      * If the details are correct, user will be logged into the provided account
      * The data inserted is encrypted and secured


## User story #2

- As a user, I want to register to the app by providing my email, password and name(first and last) so that I can create a new account to start with.

    Rule-based Acceptance Criteria
      * There is a field at the centre to type the user’s first name, last name, email and password
      * Each field with have grey placeholder texts: “First Name *”, “Last Name *”, “Email *” and “Password *” respectively
      * When all the details filled out are valid, the user can begin using Slackr
      * Data inserted is secured

## User story #3

- As a user, I want this app to have a forgot password button that I can click on so that I can reset my password via the link or code that the email sent to me.

    Rule-based Acceptance Criteria
      * A button can be found on the login page which says “Forgot Password?”
      * Clicking the button will bring users to a page with an email field to reset password
      * Entering a valid email, users are sent to another page to enter the reset code and new password
      * All fields will have grey placeholder text of what to input
      * Users password will be set to the new password if correct reset code is given
      * Another button to take the user back to the login page


## User story #4

- As a user, I want to log out whenever I would like to so that I don’t get messages afterwards or so I can change to another account

    Rule-based Acceptance Criteria
      * Log out button is located at the top-right
      * Log out button takes you back to the login screen
      * Notifications are disabled once user logs out


## User story #5

- As a user, I want to see a list of channels that I am in so that it’s easier for me to enter and manage them.

    Rule-based Acceptance Criteria
      * There is a side tab on the left of Slackr which lists all channels the user is a member or owner of
      * Each channel has a circle and its channel name
      * User can enter a channel by clicking on its circle or channel name
      * Once channel is entered, it can be managed


## User stories #6

- As a owner of the channel, I want to be able to change the channel to either public or private so that it can meet certain purposes (eg. Private for a group of friends, public for a discussion group)

    Rule-based Acceptance Criteria
      * Once a user enters a channel they are an owner of, they can access channel settings
      * By accessing channel settings, the user can toggle the channel to public or private


## User stories #7

- As a user, I want to be able to see the channel details(name,members,message history,owner of the channel) so that I can get an idea of what’s going on recently in the channel and more information about it.

    Rule-based Acceptance Criteria
      * User can see channel name, members, message history and owner(s) by entering it
      * Channel name has larger font at the top
      * All members are listed under the channel name
      * Owner(s) will have a star next to their name
      * Message history is under the list of members


## User stories #8

- As a user, I want to be able to join a channel that I am interested in so that I can have conversations with other people that in the channel.

    Rule-based Acceptance Criteria
      * There will be a field to type in the channel id the user wants to join
      * User is then added to the channel if it exists and is public
      * If viewing a public channel, the user can also click on the 'join channel' button to join the channel instead
      * The user can then message people inside the channel


## User stories #9

- As an owner of the channel, I want to be able to add other members as owner or admin of the channel so that more people can manage the channel to make the channel better for members.

    Rule-based Acceptance Criteria
      * Button at the top-right “Admin” can be clicked to set user permissions
      * A small window is opened where the owner types in the User ID they want to set permissions for
      * The owner can then choose to set them as an admin or owner
      * Once set, the user can exercise the privileges given to them and are able to manage the channel


## User Story #10

- As a user, I want to be able to send messages so that I can start or join a conversation in the channel.

    Rule-based Acceptance Criteria
      * A field to enter messages at the bottom of the screen
      * The messages field has grey placeholder text “Send a message” with a text box icon next to it
      * When a user clicks into the field, the text is minimised, moved upwards and replaced with placeholder “...”
      * The placeholder disappears after user types
      * When user presses enter or clicks “SEND” to its right, the message can be seen by channel members in message history above
      
## User Story #11

- As a user, I want to be able to edit messages so that I can modify my mistakes.

    Rule-based Acceptance Criteria
      * Hovering over a users own personal messages will bring up more options
      * An option to edit will exist and clicking it will bring up a field to enter new text
      * The message will update and be replaced with entered new text

## User Story #12

- As a user, I want to be able to pin/unpin messages so that I can show its high/low importance priority.

    Rule-based Acceptance Criteria
      * Hovering over messages will bring up more options
      * An option to ‘pin’ toggles a message between pinned and unpinned
      * Places a special marker that makes other members aware of its importance
      * Users will then be able to easily find the message in the message history, indicating its importance
      
## User Story #13

- As a user, I want to be able to react/unreact to message so that I can show my attitude toward a certain message.

    Rule-based Acceptance Criteria
      * Hovering over personal messages will bring up an option to ‘react’
      * If the message is already reacted, the option will be replaced with ‘unreact’
      * Multiple reactions can be given to the same message by multiple users
      * Reaction is placed close to the message
  
## User Story #14

- As a user, I want to be able to delete messages that I have sent so that I can drawback any mistakes I have made in the previous messages.

    Rule-based Acceptance Criteria
      * Hovering over a users own messages will bring up an option to ‘Remove’
      * If the user is an owner of the channel, the ‘Remove’ option will be visible for all messages in the channel
      * After a message is removed, users can no longer see the message in the channel

## User Story #15

- As a user, I want to be able to send message later at certain times so that it’s convenient for any announcement or celebrate other’s important date(birthday, anniversary...).

    Rule-based Acceptance Criteria
      * An ‘stopwatch’ icon inside the ‘send message’ field can be clicked to open a small ‘send later’ window
      * Users enter the time in a 12 hour clock, including whether or not it is in the AM or PM
      * A ‘calendar’ icon will be inside the time picker field to open a visual representation of a clock, where they can spin the hands of a clock to choose the time
      * When the time is approached the message is sent
      
## User Story #16

- As a user, I want to be able to edit my own profile(change names, upload user photo, change handle, edit email address...) so that I can make my profile more interesting or more private depends on my needs.

    Rule-based Acceptance Criteria
      * Profile tab can be found at the top-left, above the channels side tab
      * The user can then change their first name, last name, email and handle by clicking on the ‘pencil’ icon
      * Users cannot type into the fields if the pencil icon has not been clicked
      * Each field has a grey placeholder text indicating what to input
      * After the user fills the fields, they can either press the ‘save’ icon or the ‘x’ icon to remove their changes
      
## User Story #17

- As a user, I want to be able to create a channel and join it myself so that I can organise topics/conversations.

    Rule-based Acceptance Criteria
      * In the channel side tab, there is a ‘+’ icon next to ‘My Channels’
      * Small ‘Create Channel’ window is opened 
      * A grey placeholder text will appear in the field and typing into it will cause it to disappear
      * After the user inputs the channel name and clicks 'create', the channel will be added to their 'My Channels' side tab
      
## User Story #18

- As a user, I want to be able to invite other people to the channel to be able to communicate with them without meeting up.

    Rule-based Acceptance Criteria
      * When users enter a channel, they can click the ‘invite member’ button under the member list
      * A small ‘invite window’ is opened and the user is prompted to enter the User ID of who they would like to invite
      * When invited, the invited user is automatically joined into the channel
   
## User Story #19

- As a user, I want to be able to leave a channel so that I stop receiving messages and notifications from the channel.

    Rule-based Acceptance Criteria
      * When entered into a channel, users can click the ‘leave channel’ button under the member list
      * After the button is clicked, the user is immediately removed from the channel and will stop receiving notifications from the channel

## User Story #20

- As a user, I want to be able to look at other user profiles so that I can find people who interests me.

    Rule-based Acceptance Criteria
      * After a user enters a channel, they can click on another user in the member list to view their profiles
      * This takes the user to another page, which displays the selected users first name, last name, email and handle

## User Story #21

- As a user, I want to search for messages based on strings, in-order to recall things I’ve forgotten or important information.

    Rule-based Acceptance Criteria
      * Users can enter a query into a search field
      * The user can then find a collection of messages that match the query, from the channels they are members of

## User Story #22

- As a user, I want to search for messages based on strings, in-order to recall things I’ve forgotten or important information.

    Rule-based Acceptance Criteria
      * Users can enter a query into a search field
      * The user can then find a collection of messages that match the query, from the channels they are members of

## User Story #23

- As a user, I want to modify another user’s privileges (Admin, Member, Owner), in-order to organise the platform in a hierarchical order

    Rule-based Acceptance Criteria
      * An owner can locate the 'Admin' button on the top right, which displays an option to set users permissions
      * Only works if the authorised user is an admin or owner, otherwise displays an error
      * A small window opens in the centre which prompts the owner to enter the user they would like to change permissions for and an option to change them to either a member, admin or owner
      * The hierarchy in a channel is in the order of owner, admin, member.
      
## User Story #24

- As a user, I want to organise periodic standups, in-order to gather information about the team's efficiency, productivity and restrictions.

    Rule-based Acceptance Criteria
      * There is an option to initiate a stand-up in the channel for 15 minutes
      * Messages sent with standup_send will be buffered into the queue
      * At the end of 15 minutes, messages sent using standup_send will be collated and sent to all users
      
# Tool used for assurance

* Our team Honda Lion utilized test driven developments to create tests for each function in the first iteration, although some of these tests were useful, some were too specific for example when tokenizing data we created our own tokenizer, however it was recommended we use JWT instead. Thus in the second iteration we utilized whitebox unit testing where each function was tested on its own to ensure it functions appropriately, and thus validate that the system has been built in correctly. Some tools our team utilized to further enhance the quality of our testing included Pylint and Coverage.py. Pylint is an external tool that analyses python code in order to detect errors, warn against potential errors and notify users of the correct conventions. Hence Pylint is an extremely useful tool to ensure that the code is sustainable free of bugs and valid. Each member of the team utilized pylint while writing their code to ensure a similar styles and conventions were used, hence we were able to to better interact python, as pylint would notify the user whether modules have been imported, declared data structures have been defined and much more. As a result we were able to minimize the amount of bugs that occured, and maximized our efficiency, providing more time to perfect the rest of the code. In-addition to pylint, coverage.py was an extremely useful tool to validate our test coverage. Coverage.py revealed lines that weren’t executed during testing and branches that weren’t visited in the code, these results are helpful since they indicate possible tests cases that aren't being tested for code bugs that aren't easily visible to coders. Hence coverage.py allowed us to evade simple bugs that may have lead to customer dissatisfaction.
      
# Conclusion

* In conclusion, we ensure that system verification by utilizing pylint which ensured sustainable, readable and conventional code as well as coverage.py which revealed what our code failed to cover. We ensured system validation by converting our user stories into a user acceptance criteria which acted as a guide(boxes to tick) when implementing functions to ensure nothing has been missed and all the clients demand have been met. Thus, we ensure that the system has been built correctly (verified) and the right system has been built (validated).
