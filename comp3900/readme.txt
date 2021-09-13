How to run the project:
We chose to run the project on the Lubuntu 20.4.1 LTS virtual machine image stated in the assessment guidelines.

We used Virtual Box 6.1.22 to run our virtual machine, the download can be found here:
https://www.oracle.com/au/virtualization/technologies/vm/downloads/virtualbox-downloads.html 

The virtual image can be downloaded here: https://rebrand.ly/o1fy80n
Once you have set this up on virtualbox, login to the machine and download the project code repo.
In the terminal (QTerminal), navigate the main directory of the repo, and type ls. 
The output should include the following 5 scripts:
install
runall
runbackend
runfrontend
resetdb

First, run
sudo ./install
This will install all the dependencies required to run the app. Please wait for this to complete.

Once the dependencies are installed, you can run the app.
To run the entire app, run
./runall
This will create 3 new terminals running the frontend and backend servers.
Firefox should open. If a page comes up saying "Warning: Potential Security Risk Ahead", click on  the "Advanced" button, then click "Accept the Risk and Continue."
You should then see the login page of our app, and can now use it how you please.
If you find that your configuration of the virtual machine screen size is too small, you will need to widen the screen to use the app effectively. 

If you only want to run the frontend, run
./runfrontend
2 terminals are created, running the frontend servers.

If you only want to run the backend, run
./runbackend
 A terminal is created running the backend server.

If you want to reset the database, run
./resetdb
