// Assignment 2 19T2 COMP1511: Castle Defense
// test_realm.c
//
// This file allows you to automatically test the functions you
// implement in realm.c.
//
// This program was written by John Dao (z5258962)
// on August 2019
//
// Version 1.0.0: Assignment released.

#include <stdio.h>
#include <assert.h>

#include "realm.h"

#define GOOD_INPUT 1
#define STRONG_INPUT 10
#define BAD_INPUT -1

static void test_new_realm();
void test_print_realm();
void test_add_location();
void test_add_tower();
void test_add_enemies();
void test_advancing_enemies_single();
void test_advancing_enemies_multiple();
void test_damage_single();
void test_damage_multiple();
int main(void) {
    int function = 0;
    int counter = 0;
    
    while (function != -1) {
        printf("\n================ Castle Defense Tests ================\n");
        printf("Note that these tests are in supplementary order and ");
        printf("should be completed and passed in order of contents\n");
        
        printf("1. new_realm\n");
        printf("2. print_realm\n");
        printf("3. add_location\n");
        printf("4. add_tower\n");
        printf("5. add_enemies\n");
        printf("6. advancing_enemies_single\n");
        printf("7. advancing_enemies_multiple\n");
        printf("8. damage_single()\n");
        printf("9. damage_multiple\n");
        if (counter > 0 && function != 99) {
            printf("The last test was test %d. ", function );
            printf("Tests were ran %d times in total.\n", counter); 
        } else if (counter > 0 && function == 99) {
            printf("All tests were run last time with there being ");
            printf("%d tests run in general\n", counter);
        }
        printf("Input the test intended to perform on realm.c, -1 to exit ");
        printf("or 99 to run all tests: ");
        scanf("%d", &function);
        if (function == 1) {
            test_new_realm();
        } else if (function == 2) {
            test_print_realm();
        } else if (function == 3) {
            test_add_location();
        } else if (function == 4) {
            test_add_tower();
        } else if (function == 5) {
            test_add_enemies();
        } else if (function == 6) {
            test_advancing_enemies_single();
        } else if (function == 7) {
            test_advancing_enemies_multiple();
        } else if (function == 8) {
            test_damage_single();
        } else if (function == 9) {
            test_damage_multiple();
        } else if (function == -1) {
            printf("Now exiting tester \n");
        } else if (function == 99) {
            test_new_realm();
            test_print_realm();
            test_add_location();
            test_add_tower();
            test_add_enemies();
            test_advancing_enemies_single();
            test_advancing_enemies_multiple();
            test_damage_single();
            test_damage_multiple();
        }
        counter++;
    }
    return 0;
}

////////////////////////////////////////////////////////////////////////
//                  Castle Defense Test Functions                     //
////////////////////////////////////////////////////////////////////////


// This function checks that a realm is actually being created.
void test_new_realm() {
    printf(">> Testing new_realm\n");

    printf("... Creating new realm.\n");
    Realm realm = new_realm();

    printf("... Checking it is not null.\n");
    assert(realm != NULL);

    printf("... Test complete. Destroying realm.\n");
    destroy_realm(realm);
}

// This function will print out an empty realm - it should not crash.
void test_print_realm() {
    printf("\n\n\n>> Testing print_realm\n");
    Realm realm = new_realm();

    printf("... This should show an empty realm - it should not crash.\n");

    print_realm(realm);

    printf("... Test complete. Destroying realm.\n");
    destroy_realm(realm);
}

