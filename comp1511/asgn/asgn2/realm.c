// Assignment 2 19T2 COMP1511: Castle Defense
//
// This program was written by John Dao(z5258962)
// on August 2019
//
// Version 1.0.0 (2019-07-22): Assignment released.
// Version 1.0.1 (2019-07-22): Fix minor style issue with print_tower.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "realm.h"

#define LAND_POWER 0
#define LAND_USES 0
#define TYPE_ENEMY 3
#define NO_ENEMIES 0
#define ENEMY_EXISTS 1
////////////////////////////////////////////////////////////////////////

// `struct realm` represents a realm, which represents the state of the
// entire program. It is mainly used to point to a linked list of 
// locations, though you may want to add other fields to it.
//
// You may need to add fields to struct realm.
struct realm {
    struct location *castle;
    struct location *lair;
};

// `struct location` represents a location, which could be a land,
// a tower, or a castle. Each of those places has a different type
// of information that this struct will need to store.
//
// You will need to add fields to struct location.
struct location {
    char name[MAX_NAME_LENGTH];
    int power;
    int uses;
    int type;
    int enemy_exists;
    struct enemy *enemies;
    struct location *next;

};

// `struct enemy` represents an enemy, which will move through the
// realm (to each location). Towers can deal damage to it, and
// it can deal damage to the Castle.

struct enemy {
    char name[MAX_NAME_LENGTH];
    int cur_hp;
    int max_hp;
    int type;
    struct enemy *next;
};

////////////////////////////////////////////////////////////////////////

// Function prototypes for helper functions
static Location new_location(char *name, int power, int uses, int type);
static void print_tower(char *name, int power, int uses, Effect effect);
static void print_land(char *name);
static void print_castle(char *name, int defense);
static void print_enemy(char *name, int cur_hp, int max_hp);

// Add prototypes for any extra functions you create here.

////////////////////////////////////////////////////////////////////////

// You need to implement the following 9 functions.
// In other words, write code to make the function work as described 
// in realm.h.

// Create a new realm, and return a pointer to it.
Realm new_realm(void) {
    struct realm *realm = malloc(sizeof(struct realm));
    realm->lair = new_location("Lair", LAND_POWER, LAND_USES, TYPE_LAND);
    realm->castle = new_location("Castle", STARTING_CASTLE_HP, 0, TYPE_CASTLE);
    realm->castle->next = NULL;
    if (realm->lair != NULL && realm->castle != NULL) {
        realm->lair->next = realm->castle;
    }

    return realm;
}
//This function will create a new location and will return a pointer to it
//It will also be used for creating towers
//Power will also be used for castle HP
static Location new_location(char *name, int power, int uses, int type) {
    struct location *new_location;
    new_location = malloc(sizeof(struct location));
    strcpy(new_location->name, name);
    new_location->power = power;
    new_location->uses = uses;
    new_location->type = type;
    new_location->enemy_exists = NO_ENEMIES;
    return new_location;
}


////////////////////////////////////////////////////////////////////////
//                         Stage 1 Functions                          //
////////////////////////////////////////////////////////////////////////

// Add a new location to the realm.
// Uses loops to find appropriate spot as described in assignment brief
void add_location(Realm realm, char *name) {
    //Using lair to find where the new locations should be located
    struct location *after = realm->lair;
    struct location *current = realm->lair;
    struct location *created;
    // Zero is used here as land has no power
    created = new_location(name, 0, 0, TYPE_LAND);
    char castle_compare[] = "Castle";
    //Changes 'after' pointer so it doesn't point to the lair
    after = after->next;
    int compare = strcmp(after->name, castle_compare);
    //Loops where castle is and stops adjusting pointers when finished
    if (compare != 0) {
        after = current->next;
        compare = strcmp(after->name, castle_compare);
        while (compare != 0) {
            current = current->next;
            after = current->next;
            compare = strcmp(after->name, castle_compare);
        }    
    }
    //Places the new location before castle by reassigning the prior pointer
    //it also assures that the castle will point to NULL
    current->next = created;
    created->next = after;
    after->next = NULL;
}

