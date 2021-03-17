# Project

## Aims

* Appreciate issues in user interface design

* Learn practical aspects of graphical user interface programming

* Learn more about the Java class libraries

* Learn the application of design patterns.

## Due Dates

Milestone 1: 9AM Tuesday Week 7 (Demonstration: Week 7 Lab)

Milestone 2: 9AM Tuesday Week 8 (Demonstration: Week 8 Lab)

Final milestone: 9AM Monday Week 10 (Demonstration: Week 10 Lab)

**NOTE:** There is **NO** provision for late submissions with a late penalty. Not submitting by the deadline is considered non-submission.

## Value: 35 marks

---

## Overview

You have received a request from a client for an application for the playing of dungeon-style puzzles. With a partner from your lab class, you will follow an agile development process to design and implement a desktop Java application that satisfies the requirements of the client (see below). The final piece of software you deliver is expected to be of professional quality, user-friendly, and demonstrate the knowledge and skills you have acquired in this course.

## Partner

You should by now have a partner and group set-up on webcms3, after following the week-03 lab instructions. Your repositories will be created from these webcms3 groups.

If you do not have a webcms3 project group yet, you will be randomly assigned to a group.

Only groups of 2 are allowed by default. Groups of 1 are never allowed without special consideration, since this violates course learning outcomes requiring teamwork.