// This function will add new locations and try to print them.
void test_add_location() {
    printf("\n\n\n>> Testing add_location.\n");
    Realm realm = new_realm();

    printf("... Adding locations.\n");
    add_location(realm, "First_Location");
    add_location(realm, "Second_Location");
    add_location(realm, "Third_Location");

    printf("... This should show an realm with three extra locations.\n");

    print_realm(realm);

    printf("... Test complete. Destroying realm.\n");
    destroy_realm(realm);
}
//This function will add a new tower and try to print them
void test_add_tower() {
    printf("\n\n\n>> Testing add_tower.\n");
    Realm realm = new_realm();
    add_location(realm, "test_loc");
    
    printf("... Adding new tower.\n");
    new_tower(realm, "test_loc", "first_tower", GOOD_INPUT, GOOD_INPUT);
    
    printf(">> This should display one location with one tower.\n");
    print_realm(realm);
    
    printf("... Attempting to add invalid input tower. \n");
    new_tower(realm, "test_loc", "bad_tower", BAD_INPUT, BAD_INPUT);
    printf(">> This should display the realm with no changes.\n");
    print_realm(realm);
    
    printf("... Attempting to add invalid location tower. \n");
    new_tower(realm, "dumb_loc", "bad_tower", BAD_INPUT, BAD_INPUT);
    printf(">> This should display the realm with no changes.\n");
    print_realm(realm);
    
    printf("... Attempting to add multiple towers. \n");
    new_tower(realm, "test_loc", "second_tower", GOOD_INPUT, GOOD_INPUT);
    new_tower(realm, "test_loc", "third_tower", GOOD_INPUT, GOOD_INPUT);
    
    printf(">> This should display one location with three towers.\n");
    print_realm(realm);
    
    printf("... Attempting to add tower after tower.\n");
    new_tower(realm, "second_tower", "fourth_tower", GOOD_INPUT, GOOD_INPUT);
    
    printf("... This should display a tower squashed between two others\n");
    print_realm(realm);    
    
    printf("... Test Complete. Destroying realm.\n");
    destroy_realm(realm);
}