// This function will print out the realm.
// Loops through all the locations and their enemies if applicable
void print_realm(Realm realm) {
    struct location *current = realm->lair;
    int compare = 0;
    char castle_compare[] = "Castle";
    
    //prints the locations, with the castle at the end
    compare = strcmp(current->name, castle_compare);
    while (compare != 0) {
        if (current->type == TYPE_LAND) {
            //Prints land type and any enemies that it may contain
            print_land(current->name);
            if (current->enemy_exists == ENEMY_EXISTS) {
                struct enemy *enemies = current->enemies;
                while (enemies != NULL) {
                    print_enemy(enemies->name, enemies->cur_hp,
                     enemies->max_hp);   
                    enemies = enemies->next;
                }
            }
        } else if (current->type == TYPE_TOWER) {
            //Prints land tower and any enemies that it may contain
            print_tower(current->name, current->power, current->uses,
            EFFECT_NONE);
            if (current->enemy_exists == ENEMY_EXISTS) {
                struct enemy *enemies = current->enemies;
                while (enemies != NULL) {
                    print_enemy(enemies->name, enemies->cur_hp,
                     enemies->max_hp);   
                    enemies = enemies->next;
                }
            }
        }
        current = current->next;
        compare = strcmp(current->name, castle_compare);
    }
    //Prints the castle
    print_castle(current->name, current->power);
    if (current->enemy_exists == ENEMY_EXISTS) {
        struct enemy *enemies = current->enemies;
        while (enemies != NULL) {
            print_enemy(enemies->name, enemies->cur_hp,
            enemies->max_hp);   
            enemies = enemies->next;
        }   
    }

}

////////////////////////////////////////////////////////////////////////
//                         Stage 2 Functions                          //
////////////////////////////////////////////////////////////////////////

// Add a new tower to the realm.
// Uses new_location to create a location and sets it as TYPE_TOWER
int new_tower(Realm realm, char *prev_name, char *name, int power, int uses) {
    struct location *current = realm->lair;
    struct location *after = realm->lair;
    after = after->next;
    int compare = strcmp(prev_name, current->name);
    int errors = 0;
    //Check if the values are valid
    if (power < 1 || uses < 1) {
        errors = ERROR_INVALID_STAT;
    }
    
    //Loop to find the appropriate node to insert
    while (compare != 0 && after != NULL && errors == 0) {
        current = current->next;
        after = after->next;
        compare = strcmp(prev_name, current->name);
    }
    
    //Creation and insertion of new tower node
    //Also will check if the given location is valid
    if (compare == 0 && errors == 0) { 
        struct location *created = new_location(name, power, uses, TYPE_TOWER);
        current->next = created;
        created->next = after;
    } else if (compare != 0 && errors == 0) {
        errors = ERROR_NO_LOCATION;
    }
    return errors;
}

// Add an enemy to the realm.
// Simply mallocs new enemy and inserts at appropriate spot
int new_enemy(Realm realm, char *location_name, char *name, int hp) {
    struct location *current = realm->lair;
    struct location *after = realm->lair;
    after = after->next;
    int errors = 0;
    if (hp < 1) {
        errors = ERROR_INVALID_STAT;
    }
    //This cycles through the location list to find where it exists
    int compare = strcmp(location_name, current->name);
    while (compare != 0 && after != NULL && errors == 0) {
        current = current->next;
        after = after->next;
        compare = strcmp(location_name, current->name);
    }
    //Testing if the location exists at all and will create enemy if it does
    if (compare != 0 && errors == 0) {
        errors = ERROR_NO_LOCATION; 
    } else if (current->enemy_exists == NO_ENEMIES && errors == 0) { 
        //This function inserts the first enemy if none exist
        current->enemy_exists = ENEMY_EXISTS;
        struct enemy *first_enemy = malloc(sizeof(struct enemy));
        current->enemies = first_enemy;
        first_enemy->next = NULL;
        strcpy(first_enemy->name, name);
        first_enemy->cur_hp = hp;
        first_enemy->max_hp = hp;
        first_enemy->type = TYPE_ENEMY;
    } else if (current->enemy_exists == ENEMY_EXISTS && errors == 0) {
        //This function inserts an enemy at the end of list if enemy exists
        struct enemy *selected = current->enemies;
        while (selected->next != NULL) {
            selected = selected->next;
        }
        struct enemy *new_enemy = malloc(sizeof(struct enemy));
        selected->next = new_enemy;
        new_enemy->next = NULL;
        strcpy(new_enemy->name, name);
        new_enemy->cur_hp = hp;
        new_enemy->max_hp = hp;
        new_enemy->type = TYPE_ENEMY;
    }
    
    return errors;
}

