package unsw.dungeon.console;

import java.util.concurrent.*;
import unsw.dungeon.assets.*;
import unsw.dungeon.assets.environment.*;
import unsw.dungeon.assets.items.*;
import unsw.dungeon.assets.player.*;


/**
 * Class made to accomodate all of the commands avaliable
 * @author John Dao z5258962
 * @author Minh Pham
 */

public class DebugCommands {
    private Dungeon dungeon;
    private Player player;

    // initialises debug commands with no dungeon.
    public DebugCommands() {
        this.dungeon = null;
    }

    /**
     * sets the dungeon to be accesed via the debugCommands
     * Also sets the player to enable access
     * @param setDungeon is the dungeon to be set
     */
    public void setDungeon(Dungeon setDungeon) {
        this.dungeon = setDungeon;
        this.player = dungeon.getPlayer();
    }

    /**
     * A simple method to filter and run commands. More complex ones will have
     * separate methods
     * 
     * @param command String that player/dev input to use
     * @return string to be printed in console
     */
    public String filterCommand(String command) {
        CopyOnWriteArrayList<Entity> allEntities = new CopyOnWriteArrayList<Entity>();
        allEntities.addAll(dungeon.getAllEntities());

        switch (command) {
        case "help":
            return  "getSword: Gives player 5 use sword\n" +
                    "removeSword: removes player's sword" +
                    "getInvincible: Gives player invincible status for 5 seconds\n" +
                    "godMode: Toggles invincible status on/off\n" +
                    "killAllEnemies: Kills all enemies in the map\n" +
                    "collectAllTreasure: Collects all treasure in the map\n" + 
                    "unlockAllDoors: Opens all doors in the map\n";
                    
        case "getSword":
            Sword sword = new Sword(-1, -1);
            player.getInventory().pickUpSword(sword);
            
            return "added sword to player"; 
        
        case "removeSword":
            player.getInventory().getSword().attack();
            player.getInventory().getSword().attack();
            player.getInventory().getSword().attack();
            player.getInventory().getSword().attack();
            player.getInventory().getSword().attack();
            
            return "removed sword from player";

        case "getInvincible":
            player.setInvincibilityState(true);
            InvincibilityPotion potion = new InvincibilityPotion(-1, -1);
            player.setStatusTimer(player, potion);

            return "made player invincible for 5 seconds";
        
        case "killAllEnemies":
            for (Entity anEntity : allEntities) {
                if (anEntity instanceof Enemy) {
                    Enemy enemy = (Enemy) anEntity;
                    dungeon.killEnemy(enemy);
                    allEntities.remove(enemy);
                }
            }
            
            return "killed all enemies";

        case "collectAllTreasure":
            for (Entity anEntity : allEntities) {
                if (anEntity instanceof Treasure) {
                    Treasure treasure = (Treasure) anEntity;
                    player.getInventory().addTreasure(treasure);
                    dungeon.removeEntity(treasure);
                    allEntities.remove(treasure);
                }
            }
            
            return "collected all treasure";
        
        case "unlockAllDoors":
            for (Entity anEntity : allEntities) {
                if (anEntity instanceof Door) {
                    Door door = (Door) anEntity;
                    door.unlockDoor();
                }
            }
            
            return "opened all doors";
        
        case "godMode":
            player.setInvincibilityState(!player.getInvincibilityState());

            return "god mode toggled to " + player.getInvincibilityState();

        }

        // default case
        return "command not found";
    }
}