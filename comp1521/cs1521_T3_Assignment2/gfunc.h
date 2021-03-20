/*
    Header file for cowrie. Made to clean up code.
    By John Dao z5258962
    Created NOV 2019
*/

/* README PLEASE

    This assignment has been an absolute nightmare regarding even being
    able to get on computer. I have had quite a lot of changes this term
    and although you likely don't remember who I am (I'm away quite alot),
    trust that I have been hard at work.

    This assignment, in my opinion, has been rough. I have hardly gotten the
    chance to work on much with the crunch happening for 1531 (bad teammates :/)
    and a couple family issues I have had to deal with.

    As a result, this iteration of assignment 2 will not the best work but i have
    made it so it is almost as pretty as before. 

    This time, I have chosen not to creata a helper function.
    This was mainly due to the fact that there was not that many reused 
    sections of code. At most, logic was used twice (i believe). I tend to write
    programs such as these with helping modules but instead, i chose to diversitise
    the amount of .c files into their categories. 

    The main reason why I chose to do this was simply because of the spread in
    variety when it came to these subsets. The logic could be completely flipped
    over and I saw that when i read the spec. 

    Granted, this method of code structure is quite tedious to work with but
    overall, increased my level of productivity. It also had the benefit of 
    reducing the rigidity of my code so that's nice. 

    Again, I really wanted to do alot better, and possibly finish the entirety,
    but life would't allow me.

    I hope you enjoy my code.
    John D.


    ps. I ran 1511 style and i know there are a few long lines in cowrie.c.
    also
    i really do hate using realloc with pointers and even now, 
    i doubt i got it to work.

    Also theres a test i should be passing in subset1_124 where my output
    is exactly the same as the demo 1521 cowrie. It warrents a look 
    if you have yet to know.

*/

//NOTE this only declares functions made outside of cowrie.c

#define MAX_LINE_CHARS 1024
#define INTERACTIVE_PROMPT "cowrie> "
#define DEFAULT_PATH "/bin:/usr/bin"
#define WORD_SEPARATORS " \t\r\n"
#define DEFAULT_HISTORY_SHOWN 10

// These characters are always returned as single words
#define SPECIAL_CHARS "!><|"


// PUT EXTRA `#define'S HERE
#define DEFAULT_HISTORY_OFFSET 10
#define TRUE 1
#define FALSE 0

//cowrie.c original function declarations/prototypes.

//Hub for all executes. No bother to separate this into its own file.
static void execute_command(char **words, char **path, char **environment, int *execs);

//Given startercode. Haven't touched.
static void do_exit(char **words);
static int is_executable(char *pathname);
static char **tokenize(char *s, char *separators, char *special_chars);
static void free_tokens(char **tokens);

//execute_path.c functions

//Simple program that executes the given path. It is almost impossible for
//This to get an invalid path.
void execute_path(char **words, char **path, char **environment, char *program);


//history.c functions

//Adds a command stamp onto the file at $HOME/.cowrie_history
void add_history(char **words, int *execs);

//Uses words to return the users intended command from previously.
char *get_history(char **words, int *execs);

//Cycles through given range of previous history and prints it.
void history(char *limit, int *execs);


//glob.c functions

//Simply checks whether the given argument is able to be filtered through glob
int glob_check(char words[MAX_LINE_CHARS]);

//Sifts through and gets the possible outcomes from given argument.
void get_glob(char **word);