// Advance enemies towards the castle.
// Uses the array to store pointers
int advance_enemies(Realm realm) {
    struct location *current = realm->lair;
    struct location *save = realm->lair;
    struct enemy *arrop[999] = {NULL};
    char castle_compare[] = "Castle";
    int counter = 1;
    int adjuster = 1;
    int passed = 0;
    //assigns all of the enemy pointers to a separate array of pointers
    //Sets it as NULL if there are none present
    while (strcmp(castle_compare, current->name) != 0) {
        if (current->enemy_exists == ENEMY_EXISTS) {
            arrop[counter] = current->enemies;
            current->enemy_exists = 0;
        }
        current = current->next;
        counter++;
    }

    //If there exists an enemy after the castle, it is deleted
    if (current->enemy_exists == ENEMY_EXISTS) {
        struct enemy *castle = realm->castle->enemies;
        struct enemy *temp = castle;
        struct location *new = realm->castle;
        current->enemy_exists = NO_ENEMIES;
        while (castle != NULL) {
            temp = castle;
            castle = castle->next;
            free(temp);
            passed++;
        }
        new->enemies = NULL;
    }

    //Shifts the entire list forwards one spot, including shifting enemies
    //onto castles if applicable
    save = save->next;
    while (counter > adjuster) {
        if (arrop[adjuster] != NULL) {
            save->enemies = arrop[adjuster];   
            save->enemy_exists = 1;
        }
        save = save->next;
        adjuster++;
    }

    return passed;
}

////////////////////////////////////////////////////////////////////////
//                         Stage 3 Functions                          //
////////////////////////////////////////////////////////////////////////

// Apply damage from the enemies at each tower to that tower.
int apply_damage(Realm realm) {
    struct location *current = realm->lair;
    char castle_compare[] = "Castle";
    int castle_damage = 0;
    int hit = 0;
    int run = 1;
    //Select the nodes that are towers and excludes castle
    while (strcmp(current->name, castle_compare) != 0) {
        if (current->type == TYPE_TOWER && 
        current->enemy_exists == ENEMY_EXISTS) {
            hit++;
            //Tower inflicting damage and counted 'hit'
            //Loops through the enemies if they exist and decreases the hp
            //Breaks the loop when damage is applied
            //Deletes the enemy if its hp falls below zero
            struct enemy *selected = current->enemies;
            while (run == 1) {
                selected->cur_hp -= current->power;
                if (selected->cur_hp <= 0 && selected->next != NULL) {
                    struct enemy *temp = selected;
                    selected = selected->next;
                    free(temp);
                    run = 0;
                } else if (selected->cur_hp <= 0 && selected->next == NULL) {
                    struct enemy *temp = selected;
                    selected->next = NULL;
                    free(temp);
                    current->enemy_exists = NO_ENEMIES;
                    run = 0;
                } else {
                    run = 0;
                }
            }
            run = 1;
            current->uses -= 1;
            //Turns the location into land if use is found to be 0
            if (current->uses == 0) {
                current->type = TYPE_LAND;
            }
        }
        current = current->next;
    }
    //Seperate damage function for castle
    //Loops through all enemies and sums them
    //It them subtracts that number off the original castle health
    if (current->type == TYPE_CASTLE && current->enemy_exists == ENEMY_EXISTS) {
        struct enemy *castle_enemies = current->enemies;
        while (castle_enemies != NULL) {
            castle_damage += castle_enemies->cur_hp;
            castle_enemies = castle_enemies->next;
        }
        current->power -= castle_damage;
    }
    
    
    return hit;
}