Once created, your group Gitlab repository will be available here (replace *GROUP_NAME* with your group's name):

https://gitlab.cse.unsw.edu.au/COMP2511/20T2/GROUP_NAME

## Project setup

**NOTE**: For the first milestone, it is not necessary to set up the project in VSCode.

Because this project uses JavaFX, to use it on a non-CSE computer, additional setup will be needed.

The repository provided has already been setup to run the starter-game, and tested on a CSE machine (using VLAB). To play the starter game, clone the repository onto your CSE machine on VLAB, open the root directory of the repository in VSCode, and click the *"Run"* link above the *main* method of **DungeonApplication.java**

Note that this works because *lib/symlink_javafx* is a symbolic link to a copy of JavaFX in the cs2511 class account. To make this work on a non-CSE computer, you will need to delete the *symlink_javafx* symbolic link, then download and unzip the latest version of the JavaFX JDK for Java 11 for your Operating System (taking into account if you have a 64 or 32 bit machine), and transfer the contents of the *lib* folder inside the JDK download into the *lib* folder on your cloned repository. You will also need to change the *launch.json* file to refer to **"./lib"** instead of **./lib/symlink_javafx** in the *"vmArgs"* configuration (note these modifications were tested on Windows 10).

You may also need to copy the contents of the *bin* folder in the unzipped JavaFX JDK download into a *bin* folder under the root directory of your cloned repository (e.g. for Windows).

The following version of the JavaFX JDK is recommended if you choose to run it on your computer, since it is the same version as on the CSE machine:

https://gluonhq.com/products/javafx/

Note that if you deviate from this precise directory structure, you may need to modify the VSCode configuration in *.vscode/launch.json* to be able to run the game in VSCode.

If the steps in the above instructions worked, you should be able to run the starter code.

**IMPORTANT**: Please do not push the contents of the *lib* or *bin* folders to your Gitlab repository. This is very likely to push you over the memory limits for the milestone 2 and 3 submissions.

## Preliminary client requirements

The client desires an application that lets the user move a player around a dungeon and try to overcome various challenges in order to "complete" the dungeon by reaching some goal. The simplest form of such a puzzle is a maze, where the player must find their way from the starting point to the exit.

![Maze][maze]

More advanced puzzles may contain things like boulders that need to be pushed onto floor switches,

![Boulders][boulders]

enemies that need to be fought with weapons, or collectables like potions and treasure.

![Advanced dungeon][advanced]

### Dungeon layout

To be specific, the layout of each dungeon is defined by a grid of squares, each of which may contain one or more entities. The different types of entities are as follows:

| Entity               | Example | Description                             |
| ------               | ------- | --------------------------------------- |
| Player               | ![Player][player] | Can be moved up, down, left, and right into adjacent squares, provided another entity doesn't stop them (e.g. a wall). |
| Wall                 | ![Wall][wall] | Blocks the movement of the player, enemies and boulders. |
| Exit                 | ![Exit][exit] | If the player goes through it the puzzle is complete.  |
| Treasure             | ![Treasure][treasure] | Can be collected by the player. |
| Door                 | ![Door][door_open] ![Door][door_closed] | Exists in conjunction with a single key that can open it. If the player holds the key, they can open the door by moving through it. Once open it remains so. The client will be satisfied if dungeons can be made with up to 3 doors. |
| Key                  | ![Key][key] | Can be picked up by the player when they move into the square containing it. The player can carry only one key at a time, and only one door has a lock that fits the key. It disappears once it is used to open its corresponding door. |
| Boulder              | ![Boulder][boulder] | Acts like a wall in most cases. The only difference being that it can be pushed by the player into adjacent squares. The player is only strong enough to push **one** boulder at a time. |
| Floor switch         | ![Floor switch][switch] | Switches behave like empty squares, so other entities can appear on top of them. When a boulder is pushed onto a floor switch, it is triggered. Pushing a boulder off the floor switch untriggers it. |
| Portal               | ![Portal][portal] | Teleports entities to a corresponding portal. |
| Enemy                | ![Enemy][enemy] | Constantly moves toward the player, stopping if it cannot move any closer. The player dies upon collision with an enemy. |
| Sword                | ![Sword][sword] | This can be picked up the player and used to kill enemies. Only one sword can be carried at once. Each sword is only capable of 5 hits and disappears after that. One hit of the sword is sufficient to destroy any enemy. |
| Invincibility potion | ![Invincibility][invincibility] | If the player picks this up they become invincible to enemies. Colliding with an enemy should result in their immediate destruction. Because of this, all enemies will run away from the player when they are invincible. The effect of the potion only lasts a limited time. |

### Goals

In addition to its layout, each dungeon also has a goal that defines what must be achieved by the player for the dungeon to be considered complete. Basic goals are:

* Getting to an exit.
* Destroying all enemies.
* Having a boulder on all floor switches.
* Collecting all treasure.

More complex goals can be built by logically composing goals. For example,

* Destroying all enemies AND getting to an exit
* Collecting all treasure OR having a boulder on all floor switches
* Getting to an exit AND (destroying all enemies OR collecting all treasure)

If getting to an exit is one of a conjunction of conditions, it must be done last. For example, if the condition is to destroy all enemies AND get to an exit, the player must destroy the enemies *then* get to the exit.

### Input

Your application will read from a JSON file containing a complete specification of the dungeon (the initial position of entities, goal, etc.). Example dungeons are included in the `dungeons` directory and the starter code contains an incomplete dungeon loader.

The dungeon files have the following format:

> { "width": *width in squares*, "height": *height in squares*, "entities": *list of entities*, "goal-condition": *goal condition* }

Each entity in the list of entities is structured as:

> { "type": *type*, "x": *x-position*, "y": *y-position* }

where *type* is one of

> ["player", "wall", "exit", "treasure", "door", "key", "boulder", "switch", "portal", "enemy", "sword", "invincibility"]

The `door`, `key`, and `portal` entities include an additional field `id` containing a number. Keys open the door with the same `id` (e.g. the key with `id` 0 opens the door with `id` 0). Portals will teleport entities to the **one** other portal with the same ID.

The goal condition is a JSON object representing the logical statement that defines the goal. Basic goals are:

> { "goal": *goal* }

where *goal* is one of

> ["exit", "enemies", "boulders", "treasure"]

In the case of a more complex goal, *goal* is the logical operator and the additional *subgoals* field is a JSON array containing subgoals, which themselves are goal conditions. For example,

```JSON
{ "goal": "AND", "subgoals":
  [ { "goal": "exit" },
    { "goal": "OR", "subgoals":
      [ {"goal": "enemies" },
        {"goal": "treasure" }
      ]
    }
  ]
}
```

Note that the same basic goal *can* appear more than once in a statement.

You can extend this format to include additional information if you wish, but your application should still work with files in the original format.

### User interface

The UI component of this project will be implemented in JavaFX. The starter code contains a very basic UI showing how a player can be moved around with the arrow keys, but it is missing many features (the player can walk through walls for one).

The client has given you free reign over the visual design of the program. Included in the starter code are some example assets, but you are free to use different ones. You can find them elsewhere or even create your own. The examples above came from [here](http://opengameart.org).

## Requirement analysis (Milestone 1)

For this initial milestone, you are to model the requirements of the client as user stories on the issue board in GitLab. You will demonstrate these user stories to your tutor in the Week 7 lab, where they will ask you questions and assign marks based on your answers to these questions (and also through offline marking when appropriate).

It's important that you and your partner meet and collaborate early in order to develop a shared understanding of the project and how you intend to approach it. In developing the stories you will need to consider the requirements as given by the client in this document, but also make your own judgements about the expectations of potential users. Epic stories should be broken down into user stories and each story should have its own card.

The default columns that GitLab provides are sufficient for this project.

You are expected to produce:

1. High-level epic stories from the problem statement. Each epic should have its own card/issue and a corresponding tag used to mark user stories that fall under it.
2. User stories, each containing:
   * a short description of the feature based on the Role-Goal-Benefit (or Role-Feature-Reason) template (Refer to the RGB model from COMP1531 if unsure)
   * an estimate for the implementation of the user story in user story points (e.g. 4 points).
   * a tag indicating the priority
   * acceptance criteria for each user story as a checklist in the issue (Refer to material from COMP1531 if unsure)

As you progress through the rest of the project, you will keep your board and issues up to date: checking off acceptance criteria that have been satisfied and moving stories from **To Do** into **Doing** and finally into **Closed**.

**IMPORTANT**: You must add your user stories to the Gitlab issue board for them to be considered. Work in a different format (such as a PDF or word document) will not be assessed during marking.

## Domain modelling and backend implementation (Milestone 2)

Based on your requirements analysis, and all feedback you have received, you will produce a domain model for the backend component of your project in the form of a conceptual UML class diagram, implement it in Java and write JUnit tests to test its functionality.

In deciding on your design and writing your implementation, you should follow the practices and design principles covered in the course. You are expected to apply at least 3 of the design patterns covered in the course. It is up to you where they are applied, but you will be expected to justify how and why you used them to your tutor during demonstration.

Your class diagram only needs to be conceptual (showing the general structure of the classes and their relationship), but it needs to be consistent with the code and clearly indicate where you're using design patterns (use labels if necessary).

Your JUnit tests should be rigorous to ensure your backend functions as expected. In addition to basic unit tests, you need to have tests based on your acceptance criteria.

These JUnit tests should be placed into the "src/test" directory, using package "test". The dryrun will check your tests pass. It is important you follow this structure, since we will run automated coverage checking on your program.

In the week 8 lab, your tutor will ask you questions, and assign marks based on your answers to these questions (and also through offline marking when appropriate).

### Running coverage checking

To run coverage checking, on a CSE machine in the root directory of your repository:

```bash
$ gradle test -b test.gradle
```

The coverage checking report will be in: *build/reports/jacoco/test/html/index.html*

The test report will be in: *build/reports/tests/test/index.html*

Your tutor will receive a report generated using this command, generated from the master branch, from your latest submission as of the deadline.

Please do not push the *build* directory to your Gitlab repository. The gitignore has been configured to ensure this in the most recent version of the *final_project* repository.

## UI design and extensions (Milestone 3)

For this milestone you are to design and implement the user interface component of the application. A very basic UI can be built with minimal changes to the starter code, so that is where you should start. Fancier UI features can be added once you have something that is at least usable. You should apply the ideas from user-centric design and consider the usability heuristics covered in the lectures.

Additionally, for this milestone, you also have the chance to extend the project with your own ideas. Note that, to get high marks for these extensions, you will need to consider how they impact the user. **Extensions that are technically complex, but do not provide the user with any real benefit are not considered good extensions**. You can, and should, create additional user stories to model the requirements of these extensions. Possible extensions include but are not limited to, multiplayer, different sorts of enemies, new weapons, and animated movement.

This final milestone will be a culmination of all the work done in the previous milestones. You have the opportunity to improve on your design based on feedback from your tutor. Marking of the design will be harsher for the final milestone as you have already had the opportunity to receive feedback.

In the week 10 lab, your tutor will ask you questions, and assign marks based on your answers to these questions (and also through offline marking when appropriate).

## Assessment

You will be assessed on your ability to apply what you have learnt in this course as well as your ability to produce a significant piece of software.

In cases where the client has not been explicit in their requirements, you will need to make your own design decisions with your partner. However, this does not mean you can ignore whatever requirements the client has given you. You may be asked to justify any assumptions you have made during marking.

You are expected to use git appropriately by committing regularly with meaningful commit messages and using feature branches to manage significant changes. Similarly, you should use the task board to coordinate work with your partner. You will need to take the principles you learnt from COMP1531 and apply them here.

While it is up to you how to divide the work between you and your partner, both of you are expected to contribute code. Just creating diagrams and documentation is not sufficient contribution.

## Hints

* The first two milestones do not require a working UI. First determine how you are going to model a dungeon and its entities before considering the UI. A well designed back-end will require minimal change to connect to the UI.
* Up until the JavaFX has been covered, you may find some of the starter code to be hard to understand. For the backend, you can either ignore the starter code completely, or just look at the `Dungeon`, `Entity`, `Player` and `Wall` classes.
* The starter code uses the observer pattern to ensure the frontend and backend are in a consistent state and that they are not tightly coupled. It would be advisable to do the same for the changes you will make.
* The majority of marks available (see below) are for having a well designed application that meets the requirements. Avoid adding extra complexity and extensions till you have something that meets the most basic requirements.
* You will need to engage in research to learn parts of JavaFX yourself. This is expected, and an important learning process mirroring real-world development. You may also have to research how to configure VSCode to work with JavaFX to make some functionality work - this is similarly an important learning process. You should not expect to be taught all of the necessary JavaFX functionality.
* For JUnit in VSCode - it can be useful to run CTRL-SHIFT-P and run "clean the Java language server workspace" if you are having issues with packages/tests recognition.
* For JUnit tests - for this to work in VSCode, it is important to make the test classes public and named after the file they are inside.
* Useful JUnit5 documentation/tutorial:
https://junit.org/junit5/docs/current/api/
https://junit.org/junit5/docs/current/user-guide/

## Important Technical Notes

### Submission sizes

Maximum submission sizes apply (for milestones 2 and 3, since a submit command is used). For both milestones 2 and 3, a maximum repository size of 4MB applies. Exceeding this limit may result in you being unable to submit. Please email your tutor if you are unable to submit due to the maximum submission size being exceeded.

A likely reason for you exceeding the memory limit is uploading Java class files, or JavaFX binaries in the *lib* or *bin* folders. You should not push these to your Gitlab repository - particularly since it is configured to your Operating System, which might not match your partner's configuration or the CSE machine. The **.gitignore** file has been configured to prevent pushing the contents of your *lib* or *bin* folders - please do not adjust this. Also remember that you should be making the submission work on the CSE machine, so there is no reason to push your JavaFX binaries.

### Directory Structures

Please adhere to the provided layout of the directories, and filenames and filepaths of the starter files. Modifying this may break tests we run on your submission and may result in loss of marks.

You may add additional Java files with new Java classes in the *src/unsw/dungeon* folder.

## Equal Constribution

While it is up to you how to divide the work between you and your partner, both of you are expected to contribute code. Just creating diagrams and documentation is not sufficient contribution.

You are expected to contribute equally to your partner every week. At the end of every week, you are required to log the distribution of work during that week (by listing work completed, and percentages of work completed by each person) at the bottom of your README.md. If both partners in a team fail to submit a log by 9am Monday, we will assume the contribution for the previous week was equal and not engage in redistribution of marks for that week. If one partner fails to submit a log by 9am Monday, we will automatically believe the partner who submitted a log and redistribute marks accordingly. No further consideration will be granted in this regard.

If there is a disparity in the amount of work completed, you should email your tutor to discuss and resolve this.

We will automatically assume that the author of work is the author of the git commit pushing it to your repository for assessing contribution levels - you should not allow you partner to push your work.

We will only consider work pushed to the Gitlab repository in determining contribution levels.

At the end of the trimester, marks will be re-distributed between project partners in instances of unequal contribution (as per the weekly logs, verified by Gitlab commits).

Failure to make any contribution to your group-project during any 2-week period without special consideration will automatically result in a penalty being applied to your project mark, in addition to further redistribution of marks.

## Submission

We require your submission to execute without modification after your repository is cloned on a CSE machine (by opening the root repository directory in VSCode, and clicking the *"Run"* link in the **DungeonApplication.java** file. You should test this before submitting.

Failure of your repository to work by these specifications may result in a loss of marks. Your tutor will not attempt to fix your code when marking your work (no matter how minor the necessary modificaton).

Only one person in each group should submit. We will assess the latest submission as of the due-time by either partner.

### Milestone 1

You should have all your user stories entered into the issue board on your GitLab repository. You may continue to use the board between the deadline and your tutor's assessment, but they will be looking at the dates issues were modified to make sure you did the work that was required of you prior to the deadline.

You **do not** have to run a submission command for this to be submitted - we will simply check the issue board, and only mark issues and modifications of issues occurring before the deadline.

### Milestone 2

Submit the contents of your GitLab repository with the following command:

```bash
$ 2511 submit milestone2
```

Your UML class diagram should be a PDF file at the root of your repository named `design.pdf`.

### Milestone 3

Submit the contents of your GitLab repository with the following command:

```bash
$ 2511 submit milestone3
```

You will demonstrate your application to your tutor in Week 10. You may be asked to justify your design decisions and explain how you worked with your partner.

## Marking criteria

The marks are allocated as follows:

* Milestone 1 (7 marks)
* Milestone 2 (11 marks)
* Final milestone (17 marks)

Below is a *rough* guide on how you will be assessed for each milestone.

### Milestone 1

| Criteria | Mark  |                                                                                                  |
|:-------- |:----- |:------------------------------------------------------------------------------------------------ |
| Stories  | 0     | No user stories                                                                                  |
|          | 1     | User and epic stories not in a valid format and/or vague or ambiguous                            |
|          | 2     | Some user or epic stories not in a valid format and/or vague or ambiguous                        |
|          | 3     | User and epic stories in a valid format, but with unclear benefits, goals or acceptance criteria |
|          | 4     | Significant majority of user stories unambiguous and clear, with concrete acceptance criteria    |
|          | 5     | Unambiguous and clear user stories with concrete acceptance criteria                             |
| Planning | 0     | No user stories have points or priorities                                                        |
|          | 1     | Only some user stories have points or priorities                                                 |
|          | 2     | User stories have appropriate story point values and priorities                                  |

### Milestone 2

| Criteria     | Mark |                                                                                                   |
|:------------ |:---- |:------------------------------------------------------------------------------------------------- |
| Completeness | 0    | No or largely incomplete backend                                                                  |
|              | 1    | Backend implements some of the entities                                                           |
|              | 2    | Backend implements most of the entities                                                           |
|              | 3    | Backend implements almost all entities                                                            |
|              | 4    | Backend implements all of the entities                                                            |
| Testing      | 0    | No JUnit tests                                                                                    |
|              | 1    | JUnit tests for behaviour of a few entities                                                       |
|              | 2    | Rigorous JUnit tests for behaviour of almost all entities                                         |
|              | 3    | Rigorous JUnit tests for behaviour of all entities                                                |
| Design       | 0    | No apparent consideration for design                                                              |
|              | 1    | Messy design and diagrams and/or design inconsistent with code                                    |
|              | 2    | Clear design and diagrams with partial adherence to design principles and patterns                |
|              | 3    | Clear design and diagrams with strong adherence to design principles and patterns                 |
|              | 4    | Clear design and diagrams fully adhering to design principles and patterns and conforming to code |

Marks will be deducted for poor git and GitLab usage. For example, meaningless commit messages, large commits, issue board out of date, etc.

### Milestone 3

| Criteria     | Mark |                                                                                                   |
|:------------ |:---- |:------------------------------------------------------------------------------------------------- |
| Completeness | 0    | No or largely incomplete project                                                                  |
|              | 1    | Dungeons can be played with most of the entities                                                  |
|              | 2    | Dungeons can be played with almost all of the entities                                            |
|              | 3    | Dungeons can be played with all of the entities                                                   |
| Design       | 0    | No apparent consideration for design                                                              |
|              | 1    | Messy design and diagrams and/or design inconsistent with code                                    |
|              | 2    | Messy diagrams and/or poor application of design patterns                                         |
|              | 3    | Moderately clear diagrams and moderate application of design patterns                             |
|              | 4    | Clear design and diagrams with moderate adherence to design principles and patterns               |
|              | 5    | Clear design and diagrams with strong adherence to design principles and patterns                 |
|              | 6    | Clear design and diagrams fully adhering to design principles and conforming to code, and correct application of design patterns |
| Interaction  | 0    | Very basic user interface                                                                         |
|              | 1    | Interface that makes it possible to solve dungeons, but is slow, awkward, or buggy                |
|              | 2    | An interface that is mostly usable but with little consideration for usability heuristics         |
|              | 3    | Interface that is easy to use                                                                     |
|              | 4    | Interface that is easy and intuitive to use                                                       |
|              | 5    | A product that is engaging, intuitive and fun to use                                              |
| Extensions   | 0    | No extensions or only very basic extensions                                                       |
|              | 1    | One extension that represents some technical consideration                                        |
|              | 2    | Two extensions representing some technical consideration                                          |
|              | 3    | Three or more extensions that represent some technical as well as design and user interaction consideration |

Marks will be deducted for poor git and GitLab usage. For example, meaningless commit messages, large commits, issue board out of date, etc.

[player]:        images/human_new.png
[wall]:          images/brick_brown_0.png
[exit]:          images/exit.png
[door_open]:     images/open_door.png
[door_closed]:   images/closed_door.png
[key]:           images/key.png
[boulder]:       images/boulder.png
[switch]:        images/pressure_plate.png
[portal]:        images/portal.png
[enemy]:         images/deep_elf_master_archer.png
[sword]:         images/greatsword_1_new.png
[invincibility]: images/brilliant_blue_new.png
[treasure]:      images/gold_pile.png

[maze]:          examples/maze.png
[boulders]:      examples/boulders.png
[advanced]:      examples/advanced.png

## Logs of work completed per partner
All agile process development is tracked, logged and progressed via Jira by Atlassian. 
Decision was made to use this agile development platform due to the limiting constraints of the maintainer role given to us via Gitlab.
Note that the use of Jira in this case is purely for ease of progression throughout the project. No expectation of the Jira project is implied in terms of requesting marks and the use is only to aid our development and distribution of work.

All work will be done in accordance to the request that Gitlab board contains all issues, epics and user stories, before deadline, however, updates on completed/changed issues in gitlab will be done after Jira is updated.

All dev logs will be input below and in google doc file:

https://docs.google.com/document/d/1IU9ioqpDh2_uSPrnq47gD-GQY-4kbnkdLjVLc-4xEH4/edit?usp=sharing



### Week-05

1/7/2020
* MP
   * Read through project spec and tried to get starter code working on local machine
* JD
   * Read through final_project spec day after release

2/7/2020
* MP 
   * Responded to JD to organise a time in the next couple of days to get started on milestone 1
* JD
   * Determined time within Milestone1 timeframe for completion

3/7/2020
* MP
   * Successfully got JavaFX working on local machine to run starter code
   * Created and shared Google doc to share and begin notes and milestone 1

### Week-06

10/7/2020
* MP 
   * Cloned repo into local machine
* JD
   * Cloned nuoc_mam repo and got starter code to run from original spec.
   * Created Jira central for software tracking (gitlab is less desired as user is maintainer not owner)
   * Added subset of 8 Epics and approx of 28 user stories into Jira project based on spec
   * Merged spec, log and user stories onto Jira
   * Got starter code running on local machine and created separate branch on nuoc_mam repo for personal use (Yet to be used)

11/7/2020
* MP
   * Reviewed update from JD made last night with the Jira platform.
   * Collaborated with JD to add/edit epics and user stories with addition to discussing story points and priorities. 
* JD
   * Caught up with MP on Jira updates 
   * Continued progress on epics and user stories matching personal and client requirements as outlined in the SPEC with MP.

### Week-07

13/7/2020
* MP
   * Organised gitlab issue board with our epics and user stories 
* JD 
   * Checked over gitlab issue board for errors in user stories. Confirmed to be in acceptable condition.

14/7/2020 (MILESTONE 1 DUE 9AM)
* MP
* JD 
   * Updated developer log to match in doc.
   * Updated readme to include Jira references
   * Clarified uses about jira and reasonings behind decision.
   * All clear on submission of milestone 1
   * Commited README.md changes

**Throughout the completion of milestone1, work has been even with workloads comparable to both MP and JD. For a combined and logged work from week 5 - 7, work has been contributed at a 50% to 50% share between MP and JD. The utmost effort will be taken to ensure that this even workload continues into Milestone 2 and 3 as we begin to distribute our respective sprints. DATED 14/7/2020.**
-JD 

16/7/2020
* MP
   * Milestone 1 session with tutor
   * Updated some user acceptance criteria based of tutor feedback
   * Started structuring a domain model diagram 
   * Worked with JD to organise tasks and next meeting

18/7/2020
* MP
   * Read through starter code in depth and made comments to further understand what the methods do
   * Continued working through UML. Read through updates and course forums
   * Looked at the dungeon JSON files and noticed there was a goal condition for each dungeon
   * Updated DungeonLoader to load the goal condition from the JSON
   * Can only deal with 1 goal. Will need to implement future multiple goals
   * Updated Dungeon to initialise a goal which only stores a single String for the time being
   * Fixed bugs with JSON capturing 
   * Implemented simple treasure entity based of starter code
   * Added exit entity which now displays everything on the maze.json starter file
   * Merged work from today into master as nothing was broken

19/7/2020
* MP
   * Continued working on UML
   * Added a Door entity 
   * Basic bare bone classes for entities required
   * Saw there was a merge request for updated starter code but unsure if we should merge it as forums show it has caused some problems with peoples set up.
   * Created a test json with all the entities to show that they all load with the correct images
   * Created a branch to start implementing how items are collected and stored in an inventory
   * Added an inventory to the player class to store items
   * Created test folder to start with testing
   * Starting to test a way to implement the player picking up a treasure 
   * Sorted out a merge conflict for when the instructors push updated code to the master.	
* JD
   * Pulled changes and removed test files to enable compile and use.
   * Added wall collision functionality and refactored started code for more universal use with all moveable entities.
   * Added boulder pushing functionality and collision mechanic
   * Fixed overborder bug as it was removed when implementing player collisions
   * Added door collisions for both player and boulders


### Week-08

20/7/2020
* MP
   * Pulled changes from master and made sure it was runnable on local machine
   * Fixed a test for creating a dungeon
   * Fixed bug for when removing an entity from a dungeon in Dungeon class
   * Tested Adding and Removing of All implemented Entities
   * Added extra comments to the mechanics behind moving entities 
   * Fixed a bug with moving over treasure not removing the view
   * Testing movement and collecting/picking up items
   * Created test for picking up treasure
   * Discovered user experience bug where a Player has no way to drop a key if they picked up a key that doesn’t correspond to a door they want to open.
   * Refactored inventory to use a Key class as oppose to hardcoded int value
   * Discovered a bug with. Doesn’t pass JUnit tests because it involves setting ImageView.setImage(null) which is resulting in NullPointerExceptions. But it works when you run the game with UI
   * Fixes tests that now pass for picking up treasure and key entities
   * Added tests to pick up sword and potion
   * Implemented basic status effect when picking up potion
   * Created Junit tests for player movement
   * Added tests for player walking into a wall
   * Added tests for player walking into walls
   * Added tests for player walking through portal
   * Added tests for player pushing a portal
   * Small bug fix for the change in verifying a player is holding a key
   * Created Juni tests for environmental behaviours
   * Added tests for activating floor switches
   * Minor bug found: design cannot initialise a floor switch trigger unless a door is placed on the trigger location first.
   * Added tests for unlocking doors given a player has a key
   * Implemented an observer for the enemy to watch the player movement
   * Implemented method that Enemy moves closer to Player successfully
   * Found a bug where Enemy doesn’t move when there is an equal distance from Player and Enemy
   * Fixed this by implementing another condition for equal cases to randomly choose between two choices
   * Added a case for when Player moves into Enemy
   * Bug found when Player and Enemy collide the collision method doesn’t trigger an completed goal until after the next update.
   * Created Sword behaviours
   * Implemented method of Enemy colliding with Player that has a Sword to remove and kill the Enemy
   * Bug found where killing an Enemy doesn’t remove it’s view that is okay since the backend is valid.
   * Added more tests for enemy movement towards player
   * JD got gradle working on CSE machine. Viewed gradle test to see coverage we found was above 50%
   * Updated gitlab board to reflect the work we have completed
   * Ran into problems with gradle and junit tests not being pick up

* JD
   * Added comments to existing code
   * Added floor switch declaration.
   * Added floor switch functionality with door and possible others
   * Added floor switch trigger through boulder
   * Added more comments to existing code prior to progressing
   * Added exit functionality of exit via System.exit Will implement further exit when necessary
   * Added portal functionality with corresponding portal
   * Fixed load orders so that player appears on top of all entities and boulder appears on top of all except player
   * Found bug that when boulder is on door, it no longer moves
   * Fixed previous boulder bug. Completed first sprint.
   * Also refactored code to reduce chonk
   * Begun attempting to change door image
   * Found bug with boulder triggering exit. 
   * Fixed bug with boulder triggering exit
   * Integrating imageObserver to DungeonController to update images
   * Finished implementing observer. Also implemented door opening change image
   * Added more comments
   * Implemented key collection but image is still showing after collection
   * Fixed key not disappearing by directly altering its imageview
   * Completed item collection for sword and treasure
   * Completed item collection for potion. Sprint completed
   * Completed door unlocking via key held by player
   * Added no duplicate key functionality
   * Added no duplicate sword functionality
   * Refactored some inventory and door code to be more intuitive
   * Discovered and fixed bug with door not turning to opened door when unlocked
   * Added completing goals to jira sprint specification that dungeons can be completed by completing singular or multiple goals.
   * Merged john branch to master and prepared it for use with both windows and Vlab.
   * Fixed Issues with duplicate files and reverted changes from merge
   * Reinstated files removed when using vscode on win10
   * Reconvened with MP after nap :)

21/7/2020 MILESTONE DUE 9AM

* MP
   * Fixed tests to run on CSE machine and gradle coverage
   * Gradle not picking Junit tests due to imports 
   * Updated gitlab tasks board
   * Fixed Junit tests with nullpointexceptions not removing reviews. Commented them out so it works as that is part of UI.
   * Added more tests for further coverage for collision with player that has a sword or potion
   * Reviewed UML to export for submission
   * Added further testing for sword actions
   * Added further testing for potion state active and enemy movement away from player
   * Uploaded UML to root directory
   * Added tests for adding duplicate Keys
   * Added tests for adding duplicate Swords
   * Added tests for killing all enemies as a goal state
* JD
   * Restructured assets for neater presentation
   * Edited test.gradle to test only needed classes and their respective functions
   * Restored UI item removal for easy testing
   * Implemented potion effect and temporary status change
   * MP found bug in test imports and working to resolve
   * Resolved by importing individual classes in test classes ONLY
   * Found an existing bug with java.util.concurrentmodificationexception when removing observer. Fixed by implementing CopyOnWriteArrayList
   * Pushed and merged changes. One user story left for completing goals.
   * Working on singular and multiple goals
   * Completed goals for SINGULAR MAIN GOAL (DOOR) and MULTIPLE SUBGOALS (kill all enemies/collect all treasure)
   * Pushed changes and merged to master branch
   * Discovered and fixed null error with not checking for DOOR ONLY goal
   * Added additional tests for coverage and prepared for push to submission
   * Submitted 8:09AM


   
### Week-09

1/8/2020
* MP
   * Pulled latest from master
   * Fixed images to disappear after a player has moved over them
   * Discovered that goals are still very buggy and need to relooked at
   * Decoupled the dungeon class from the Inventory
   * Reworked Inventory and moved methods to player
   * Felt it didn’t make sense that an Inventory needs to talk to the dungeon. It just needs to talk to the Player.
   * Tested existing code successfully to make sure nothing is broken and pushed the latest update to master.
   * Started reworking how goals are intialised by trying to implement composite pattern
   * Tried understanding and implementing strategy pattern to goal behaviours
   * Slowly reworking how Goals are implemented
   * Using a strategy pattern to set condition behaviour for each goal
   * “exit” goal condition implemented
   * “Boulder” goal partially implemented
   * Reimplemented how FloorSwitches were initialised.
   * FloorSwitches were initialised with extra coordinates to activate a trigger point. This was designed to activate a door but it wouldn’t satisfy a goal of activating all floor switches to finish a dungeon
   * Commented out the trigger coords temporarily
   * Added active status’s for FloorSwitches to show if they’re active/inactive
   * Added active status’s for Boulders to show if they’re currently on a floor switch so we can indicate when they have been moved off.
   * In the middle of testing and implementing boulder goal. Have not pushed onto master yet until goals have been finished.
   * Have yet to figure out how nested goals within sub goals will work but my guess would be to somehow incorporate a composite pattern to nest goals together.
* JD
   * Pulled MP’s changes and started working after dev log
   * Checked out changes and discovered some rework.
   * Begun working on a new way of implementing goals and nesting them and completing them
   * Reimplemented the removal of image paths to be updated due to the lack of need of tests in milestone3.
   * Restructure repo by adding trackers (observers and listener functions) into new directory called “trackers”. Updated imports to suit otherwise
   * Possible recursion solution with array of main goal strings and another GOAL “subgoal” linking to another goal (nested)
   * Recursive may be the best way but the most tedious
   * Another solution may be just to not have nested subgoals and to have 1 main and many sub. 
   * 2d arrays are also possible however are not as good as the above
   * Implemented observable lists and allowed them to coincide with completing goals. All changes in entities are now observed. Additions are tracked and removals are notified.

2/8/2020
* MP
   * Pulled JD’s code he worked on last night.
   * Tried to resolve conflicts with the new goal implementation but had difficulty
   * ebased local master branch with updated master branch
   * Spoke to JD while reviewing new code 
   * Starting to draw up mock ups for how the UX should be for our game
   * Created some mock ups for the menu, tutorial layouts and dungeon.
   * Organised in terms of level of difficulty the levels will appear.
   * Pulled latest master and fixed the warnings
   * Added comments for goals to understand them better
   * Reconstructed the order of parameters for the goals to make more sense and improve readability
   * Fixed test bugs
   * Added print statements to Goals to better visualise what is going on in the system
   * Tweaked FloorSwitch to have a different trigger entity when initializing as it was implemented to only be able to be initialised on a door to activate.
   * Created a boulderUpdated.json to test boulder goals
   * Pushed latest updates to master and tested that nothing is broken.
   * There is a bug with how floor switches work as they can not be added to the dungeon unless the trigger entity is of a Wall or Door. If it isn’t, the activated status method needs to be updated.
   * Boulder goal not working correctly.
   * Tested and fixed dungeon goal of “boulder”
   * Dungeon with 1 switch worked.
   * Dungeons with multiple switches work.
   * Dungeon with multiple switches with one switch deactivated after being activated. Then activated again.
   * Added helper print statements in EntityTracker to understand what is going on.
   * Refactored EntityTracker switch check method to specifically check for switches as it was checking for generic status but was only looking for FloorSwitches.
   * Found a bug with goal loading when trying to load advance.json dungeon for goal condition as “enemies” and “treasure”. Couldn’t load.
   * Fixed bug where dungeonLoader was not loading sub goals correctly.
   * Testing advance.json with main Goal as AND and subgoals “enemies” and “treasure”
   * Found a bug where subgoals are not being completed. Left comments.
   * Added a dungeon to test single boulder main goa. Success
   * Added a dungeon to test single enemies main goal. Failed. Has bugs.
   * Goal functionality does not complete a dungeon when an enemy is killed.
   * Added a dungeon to test single treasure main goal. Success
   * Created level design for tutorial
   * Created level design for level 1
   * Created level design for level 2
* JD
   * Reworked FloorSwitch to contain a triggered value. Now all floor switches are now possible goals however this is NOT tracked within the rest of the program.
   * Refactored code to match the update in code structure and added comments to clarify new class “EntityTracker”
   * Recompiled code and found no bugs as of yet.
   * Added in System.out functions to allow for notification of changes/completion of possible goals.
   * Added functionality for floorswitch goals but not without null pointer bug
   * Fixed null pointer bug
   * Begun Development of debug console using swing
   * Completed swing basic console
   * Allowed console to be loaded and opened when the game is opened
   * CONSOLE IS NOT CLOSED AFTER GAME IS CLOSED :/
   * Must implement way to close game safely and close all associated tasks
   * Bug found that debug console is unable to add to dungeon
   * Fixed ability to add items to the dungeon map but not appearing.
   * Scrapped adding to map and now adding straight to player
   * Tested use with sword command “getSword”
   * Added some more commands to enable invincibility and etc
   * Tested and works but “getGod” is slightly buggy

3/8/2020 - 4/8/2020 SUBMISSION AT 9AM
- MP
   * level design for level 3
   * Created tutorial level json file and tested that it loads correctly 
   * Created level 1 json file and tested that it loads correctly.
   * Still has problems with loading subgoals that needs to be addressed.
   * Created level 2 json file and tested that it loads correctly
   * Enemy algorithm could be improved as it has trouble randomising what to do when there’s a wall between the player and enemy. 
   * Has the sub goals issue registering as well.
   * Created level 3 json file and tested that it loads correctly
   * Single goal of killing all enemies
   * Bug found when invincibility potion is picked up, it doesn’t kill enemies
   * Bug found when killing all enemies, goal is not completed
   * Bug that sword isn’t not depleted/broken after using it 5 times.
   * Refactored DungeonApplication.java to create a test scene. The idea would be to create scenes for every new window and buttons will trigger the primaryStage to load the scene. First step is to create the scene in sceneBuilder to produce a fxml. Then create a controller that will talk to the backend.
   * Created a main menu to successfully load after starting the game
   * Created a background image for the main menu
   * Created 2 buttons that current just print statements that they are buttons
   * Successfully linked Play Game button to load a new scene that current just shows the tutorial.
   * Implemented a level select screens and resolve fxml bugs
   * Buttons on level select does not currently do anything.
   * Created a tutorial.fxml and started layering out the screen
   * Ran into a bug where the system is not detecting keypresses.
   * It seems like application is not reading the whole DungeonController
   * Fixed button key pressed that was not being detected. The problem was that the handleKeyPress was on the GridPane but it needed to be on the upper most parent layer to be registered.
   * Had trouble getting navigation to work backwards
   * Asked JD for assistance which he was able to fix and work out.
   * Cleaned up some code after the fix
   * Created layout for level 2 and 3
   * Modified controller classes to navigate to level 2 and 3
   * Updated fxml views to include the goals for respective levels
   * With the help of JD, created a listener for treasure count to update the label
   * Applied inventory layout to other levels
   * Updated UML
   * Added a win/lose ending screen for when the player finished the goal

* JD
   * Begun work on restructuring and refactoring code.
   * Implemented listener on DebugConsole to open and close when esc key is toggled. 
   * Remove getGod and bugging code within debug commands
   * Reimplemented some classes to implement patterns that are more effective and tidy
   * Found bugs with enemy and player being on the same place and one not dying
   * Fixed bug with enemy by checking for both player -> enemy and enemy -> player collisions
   * Discovered issue with invincibility potions not working. 
   * Refactored potions to now be composite pattern to include many possible potions
   * Fixed issue with invincibility potion check
   * Fixed issue with enemies not completing goal
   * Fixed issue with sword not being depleted
   * Ensured json was being parsed correctly as per the spec. ALL advanced goals are now supported
   * Continued to implement more debugging commands with help input
   * Begun to find sound files to implement into dungeon
   * Created SoundEntity composite pattern to all entities that will make sounds
   * Added sounds for treasure sword and enemy removal
   * Refactored code and added more comments
   * Added more sounds
   * Added all sounds for all possible entities
   * Portal 
   * Wall bump
   * Boulders
   * Doors opening
   * Key pickup
   * Potion pickup
   * Floor Switches
   * Added function where player filter changes to gold when player has invincible potion
   * Fixed debugging console bugs with invincibility potion not properly changing imageview
   * Re-added getGod as godMode that toggles current invincibilityState of the player
   * Refactored code and moved on to push frontend development
   * Fixed back button problems and restructured entire Scene creation structure
   * Continued to develop scenes with individual functions catering to levels
   * Added listeners for level completion/player death into dungeon controller. Added appropriate methods to help this process
   * Cleaned up code and fixed minor bugs caused by changes in values from adding listeners
   * Removed die() command from DebugConsole due to issues with closing
   * Updated UML diagram to suit improved structure including extensions
   * Implemented new potion extension to allow walking through walls
   * Fixed up and refactored code to remove most unused imports
   * Implemented win/lose and back to level selection functions. All done.