//This test will attempt to add enemies to locations and will also
//try to add invalid enemies
void test_add_enemies() {
    printf("\n\n\n>> Testing add_enemies.\n");
    Realm realm = new_realm();
    
    printf("... Adding locations\n");
    add_location(realm, "test_loc");
    
    printf("... Adding towers\n");
    new_tower(realm, "test_loc", "test_tower", GOOD_INPUT, GOOD_INPUT);
    
    printf("... Attempting to add enemies at location\n");
    new_enemy(realm, "test_loc", "test_dummy", GOOD_INPUT);
    
    printf(">> Should display a tower and location containing one enemy\n");
    print_realm(realm);
    
    printf("... Attempting to add invalid input enemies\n");
    new_enemy(realm, "test_loc", "test_dummy", BAD_INPUT);
    
    printf(">> This should display no change\n");
    print_realm(realm);
    
    printf("... Attempting to add enemies to invalid location\n");
    new_enemy(realm, "bad_loc", "test_dummy", GOOD_INPUT);
    
    printf(">> This should display no change\n");
    print_realm(realm);
   
    printf("... Attempting to add multiple enemies at same location\n");
    new_enemy(realm, "test_loc", "test_dummy_two", GOOD_INPUT);
    new_enemy(realm, "test_loc", "test_dummy_three", GOOD_INPUT);
    new_enemy(realm, "test_loc", "test_dummy_four", GOOD_INPUT);
    
    printf(">> This should display multiple enemies at same location\n");
    print_realm(realm);
    
    printf("... Attempting to add multiple enemies at new locations\n");
    add_location(realm, "test_loc_two");
    new_enemy(realm, "test_loc_two", "tester_dummy_two", GOOD_INPUT);
    new_enemy(realm, "test_loc_two", "tester_dummy_three", GOOD_INPUT);
    new_enemy(realm, "test_loc_two", "tester_dummy_four", GOOD_INPUT);
    
    printf(">> This should display multiple enemies at multiple locations\n");
    print_realm(realm);
    
    printf("... Test complete. Destroying realm\n");
    destroy_realm(realm);
    
}
//This test will test if enemies from a single location will advance
//It will also test to see if the enemies will be deleted if they pass castle
void test_advancing_enemies_single() {
    printf("\n\n\n>> Testing advance_enemies_single.\n");
    Realm realm = new_realm();
    
    printf("... Adding locations\n");
    add_location(realm, "test_loc");
    
    printf("... Adding towers\n");
    new_tower(realm, "test_loc", "test_tower", GOOD_INPUT, GOOD_INPUT);
    
    printf("... Adding enemies at location\n");
    new_enemy(realm, "test_loc", "test_dummy", GOOD_INPUT);
    
    printf(">> Should display a tower and location containing one enemy\n");
    print_realm(realm);
    
    printf("... Attempting to advance enemies\n");
    advance_enemies(realm);
    
    printf(">> Should display one enemy advancing one place to castle\n");
    print_realm(realm);
    
    printf("... Adding multiple enemies at same location\n");
    new_enemy(realm, "test_loc", "test_dummy_two", GOOD_INPUT);
    new_enemy(realm, "test_loc", "test_dummy_three", GOOD_INPUT);
    new_enemy(realm, "test_loc", "test_dummy_four", GOOD_INPUT);
    
    printf("... Attempting to advance all enemies\n");
    advance_enemies(realm);
    
    printf(">> Should display enemies advanced with test_dummy at castle\n");
    print_realm(realm);
    
    printf("... Attempting to advance again\n");
    advance_enemies(realm);
    
    printf(">> This should show test_dummy as deleted with the three extra ");
    printf("enemies at castle\n");
    print_realm(realm);
    
    printf("... Initial testing complete. Destroying realm\n");
    destroy_realm(realm);
}
//This function will test advancing enemies at multiple locations and whether
//They can be destroyed by towers
//It will also test whether they will correctly be destroyed when passing the
//castle
void test_advancing_enemies_multiple() {
    printf("\n\n\n>> Testing advance_enemies_multiple.\n");
    Realm realm = new_realm();
    
    printf("... Adding locations\n");
    add_location(realm, "test_loc");
    
    printf("... Adding towers\n");
    new_tower(realm, "test_loc", "test_tower", GOOD_INPUT, STRONG_INPUT + 1);
    
    printf("... Adding enemies at location\n");
    new_enemy(realm, "test_loc", "test_dummy", GOOD_INPUT);
    
    printf(">> Should show enemies at the initial location\n");
    print_realm(realm);
    
    printf("... Adding new location\n");
    add_location(realm, "lest_loc_two");
    
    printf("... Adding multiple enemies at different location\n");
    new_enemy(realm, "lest_loc_two", "test_dummy_two", GOOD_INPUT);
    new_enemy(realm, "lest_loc_two", "test_dummy_three", GOOD_INPUT);
    new_enemy(realm, "lest_loc_two", "test_dummy_four", GOOD_INPUT);
    
    printf(">> Should display two locations with seperate enemies\n");
    print_realm(realm);
    
    printf("... Attempting to move all enemies\n");
    advance_enemies(realm);
    
    printf(">> Should display all enemies shuffled over by one\n");
    print_realm(realm);
    
    printf("... Attempting to shuffle all enemies again\n");
    advance_enemies(realm);
    
    printf(">> Should display only the earlier initialised enemies\n");
    print_realm(realm);
    
    printf(".. Attempting to shuffle one more time\n");
    advance_enemies(realm);
    
    printf(">> Should show no enemies in all areas\n");
    print_realm(realm);
    
    printf("... Test complete. Destroying realm\n");
    destroy_realm(realm);    
}