//Destroy the realm, and free any associated memory.
//It cycles through each location and their enemies (if applicable) and
//frees all
void destroy_realm(Realm realm) {
    struct location *current = realm->lair;
    while (current != NULL) {
        if (current->enemy_exists == ENEMY_EXISTS) {
            struct enemy *selected = current->enemies;
            while (selected != NULL) {
                struct enemy *temp = selected;
                selected = selected->next;
                free(temp);
            }
            struct location *temp_loc = current;
            current = current->next;
            free(temp_loc);
        } else {
            struct location *temp_loc = current;
            current = current->next;
            free(temp_loc);
        }    
    }
}

////////////////////////////////////////////////////////////////////////
//                         Stage 4 Functions                          //
////////////////////////////////////////////////////////////////////////

// Apply the specified buff to the relevant towers or enemies.
// Simply buffs against words that are the same
// Search is not implemented
int apply_buff(Realm realm, char *search_term, Buff buff, int amount){
    struct location *current = realm->lair;
    int buffed = 0;
    if (buff == BUFF_TOWER_USES || buff == BUFF_TOWER_POWER) {
        while (current != NULL) {
            int comparer = strcmp(search_term, current->name);
            if (current->type == TYPE_TOWER && comparer == 0) {
                if (buff == BUFF_TOWER_POWER) {
                    current->power += amount;
                    buffed++;
                } else if (buff == BUFF_TOWER_USES && comparer == 0) {
                    current->uses += amount;
                    buffed++;
                }
            }
            current = current->next;
        }
    } else if (buff == BUFF_ENEMY_HP) {
        while (current != NULL) {
            if (current->enemy_exists == ENEMY_EXISTS) {
                struct enemy *selected = current->enemies;
                while (selected != NULL) {
                    int comparer = strcmp(search_term, selected->name);
                    if (comparer == 0) {
                        selected->cur_hp += amount;
                        buffed++;
                    }
                    selected = selected->next;          
                }
            }  
            current = current->next;
        }
    }    
    return buffed;
}

////////////////////////////////////////////////////////////////////////
//                         Stage 5 Functions                          //
////////////////////////////////////////////////////////////////////////

// Apply the specified effect to each tower whose name matches the
// specified search term.
int apply_effect(Realm realm, char *search_term, Effect effect) {
    return 0;
}

////////////////////////////////////////////////////////////////////////

// Add definitions for your own functions below.
// Make them static to limit their scope to this file.




////////////////////////////////////////////////////////////////////////
//                    Provided print functions                        //
//         NOTE: YOU SHOULD NOT MODIFY THE FOLLOWING FUNCTIONS        //
////////////////////////////////////////////////////////////////////////

static void print_tower(char *name, int power, int uses, int effect) {
    printf("%32s [pow: %3d | uses: %3d]", name, power, uses);
    if (effect == EFFECT_NONE) {
        printf(" {%c}", EFFECT_NONE_CHAR);
    } else if (effect == EFFECT_ICE) {
        printf(" {%c}", EFFECT_ICE_CHAR);
    } else if (effect == EFFECT_BOUNCE) {
        printf(" {%c}", EFFECT_BOUNCE_CHAR);
    }
    printf("\n");
}

static void print_land(char *name) {
    printf("%32s [____________________]\n", name);
}

static void print_castle(char *name, int defense) {
    printf("%32s [Castle Defenses: %3d]\n", name, defense);
}

static void print_enemy(char *name, int cur_hp, int max_hp) {
    printf("%40s [hp: %d/%d]\n", name, cur_hp, max_hp);
}

////////////////////////////////////////////////////////////////////////
//              End of provided print functions                        //
////////////////////////////////////////////////////////////////////////


