package unsw.dungeon.assets;

import unsw.dungeon.assets.environment.*;
import unsw.dungeon.assets.player.*;

/**
 * Movement function class that allows associated classes to properly move and analyse collisions.
 * 
 * @author John Dao z5258962
 * @author Minh Pham
 */

public final class Movable {

    private Entity linkedEntity;
    public Dungeon dungeon;

    /**
     * Constructor for movable entity.
     * @param linkedEntity is the moveable object
     * @param dungeon is the affiliated dungeon
     */
    public Movable(Entity linkedEntity, Dungeon dungeon) {
        this.linkedEntity = linkedEntity;
        this.dungeon = dungeon;
        
    }
    
    /**
     * A method that moves the entity by a given value of x or y movements
     * e.g. moveEntity(1, 0) would move the entity RIGHT one space. 
     * 
     * @param x int amount to move entity along the x axis
     * @param y int amount to move entity along the y axis
     */
    public void moveEntity(int x, int y) {

        if (badBorderCheck(linkedEntity, x, y)) {
            return;
        }

        // Collision entity is the entity found in the coord the movable entity is 
        // trying to move to.
        Entity collision = dungeon.getCollision(linkedEntity.getX() + x, 
                                                linkedEntity.getY() + y);

        // next coord 
        int newX = linkedEntity.getX();
        int newY = linkedEntity.getY();

        // Checks for boulder collision. Also checks for floorswitch 
        // Floor switch check is implemented into the boulder move()
        if (collision instanceof Boulder && !(linkedEntity instanceof Enemy)) {
            Boulder boulder = (Boulder) collision;

            // Check if Boulder can be moved into adjacent coord
            if (boulder.movable.okCollision(x, y)) {
                newX += x;
                newY += y;
                boulder.move(x, y);
            }
        
        // Checks for Portal collision and teleports movable to new coords
        // enemies can move through portals somewhat by chance
        } else if (collision instanceof Portal) {
            Portal portal = (Portal) collision;
            newX = portal.cPortal.getX();
            newY = portal.cPortal.getY();
            portal.playSound();
        } else if ((collision instanceof Exit) && !(linkedEntity instanceof Enemy)) {
            // Goal is to get to exit
            dungeon.checkGoal("exit");

        // Tries to unlock door if moving entity is a Player, otherwise it cannot
        // be moved onto new position
        } else if (collision instanceof Door) {

            // ONLY PLAYERS CAN OPEN DOORS
            if (linkedEntity instanceof Player) {
                Player player = (Player) linkedEntity;
                Door door = (Door) collision;

                if (player.getInventory().getKey() != null) {
                    
                    // Note: It just unlocks the door. Player is not moved into it.
                    if (player.getInventory().getKey().getKeyID() == door.getdoorID()) {
                        door.unlockDoor();
                        player.getInventory().removeKey();
                    }
                }
            }
        // enemy collision player -> enemy
        } else if (collision instanceof Enemy) {
            Enemy enemy = (Enemy) collision;
            enemyCollision(enemy);
        } else if (collision instanceof Wall && linkedEntity instanceof Player) {
            SoundEntity wallSound = (SoundEntity) collision;
            Player player = (Player) linkedEntity;
            if (player.getWalkerState()) {
                newX += x;
                newY += y;
            } else {
                wallSound.playSound();
            }

            
        // No collision was found
        } else if (collision == null) {
            newX += x;
            newY += y;
        } 

        linkedEntity.x().set(newX);
        linkedEntity.y().set(newY);

        // Check if new position had any collectable items
        if (linkedEntity instanceof Player) {
            Player player = (Player) linkedEntity;
            player.checkCollect();
            
        // enemy collision enemy -> player
        } else if (linkedEntity instanceof Enemy) {
            // checks if the entity is on the same square as the player.
            // Will then check if enemy dies or not
            if ((linkedEntity.getX() == dungeon.getPlayer().getX()) && (linkedEntity.getY() == dungeon.getPlayer().getY())) {
                Enemy enemy = (Enemy) linkedEntity;
                enemyCollision(enemy);
            }
        }
    }

    /**
     * when given enemy, will see if enemy is valid enemy to kill
     * else will end the level
     * @param enemy enemy to be checked
     */
    public void enemyCollision(Enemy enemy) {
        // enemy collides with player with weapon/effect
        if (dungeon.getPlayer().getInventory().getSword().getDurability() > 0 ||
            dungeon.getPlayer().getInvincibilityState() == true) {
            if (!dungeon.getPlayer().getInvincibilityState()) {
                // must be sword
                dungeon.getPlayer().getInventory().getSword().attack();
                if (dungeon.getPlayer().getInventory().getSword().getDurability() == 0) {
                    dungeon.getPlayer().getInventory().removeSword();
                    System.out.println("SWORD HAS BROKEN");
                }
            }
            dungeon.killEnemy(enemy);
            return;
        } else {
            System.out.println("PLAYER DIED");
            dungeon.getPlayer().kill();;
        }
    }

    /**
     * Checks if collision is okay in adjacent
     * if detected in any specific entity.
     * returns true if ok, false if not 
     * mainly used for boulders. May refactor later
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     * @return bool and whether if adjacent move is ok
     */   
    public boolean okCollision(int x, int y) {
        Entity collision = dungeon.getCollision(linkedEntity.getX() + x, 
                                                linkedEntity.getY() + y);
        if (collision == null) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * checks if the player movement is valid and not outside the borders
     * Change this if possible movement to borders is to be changed
     * @param e Entity to be checked
     * @param x int to move entity by x axis
     * @param y int to move entity by y axis
     * @return true if ok move. False else.
     */
    public boolean badBorderCheck(Entity e, int x, int y) {
        if (e.getX() + x >= 0 && (e.getX() + x) < (dungeon.getWidth()) &&
            e.getY() + y >= 0 && (e.getY() + y) < dungeon.getHeight()) {

            return false;
        } else {
            return true;
        } 
    }


}