//This function will test whether enemies at single locations will be damaged
//It will also test castle damage with these enemies 
void test_damage_single() {
    printf("\n\n\n>> Testing damage_single\n");
    Realm realm = new_realm();
    
    printf("... Adding locations\n");
    add_location(realm, "test_loc");
    
    printf("... Adding towers with stronger uses + 1\n");
    new_tower(realm, "test_loc", "test_tower", GOOD_INPUT, STRONG_INPUT + 1);
    
    printf("... Adding stronger enemies at location\n");
    new_enemy(realm, "test_loc", "test_dummy", STRONG_INPUT);
    
    printf(">> Should show single enemy at location before tower\n");
    print_realm(realm);
    
    printf("... Moving enemy onto tower with power of 1\n");
    advance_enemies(realm);
    
    printf(">> Should show enemy on tower\n");
    print_realm(realm);
    
    printf("... Attempting to apply 1 damage to strong enemy\n");
    apply_damage(realm);
    
    printf(">> Tower uses should be decreased by one and 1 damage should be");
    printf(" applied to the enemy\n");
    print_realm(realm);
    
    printf("... Attempting to damage enemy 9 more times, until destroyed\n");
    int counter = 0;
    while (counter < 9) {
        apply_damage(realm);
        counter++;
    }
    
    printf(">> Should show no enemies and tower with 1 more use left\n");
    print_realm(realm);
    
    printf("... Attempting to create enemy at weakened tower\n");
    new_enemy(realm, "test_tower", "replacement_dummy", STRONG_INPUT);
    
    printf("... Attempting to damage enemy with tower\n");
    apply_damage(realm);
    
    printf(">> Should show enemy with one damage and tower turned into land\n");
    print_realm(realm);
    
    printf("... Attempting to move enemy to castle\n");
    advance_enemies(realm);
    
    printf(">> Attempting to apply damage to castle\n");
    apply_damage(realm);
    
    printf(">> 9 damage should be applied to castle ");
    printf("with the enemy left on the castle\n");
    print_realm(realm);
    
    printf("... Test complete. Destroying realm\n");
    destroy_realm(realm);
}

//This function will test whether enemies at multiple locations will be
//damaged appropriately
//it will also test to see whether they will damage the castle in conjunction
void test_damage_multiple() {
    printf("\n\n\n>> testing damage_multiple");
    Realm realm = new_realm();
    
    printf("... Adding locations\n");
    add_location(realm, "test_loc");
    
    printf("... Adding towers (two)\n");
    new_tower(realm, "test_loc", "test_tower", GOOD_INPUT, STRONG_INPUT + 1);
    new_tower(realm, "test_loc", "test_tower_2", GOOD_INPUT, STRONG_INPUT + 1);
    
    printf("... Adding stronger enemies at locations \n");
    new_enemy(realm, "test_tower", "test_dummy", STRONG_INPUT);
    new_enemy(realm, "test_tower_2", "test_dummy_two", STRONG_INPUT);
    
    printf(">> This should show two enemies at two seperate locations\n");
    print_realm(realm);
    
    printf("... Attempting to destroy the enemies\n");
    int counter = 0;
    while (counter < 10) {
        apply_damage(realm);
        counter++;
    } 
    
    printf(">> This should show no enemies with towers left with one use\n");
    print_realm(realm);
    
    printf("... Adding stronger enemies at locations \n");
    new_enemy(realm, "test_tower", "test_dummy", STRONG_INPUT);
    new_enemy(realm, "test_tower_2", "test_dummy_two", STRONG_INPUT);
    
    printf("... Attempting to apply damage to enemies\n");
    apply_damage(realm);
    
    printf(">> This should show two damaged enemies with their towers");
    printf(" transformed into land due to having no uses left\n");
    print_realm(realm);
    
    printf("... Attempting to advance enemies towards castle\n");
    advance_enemies(realm);
    
    printf(">> Should show one enemy at castle and one just before\n");
    print_realm(realm);
    
    printf("... Attempting to apply damage once more\n");
    apply_damage(realm);
    
    printf(">> This should show castle damaged by 9 points\n");
    print_realm(realm);
    
    printf("... Attempting to advance and apply damage once more\n");
    advance_enemies(realm);
    apply_damage(realm);
    
    printf(">> Should show castle damaged by 18 points in total with only ");
    printf("one enemy appearing at the castle \n");
    print_realm(realm);
    
    printf("... Test complete. Destroying realm\n");
    destroy_realm(realm);
}



